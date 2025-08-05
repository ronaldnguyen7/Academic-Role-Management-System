const Major = require('../objects/entities/major');

/**
 * MajorModel stores and manages a list of valid majors
 */
class MajorModel {
    constructor() {
        /**
         * The list of available majors
         * @private
         * @type {Major[]}
         */
        this.majors = [
            new Major(1, 'COMPUTER SCIENCE'),
            new Major(2, 'DESIGN'),
            new Major(3, 'MATH')
        ];
    }

    /**
     * Checks if the given major is a valid major
     * 
     * @param {string} m - the name of the major
     * @returns {Boolean} whether or not the major is valid
     */
    isValidMajor(major) {
        return this.majors.some(m => m.getName() === major.toUpperCase());
    }

    /**
     * Checks if the given major is a valid major
     * 
     * @param {string} m - the name of the major
     * @returns {Boolean} whether or not the major is valid
     */
    getMajorId(major) {
        const found = this.majors.find(m => m.getName() === major.toUpperCase());
        return found ? found.getMajorId() : null;
    };
    
    /**
     * Gets the name of a major associated with an id
     * 
     * @param {int} mId - the id of the major
     * @returns {string|null} the name of the major
     */
    getMajorById(majorId) {
        const found = this.majors.find(m => m.getMajorId() === majorId);
        return found ? found.getName() : null;
    }
}

module.exports = new MajorModel();