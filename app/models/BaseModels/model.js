/**
 * Base Model class to manage an in-memory database with auto-incrementing IDs
 */
class Model {
    constructor() {
        /**
         * Internal in-memory storage
         * @protected
         * @type {Array<any>}
         */
        this.db = [];
        /**
         * Tracks the next available unique ID
         * @protected
         * @type {number}
         */
        this.nextId = 1;
    }
    
    /**
     * Generates and returns the next unique ID
     * 
     * @returns {number} The next unique ID
     */
    generateId() {
        return this.nextId++;
    }

    /**
     * Clears the model by resetting the database and ID counter
     * 
     * @returns {void}
     */
    clearModel() {
        this.db = [];
        this.nextId = 1;
    }
}

module.exports = Model;