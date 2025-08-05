const userModel = require('./userModel');
const roleModel = require('./roleModel');
const Model = require('../models/BaseModels/model');
const Review = require('../objects/entities/review');

/**
 * ReviewModel manages in-memory storage of reviews
 * Inherits from Model for base ID generation and storage logic
 */
class ReviewModel extends Model {
    constructor() {
        super();
    }

    /**
     * Adds a new review to the database after validation
     * 
     * @param {number} userId - ID of the user submitting the review
     * @param {number} roleId - ID of the role being reviewed
     * @param {number} pay - Hourly pay for the role
     * @param {number} rating - Rating given by the user (1–5)
     * @param {number} coop - Number of co-ops completed by the user (including this one)
     * @param {string} comment - User's comment on the role
     * 
     * @throws {Error} If user or role doesn't exist, or if duplicate review/coop is found
     * @returns {Review} The newly created Review object
     */
    addReview(userId, roleId, pay, rating, coop, comment) {
        if (!userModel.getUserById(userId)) {
            throw new Error('User does not exist.');
        }
    
        if (!roleModel.getRoleById(roleId)) {
            throw new Error('Role does not exist.');
        }

        const userReviews = this.getReviewsByUserId(userId);
        for (let r of userReviews) {
            if (r.getRoleId() === roleId) {
                throw new Error('User has already reviewed this role.');
            }
    
            if (r.getCoop() === coop) {
                throw new Error(`User has already done ${coop} coops.`);
            }
        }

        const newReview = new Review(
            this.generateId(), userId, roleId, pay, rating, coop, comment);
        this.db.push(newReview);
    
        return newReview;
    }

    /**
     * Retrieves all reviews matching the given constraints
     * 
     * @param {number[]|null} reviewIds - Review IDs to filter by
     * @param {number[]|null} userIds - User IDs to filter by
     * @param {number[]|null} roleIds - Role IDs to filter by
     * @param {number} minPay - Minimum pay filter
     * @param {number} maxPay - Maximum pay filter
     * @param {number} minRating - Minimum rating filter
     * @param {number} maxRating - Maximum rating filter
     * @param {number} minCoop - Minimum co-op number filter
     * @param {number} maxCoop - Maximum co-op number filter
     * 
     * @returns {Review[]} An array of matching Review objects
     */
    getReviews(reviewIds, userIds, roleIds, minPay, maxPay, minRating, maxRating, minCoop, maxCoop) {
        minPay = Number(minPay);
        maxPay = Number(maxPay);
        minRating = Number(minRating);
        maxRating = Number(maxRating);
        minCoop = Number(minCoop);
        maxCoop = Number(maxCoop);
    
        let desiredReviews = this.db;
    
        if (reviewIds) {
            reviewIds = new Set(reviewIds);
            desiredReviews = desiredReviews.filter(r => reviewIds.has(r.getReviewId()));
        }
    
        if (userIds) {
            userIds = new Set(userIds);
            desiredReviews = desiredReviews.filter(r => userIds.has(r.getUserId()));
        }
    
        if (roleIds) {
            roleIds = new Set(roleIds);
            desiredReviews = desiredReviews.filter(r => roleIds.has(r.getRoleId()));
        }
    
        if (minPay && minPay != 0) {
            desiredReviews = desiredReviews.filter(r => r.getPay() >= minPay);
        }
    
        if (maxPay && maxPay != Number.POSITIVE_INFINITY) {
            desiredReviews = desiredReviews.filter(r => r.getPay() <= maxPay);
        }
    
        if (minRating && minRating > 1) {
            desiredReviews = desiredReviews.filter(r => r.getRating() >= minRating);
        }
    
        if (maxRating && maxRating <= 5) {
            desiredReviews = desiredReviews.filter(r => r.getRating() <= maxRating);
        }
    
        if (minCoop && minCoop != 1) {
            desiredReviews = desiredReviews.filter(r => r.getCoop() >= minCoop);
        }
    
        if (maxCoop && maxCoop != 5) {
            desiredReviews = desiredReviews.filter(r => r.getCoop() <= maxCoop);
        }
    
        return desiredReviews;
    }

    /**
     * Retrieves a review by its unique ID
     * 
     * @param {number} reviewId - The ID of the review
     * @returns {Review|null} The matching Review object or null if not found
     */
    getReviewById(reviewId) {
        return this.db.find(r => r.getReviewId() === reviewId);
    }

    /**
     * Retrieves all reviews written by a specific user
     * 
     * @param {number} userId - The ID of the user
     * @returns {Review[]} An array of Review objects
     */
    getReviewsByUserId(userId) {
        return this.db.filter(r => r.getUserId() === userId);
    }

    /**
     * Retrieves all reviews associated with a specific role
     * 
     * @param {number} roleId - The ID of the role
     * @returns {Review[]} An array of Review objects
     */
    getReviewsByRoleId(roleId) {
        return this.db.filter(r => r.getRoleId() === roleId);
    }
}

module.exports = new ReviewModel();