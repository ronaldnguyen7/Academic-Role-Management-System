const majorModel = require('./majorModel');
const Model = require('../models/BaseModels/model');
const RoleMajor = require('../objects/relationships/roleMajor');

/**
 * RoleMajorModel manages the many-to-many relationship between roles and majors
 * Inherits from Model for ID generation and in-memory database
 */
class RoleMajorModel extends Model {
    constructor() {
        super();
    }

    /**
     * Adds all majors associated with a role to the model
     * 
     * @param {number} roleId - The ID of the role
     * @param {string[]} majors - An array of major names associated with the role
     * 
     * @returns {void}
     */
    addRoleMajors(roleId, majors) {
        for (let major of majors) {
            const majorId = majorModel.getMajorId(major);
            if (majorId != null) {
                this.db.push(new RoleMajor(roleId, majorId));
            }
        }
    }

    /**
     * Retrieves all major names associated with a given role ID
     * 
     * @param {number} roleId - The ID of the role
     * @returns {string[]} An array of major names linked to the role
     */
    getRoleMajors(roleId) {
        return this.db
            .filter(rm => rm.getRoleId() == roleId)
            .map(rm => majorModel.getMajorById(rm.getMajorId()));
    }
    
    /**
     * Retrieves role IDs that match **all** majors in the provided list
     * 
     * @param {string[]} majors - The list of major names to match
     * @returns {number[]} An array of role IDs associated with all given majors
     */
    getRoleIdsMatchingAllMajors(majors) {
        let roleIds = Array.from(new Set(this.db.map(rm => rm.getRoleId())));

        majors.forEach(m => {
            let currMajor = new Set(
                this.db.filter(rm => rm.getMajorId() === majorModel.getMajorId(m))
                    .map(rm => rm.getRoleId())
            );
    
            roleIds = roleIds.filter(id => currMajor.has(id));
        });
    
        return roleIds;
    }

    /**
     * Retrieves role IDs that match **any** of the majors in the provided list
     * 
     * @param {string[]} majors - The list of major names to match
     * @returns {number[]} An array of role IDs associated with at least one of the majors
     */
    getRoleIdsMatchingAnyMajor(majors) {
        if (!majors || majors.length === 0) {
            return [];
        };

        majors = new Set(
            majors.map(m => majorModel.getMajorId(m)));
    
        return [...new Set(this.db
            .filter(rm => majors.has(rm.getMajorId()))
            .map(rm => rm.getRoleId()))];
    }
}

module.exports = new RoleMajorModel();