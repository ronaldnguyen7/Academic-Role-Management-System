/**
 * CompanyModel maintains a unique set of companies.
 */
class CompanyModel {
    constructor() {
        let companies = new Set();
    }

    /**
     * Adds a company to the database
     * 
     * @param {string} company - the name of the company
     * @returns {void}
     */
    addCompany(company) {
        this.companies.add(company);
    }

    /**
     * Checks if a company is in the model
     * 
     * @param {string} company - the name of the company
     * @returns {Boolean} Whether the company is in the model or not
     */
    doesCompanyExist(company) {
        return this.companies.has(company);
    }

    /**
     * Clears all companies from the model
     * 
     * @returns {void}
     */ 
    clearModel () {
        this.companies = new Set();
    }
}
module.exports = new CompanyModel();