/**
 * Represents an academic major with a unique ID and name
 */
class Major {
    /**
     * Constructs a new Major
     * 
     * @param {number} majorId - The unique identifier for the major
     * @param {string} name - The name of the major
     */
    constructor(majorId, name) {
        this.majorId = majorId;
        this.name = name;
    }

    /**
     * Gets the unique ID of the major
     * 
     * @returns {number} The major's ID
     */
    getMajorId() {
        return this.majorId;
    }

    /**
     * Gets the unique ID of the major
     * 
     * @returns {number} The major's ID
     */
    getName() {
        return this.name;
    }

    /**
     * Converts the major instance to a JSON-compatible object.
     * 
     * @returns {{majorId: number, name: string}} The JSON representation of the major.
     */
    toJson() {
        return {
            majorId : this.majorId,
            name : this.name
        }
    }
}

module.exports = Major;