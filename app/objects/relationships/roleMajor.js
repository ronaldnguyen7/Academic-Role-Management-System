/**
 * Represents a relationship between a role and a major
 * Used to indicate which majors are suitable for a given role
 */
class RoleMajor {
    /**
     * Constructs a new RoleMajor association
     * 
     * @param {number} roleId - The ID of the role
     * @param {number} majorId - The ID of the associated major
     */
    constructor(roleId, majorId) {
        this.roleId = roleId;
        this.majorId = majorId;
    }

    /**
     * Gets the role ID in the relationship
     * @returns {number} The role ID
     */
    getRoleId() {
        return this.roleId;
    }

    /**
     * Gets the major ID in the relationship
     * @returns {number} The major ID
     */
    getMajorId() {
        return this.majorId;
    }

    /**
     * Converts the RoleMajor relationship to a JSON-compatible object
     * 
     * @returns {{
     *   roleId: number,
     *   majorId: number
     * }} A JSON representation of the relationship
     */
    toJson() {
        return {
            roleId: this.roleId,
            majorId: this.majorId
        };
    }
}

module.exports = RoleMajor;