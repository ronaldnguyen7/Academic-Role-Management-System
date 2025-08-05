const majorModel = require('./majorModel');
const Model = require('../models/BaseModels/model.js');
const UserMajor = require('../objects/relationships/userMajor.js');

/**
 * UserMajorModel manages the many-to-many relationship between users and majors
 * Inherits from a base in-memory model
 */
class UserMajorModel extends Model {
    constructor() {
        super();
    }

    /**
     * Adds all majors associated with a user to the database
     * 
     * @param {number} userId - The ID of the user
     * @param {string[]} majors - An array of major names to associate with the user
     * 
     * @returns {void}
     */
    addUserMajor(userId, majors) {
        for (let major of majors) {
            this.db.push(
                new UserMajor(userId, majorModel.getMajorId(major))
            );
        }
    }

    /**
     * Retrieves the major names associated with a specific user
     * 
     * @param {number} userId - The ID of the user
     * 
     * @returns {string[]} An array of major names associated with the user
     */
    getMajorByUserId(userId) {
        return this.db
            .filter(um => um.getUserId() === userId)
            .map(um => majorModel.getMajorById(um.majorId));
    }

    /**
     * Retrieves user IDs associated with all given majors
     * Only users who have **every** major in the list will be included
     * 
     * @param {string[]} majors - An array of major names to filter users by
     * 
     * @returns {number[]} An array of user IDs matching all given majors
     */
    getUserIdsByMajor(majors) {
        const userModel = require('./userModel');

        let userIds = userModel.getUsers().map(u => u.userId);

        for (let major of majors) {
            const majorId = majorModel.getMajorId(major);
            const usersWithCurrMajor = this.db
                .filter(um => um.getMajorId() === majorId)
                .map(um => um.getUserId());

            userIds = userIds.filter(userId => usersWithCurrMajor.includes(userId));
        }

        return userIds;
    }
}

module.exports = new UserMajorModel();