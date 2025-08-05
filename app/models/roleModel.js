const companyModel = require('./companyModel');
const roleMajorModel = require('./roleMajorModel');
const majorModel = require('./majorModel');
const util = require('../utilities/utility');
const Model = require('../models/BaseModels/model');
const Role = require('../objects/entities/role');

/**
 * RoleModel manages all operations related to roles,
 * including creation, filtering, and trend analysis
 * Inherits from a base in-memory model
 */
class RoleModel extends Model {
    constructor() {
        super();
    }

    /**
     * Adds a new role with associated company and majors to the database
     * 
     * @param {string} role - The title of the role
     * @param {string} company - The company offering the role
     * @param {string[]} majors - The suggested majors for the role
     * 
     * @throws {Error} If any provided major is invalid
     * @returns {{ roleId: number, role: string, company: string, suggestedMajors: string[] }} 
     * The newly created role object
     */
    addRole(role, company, majors) {
        majors.forEach(m => {
            if (!majorModel.isValidMajor(m)) {
                throw new Error(`Invalid major: ${m}.`);
            }
        });

        companyModel.addCompany(company);
        const newRole = new Role(this.generateId(), role, company);
        this.db.push(newRole);
        roleMajorModel.addRoleMajors(newRole.getRoleId(), majors);

        return newRole.toJson(roleMajorModel.getRoleMajors(newRole.getRoleId()));
    }

    /**
     * Retrieves roles matching specified filters
     * 
     * @param {number[]|number|null} roleIds - Role IDs to filter by
     * @param {string[]|string|null} titles - Role titles to filter by
     * @param {string[]|string|null} companies - Companies to filter by
     * @param {string[]|string|null} majors - Majors to filter by (role must match all)
     * 
     * @returns {{ roleId: number, role: string, company: string, suggestedMajors: string[] }[]}
     * Array of role objects matching the filters
     */
    getRoles(roleIds, titles, companies, majors) {
        let desiredRoles = this.db;

        if (roleIds) {
            roleIds = new Set(roleIds);
            desiredRoles = desiredRoles.filter(r => roleIds.has(r.getRoleId()));
        }

        if (titles) {
            titles = new Set(titles);
            desiredRoles = desiredRoles.filter(r => titles.has(r.getRole()));
        }

        if (companies) {
            companies = new Set(companies);
            desiredRoles = desiredRoles.filter(r => companies.has(r.getCompany()));
        }

        if (majors) {
            const majorRoleIds = new Set(roleMajorModel.getRoleIdsMatchingAllMajors(majors));
            desiredRoles = desiredRoles.filter(r => majorRoleIds.has(r.getRoleId()));
        }

        return desiredRoles.map(r => r.toJson(roleMajorModel.getRoleMajors(r.getRoleId())));
    }

    /**
     * Retrieves a single role by its ID
     * 
     * @param {number} roleId - The ID of the role
     * @returns {{ roleId: number, role: string, company: string, suggestedMajors: string[] }|null} 
     * The role object or null if not found
     */
    getRoleById(roleId) {
        const role = this.db.find(r => r.getRoleId() === roleId);
        if (!role) {
            return null;
        }

        return role.toJson(roleMajorModel.getRoleMajors(role.getRoleId()));
    }

    /**
     * Retrieves role IDs that match any of the provided majors
     * 
     * @param {string[]} majors - Majors to filter roles by
     * @returns {number[]} Role IDs associated with at least one of the majors
     */
    getRolesByMajors(majors) {
        return roleMajorModel.getRoleIdsMatchingAnyMajor(majors);
    }

    /**
     * Computes trend data for a given list of reviews associated with one role
     * 
     * @param {Review[]} reviews - Array of reviews for the same role
     * 
     * @throws {Error} If the reviews are not for the same role
     * @returns {{
     *   roleId: number,
     *   pay: {
     *     avgPay: number,
     *     minPay: number,
     *     maxPay: number
     *   },
     *   avgRating: number,
     *   avgCoop: number
     * }} Trend data summary.
     */
    getRoleTrend(reviews) {
        const roleId = reviews[0].getRoleId();

        reviews.forEach(r => {
            if (r.getRoleId() !== roleId) {
                throw new Error('Reviews are not for the same role.');
            }
        });

        const pays = reviews.map(r => r.getPay());
        const ratings = reviews.map(r => r.getRating());
        const coops = reviews.map(r => r.getCoop());

        return {
            roleId,
            pay: {
                avgPay: Math.round(util.calculateAverage(pays)),
                minPay: util.calculate(pays, util.lessThan),
                maxPay: util.calculate(pays, util.greaterThan)
            },
            avgRating: Math.round(util.calculateAverage(ratings)),
            avgCoop: Math.round(util.calculateAverage(coops))
        };
    }
}

module.exports = new RoleModel();