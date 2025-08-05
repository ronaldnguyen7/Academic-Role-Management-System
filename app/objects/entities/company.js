/**
 * Represents a Company
 * 
 */
class Company {
    /**
     * Constructs a new Company
     * 
     * @param {string} name - The name of the company
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Gets the name of the company
     * 
     * @returns {string} The company's name
     */
    getName() {
        return this.name;
    }

    /**
     * Converts the company instance to a JSON-compatible object
     * 
     * @returns {{name: string}} The JSON representation of the company
     */
    toJson() {
        return {
            name : this.name
        }
    }
}

module.exports = Company;