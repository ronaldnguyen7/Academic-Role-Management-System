/**
 * Represents a user in the system
 */
class User {
    /**
     * Constructs a new User instance
     * 
     * @param {number} userId - The unique identifier for the user
     * @param {string} name - The full name of the user
     * @param {string} email - The user's email address
     */
    constructor(userId, name, email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    /**
     * Gets the user's unique ID
     * @returns {number} The user ID
     */
    getUserId() {
        return this.userId;
    }

    /**
     * Gets the user's name
     * @returns {string} The name of the user
     */
    getName() {
        return this.name;
    }

    /**
     * Gets the user's email address
     * @returns {string} The email of the user
     */
    getEmail() {
        return this.email;
    }

    /**
     * Converts the user instance to a JSON-compatible object
     * 
     * @param {Array<string>} majors - The academic majors associated with the user
     * @returns {{
     *   userId: number,
     *   name: string,
     *   email: string,
     *   major: string
     * }} A JSON representation of the user
     */
    toJson(majors) {
        return {
            userId: this.userId,
            name: this.name,
            email: this.email,
            major: majors.join(' & ')
        };
    }
}

module.exports = User;