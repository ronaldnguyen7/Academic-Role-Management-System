const roleModel = require('../models/roleModel');
const userMajorModel = require('../models/userMajorModel');
const userModel = require('../models/userModel');
const reviewModel = require('../models/reviewModel');
const tc = require('../utilities/typecheckUtility');

/**
 * Controller to handle GET requests for fetching roles based on filters
 * 
 * Query Parameters:
 * - roleIds: Array<number> (optional) – Filter by role IDs
 * - roles: Array<string> (optional) – Filter by role titles
 * - companies: Array<string> (optional) – Filter by company names
 * - suggestedMajors: Array<string> (optional) – Filter by suggested majors (must match all)
 * 
 * @function
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
exports.getRoles = (req, res) => {
    try {
        let roleIds = tc.parseQueryArray(req.query.roleIds, Number, tc.isNumber, 'number');
        let roles = tc.parseQueryArray(req.query.roles, String, tc.isString, 'string');
        let companies = tc.parseQueryArray(req.query.companies, String, tc.isString, 'string');
        let majors = tc.parseQueryArray(req.query.suggestedMajors, String, tc.isString, 'string');

        const response = roleModel.getRoles(roleIds, roles, companies, majors);
        return res.status(200).json({
            message: 'Roles obtained successfully.',
            roles: response
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error.message
        });
    }
}

/**
 * Controller to handle POST requests for creating a new role
 * 
 * Expected JSON body:
 * - role: string – Role title
 * - company: string – Company name
 * - suggestedMajors: string[] – Array of valid major names
 * 
 * @function
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
exports.createRole = (req, res) => {
    try {
        const role = req.body.role;
        const company = req.body.company;
        const majors = req.body.suggestedMajors;

        if (!role || !company || !majors || majors.length === 0) {
            throw new Error('Company, role title, and suggested majors are required fields.');
        }

        try {
            tc.isString(role);
            tc.isString(company);
        } catch {
            throw new Error('Please ensure the role and company are strings.');
        }

        tc.isArray(majors, tc.isString, null, 'string');

        const response = roleModel.addRole(role, company, majors);
        return res.status(200).json({
            message: 'Role added successfully.',
            role: response
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error.message
        });
    }
}

/**
 * Controller to retrieve matching role IDs for a user's majors
 * 
 * URL Parameter:
 * - userId: number – The ID of the user to match roles for
 * 
 * @function
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
exports.getMatchingRolesByUser = (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            throw new Error('Invalid userId');
        }

        if (!userModel.getUserById(userId)) {
            throw new Error('User does not exist.');
        }

        const majorResponse = userMajorModel.getMajorByUserId(userId);
        const roleResponse = roleModel.getRolesByMajors(majorResponse);
        return res.status(200).json({
            message: 'Roles successfully matched.',
            matchingRoles: roleResponse
        });
    } catch (error) {
        return res.status(404).json({ 
            error: error.message
        });
    }
}

/**
 * Controller to return trend data for a given role based on reviews
 * 
 * URL Parameter:
 * - roleId: number – The ID of the role to generate trend info for
 * 
 * @function
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
exports.getRoleTrend = (req, res) => {
    try {
        const roleId = parseInt(req.params.roleId);
        if (!roleModel.getRoleById(roleId)) {
            throw new Error('Role doesn\'t exist');
        }

        const reviewResponse = reviewModel.getReviewsByRoleId(roleId);
        const response = roleModel.getRoleTrend(reviewResponse);
        return res.status(200).json({
            message: 'Trend successfully received.',
            ...response
        });
    } catch (error) {
        return res.status(404).json({ 
            error: error.message
        });
    }
}