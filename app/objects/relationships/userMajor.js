/**
 * Represents a relationship between a user and a major
 * Used to indicate which majors a user is associated with
 */
class UserMajor {
    /**
     * Constructs a new UserMajor association
     * 
     * @param {number} userId - The ID of the user
     * @param {number} majorId - The ID of the associated major
     */
    constructor(userId, majorId) {
        this.userId = userId;
        this.majorId = majorId;
    }

    /**
     * Gets the user ID in the relationship
     * @returns {number} The user ID
     */
    getUserId() {
        return this.userId;
    }

    /**
     * Gets the major ID in the relationship
     * @returns {number} The major ID
     */
    getMajorId() {
        return this.majorId;
    }

    /**
     * Converts the UserMajor relationship to a JSON-compatible object
     * 
     * @returns {{
     *   userId: number,
     *   majorId: number
     * }} A JSON representation of the relationship
     */
    toJson() {
        return {
            userId: this.userId,
            majorId: this.majorId
        };
    }
}

module.exports = UserMajor;