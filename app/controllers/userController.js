const userModel = require('../models/userModel');
const majorModel = require('../models/majorModel');
const util = require('../utilities/utility');
const tc = require('../utilities/typecheckUtility');

/**
 * Controller to handle GET requests for fetching users based on filters
 * 
 * Query Parameters:
 * - userIds: Array<number> (optional) – Filter by user IDs
 * - names: Array<string> (optional) – Filter by names
 * - majors: Array<string> (optional) – Filter by associated majors (e.g., "CS & DESIGN")
 * - emails: Array<string> (optional) – Filter by emails
 * 
 * @function
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * 
 * @returns {void} Sends JSON response with filtered users or error
 */
exports.getUsers = (req, res) => {
    try {
        let userIds = tc.parseQueryArray(req.query.userIds, Number, tc.isNumber, 'number');
        let names = tc.parseQueryArray(req.query.names, String, tc.isString, 'string');
        let majors = tc.parseQueryArray(req.query.majors, String, tc.isString, 'string');
        let emails = tc.parseQueryArray(req.query.emails, String, tc.isString, 'string');

        const response = userModel.getUsers(userIds, names, majors, emails);
        return res.status(200).json({
            message: 'Users obtained successfully.',
            users: response
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error.message
        });
    }
}

/**
 * Controller to handle POST requests for creating a new user
 * 
 * Expected JSON body:
 * - name: string – The name of the user
 * - email: string – The email of the user (must be unique)
 * - major: string – Majors separated by " & " (e.g., "CS & MATH")
 * 
 * @function
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * 
 * @returns {void} Sends JSON response with created user or error
 */
exports.createUser = (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        let major = req.body.major;

        if (!name || !email || !major) {
            throw new Error('Please make sure all fields are filled out.');
        }
        tc.isString(name, `${name} must be a string`);
        tc.isString(email, `${email} must be a string`);
        tc.isString(major, `${major} must be a string`);

        major = major.split(' & ').map(m => m.trim());
        tc.isArray(major, tc.isString, null, 'string');

        const response = userModel.addUser(name, email, major);
        return res.status(200).json({
            message: 'User added successfully.',
            user: response
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error.message
        });
    }
}