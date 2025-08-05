const reviewModel = require('../models/reviewModel');
const tc = require('../utilities/typecheckUtility');

/**
 * Controller to handle GET requests for fetching reviews with optional filters
 * 
 * Query Parameters:
 * - reviewIds: number[] (optional) – Filter by specific review IDs
 * - userIds: number[] (optional) – Filter by user IDs
 * - roleIds: number[] (optional) – Filter by role IDs
 * - minPay: number (optional) – Minimum pay (default: 0)
 * - maxPay: number (optional) – Maximum pay (default: ∞)
 * - minRating: number (optional) – Minimum rating (default: 0)
 * - maxRating: number (optional) – Maximum rating (default: 5)
 * - minCoop: number (optional) – Minimum coop number (default: 1)
 * - maxCoop: number (optional) – Maximum coop number (default: 3)
 * 
 * @function
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
exports.getReviews = (req, res) => {
    try {
        const reviewIds = tc.parseQueryArray(req.query.reviewIds, Number, tc.isNumber, 'number');
        const userIds = tc.parseQueryArray(req.query.userIds, Number, tc.isNumber, 'number');
        const roleIds = tc.parseQueryArray(req.query.roleIds, Number, tc.isNumber, 'number');
        const minPay = req.query.minPay || 0;
        const maxPay = req.query.maxPay || Number.POSITIVE_INFINITY;
        const minRating = req.query.minRating || 0;
        const maxRating = req.query.maxRating || 5;
        const minCoop = req.query.minCoop || 1;
        const maxCoop = req.query.maxCoop || 3;

        const response = reviewModel.getReviews(
            reviewIds, userIds, roleIds, minPay, maxPay, minRating, maxRating, minCoop, maxCoop
        );

        return res.status(200).json({
            message: 'Reviews obtained successfully.',
            reviews: response
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error.message
        });
    }
}

/**
 * Controller to handle POST requests for submitting a new review
 * 
 * Expected JSON Body:
 * - userId: number – ID of the user writing the review
 * - roleId: number – ID of the role being reviewed
 * - pay: number – Hourly wage reported by the user
 * - rating: number – Rating from 1 to 5
 * - coop: number – Coop number (1–3) the review is based on
 * - comment: string (optional) – Optional comment text
 * 
 * Validations:
 * - All fields are required except `comment`
 * - `pay` must be >= 0
 * - `rating` must be between 1 and 5
 * - `coop` must be between 1 and 3
 * 
 * @function
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
exports.createReview = (req, res) => {
    try {
        const userId = req.body.userId;
        const roleId = req.body.roleId;
        const pay = req.body.pay;
        const rating = req.body.rating;
        const coop = req.body.coop;
        const comment = req.body.comment || "";

        if (!userId || !roleId || !pay || !rating || !coop) {
            throw new Error('Please make sure all fields are filled out.'); 
        }

        tc.isNumber(userId, 'UserId and RoleId must be identifiers.');
        tc.isNumber(roleId, 'UserId and RoleId must be identifiers.');
        tc.isNumber(pay, 'Pay, Rating, Coop must all be a number.');
        tc.isNumber(rating, 'Pay, Rating, Coop must all be a number.');
        tc.isNumber(coop, 'Pay, Rating, Coop must all be a number.');
        tc.isString(comment, 'Comment must all be a String.');

        if (pay < 0) {
            throw new Error('Pay cannot be less than 0.');
        }

        if (rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1 and 5 inclusive.');
        }

        if (coop < 1 || coop > 3) {
            throw new Error('Coop must be between 1 and 3 inclusive.');
        }

        const response = reviewModel.addReview(userId, roleId, pay, rating, coop, comment);
        return res.status(200).json({
            message: 'Review has been successfully added.',
            review: response
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error.message
        });
    }
}