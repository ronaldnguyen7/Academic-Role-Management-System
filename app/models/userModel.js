const userMajorModel = require('./userMajorModel');
const majorModel = require('./majorModel');
const User = require('../objects/entities/user.js');
const Model = require('../models/BaseModels/model.js');

/**
 * UserModel manages user creation, retrieval, and filtering
 * Inherits from a base in-memory model and connects users to their majors
 */
class UserModel extends Model {
    constructor() {
        super();
    }

    /**
     * Adds a new user to the model along with their associated majors
     * 
     * @param {string} name - The user's name
     * @param {string} email - The user's unique email address
     * @param {string[]} majors - An array of major names associated with the user
     * 
     * @throws {Error} If the email already exists or any major is invalid
     * @returns {{ userId: number, name: string, email: string, majors: string[] }} 
     * The newly added user in JSON format
     */
    addUser(name, email, majors) {
        if (this.db.some(u => u.getEmail() === email)) {
            throw new Error('A user with this email already exists.');
        }

        if (!majors.length) {
            throw new Error("User must have at least one major.");
        }

        for (let m of majors) {
            if (!majorModel.isValidMajor(m)) {
                throw new Error(`Invalid major: ${m}.`);
            }
        }

        const newUser = new User(this.generateId(), name, email);
        this.db.push(newUser);
        userMajorModel.addUserMajor(newUser.getUserId(), majors);

        return newUser.toJson(userMajorModel.getMajorByUserId(newUser.getUserId()));
    }

    /**
     * Retrieves users matching optional filters
     * 
     * @param {number[]|null} userIds - Optional user IDs to filter by
     * @param {string[]|null} names - Optional user names to filter by
     * @param {string[]|null} majors - Optional major combinations (e.g., "CS & MATH") to filter by
     * @param {string[]|null} emails - Optional user emails to filter by
     * 
     * @returns {{ userId: number, name: string, email: string, majors: string[] }[]} 
     * Array of users that match all given filters.
     */
    getUsers(userIds, names, majors, emails) {
        let desiredUsers = this.db;

        if (userIds) {
            userIds = new Set(userIds);
            desiredUsers = desiredUsers.filter(u => userIds.has(u.getUserId()));
        }

        if (names) {
            names = new Set(names);
            desiredUsers = desiredUsers.filter(u => names.has(u.getName()));
        }

        if (emails) {
            emails = new Set(emails);
            desiredUsers = desiredUsers.filter(u => emails.has(u.getEmail()));
        }

        if (majors) {
            let ids = new Set();
            majors.forEach(major => {
                major = major.split(' & ').map(m => m.trim());
                const matchedUserIds = userMajorModel.getUserIdsByMajor(major);
                matchedUserIds.forEach(id => ids.add(id));
            });

            desiredUsers = desiredUsers.filter(u => ids.has(u.getUserId()));
        }

        return desiredUsers.map(u =>
            u.toJson(userMajorModel.getMajorByUserId(u.getUserId())));
    }

    /**
     * Retrieves a user by their ID
     * 
     * @param {number} userId - The ID of the user
     * @returns {{ userId: number, name: string, email: string, majors: string[] }|null} 
     * The user object in JSON format, or null if not found
     */
    getUserById(userId) {
        const user = this.db.find(user => user.getUserId() == userId);
        if (!user) {
            return null;
        }

        return user.toJson(userMajorModel.getMajorByUserId(userId));
    }
}

module.exports = new UserModel();