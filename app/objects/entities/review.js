/**
 * Represents a user review of a role, including pay, rating, and feedback
 */
class Review {
    /**
     * Constructs a new Review instance
     * 
     * @param {number} reviewId - The unique ID of the review
     * @param {number} userId - The ID of the user who submitted the review
     * @param {number} roleId - The ID of the role being reviewed
     * @param {number} pay - The hourly pay rate for the role
     * @param {number} rating - The user's rating of the role
     * @param {number} coop - The coop number the user was on when reviewing
     * @param {string} comment - The user's written feedback
     */
    constructor(reviewId, userId, roleId, pay, rating, coop, comment) {
        this.reviewId = reviewId;
        this.userId = userId;
        this.roleId = roleId;
        this.pay = pay;
        this.rating = rating;
        this.coop = coop;
        this.comment = comment;
    }

    /**
     * Gets the unique ID of the review
     * @returns {number} The review ID
     */
    getReviewId() {
        return this.reviewId
    }

    /**
     * Gets the ID of the user who submitted the review
     * @returns {number} The user ID
     */
    getUserId() {
        return this.userId;
    }

    /**
     * Gets the ID of the role being reviewed
     * @returns {number} The role ID
     */
    getRoleId() {
        return this.roleId;
    }

    /**
     * Gets the pay associated with the role
     * @returns {number} The pay rate
     */
    getPay() {
        return this.pay;
    }

    /**
     * Gets the user's rating of the role
     * @returns {number} The rating
     */
    getRating() {
        return this.rating;
    }

    /**
     * Gets the coop number for the review
     * @returns {number} The coop count
     */
    getCoop() {
        return this.coop;
    }

    /**
     * Gets the user's comment on the role
     * @returns {string} The feedback comment
     */
    getComment() {
        return this.comment;
    }

    /**
     * Converts the review to a JSON-compatible object
     * 
     * @returns {{
     *   reviewId: number,
     *   userId: number,
     *   roleId: number,
     *   pay: number,
     *   rating: number,
     *   coop: number,
     *   comment: string
     * }} The review as a JSON object
     */
    toJson() {
        return {
            reviewId: this.reviewId,
            userId: this.userId,
            roleId: this.roleId,
            pay: this.pay,
            rating: this.rating,
            coop: this.coop,
            comment: this.comment
        }
    }
}

module.exports = Review;