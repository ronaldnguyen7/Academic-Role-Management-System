/**
 * Represents a professional role at a company
 */
class Role {
    /**
     * Constructs a new Role instance
     * 
     * @param {number} roleId - The unique identifier for the role
     * @param {string} role - The title or name of the role
     * @param {string} company - The company where the role is offered
     */
    constructor(roleId, role, company) {
        this.roleId = roleId;
        this.role = role;
        this.company = company;
    }

    /**
     * Gets the unique ID of the role
     * @returns {number} The role ID
     */
    getRoleId() {
        return this.roleId;
    }

    /**
     * Gets the name or title of the role
     * @returns {string} The role title
     */
    getRole() {
        return this.role;
    }

    /**
     * Gets the name of the company offering the role
     * @returns {string} The company name
     */
    getCompany() {
        return this.company;
    }

    /**
     * Converts the role instance to a JSON-compatible object, including suggested majors
     * 
     * @param {Array<string>} suggestedMajors - The academic majors recommended for the role
     * @returns {{
     *   roleId: number,
     *   role: string,
     *   company: string,
     *   suggestedMajors: Array<string>
     * }} A JSON representation of the role
     */
    toJson(suggestedMajors) {
        return {
            roleId: this.roleId,
            role: this.role,
            company: this.company,
            suggestedMajors
        };
    }
}

module.exports = Role;