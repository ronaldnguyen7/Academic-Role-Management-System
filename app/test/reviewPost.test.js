const request = require('supertest');
const app = require('../app');
const clearModel = require('../utilities/clearModels');
const testUtil = require('../utilities/testUtility');

beforeAll(async () => {
    clearModel.clearModels();
    await testUtil.createTestUsers();
    await testUtil.createTestRoles();
});

describe('GET /users', () => {
    it('Gets all users in the database', async () => {
        const res = await request(app).get('/users');
        expect(res.body).toHaveProperty('message', 'Users obtained successfully.');
        expect(res.body).toHaveProperty('users', [
            {
                userId: 1,
                name: "Paulo Martinez Amezaga",
                email: "rn@gmail.com",
                major: "COMPUTER SCIENCE & MATH"
            },
            {
                userId: 2,
                name: "Brayden Rumack",
                email: "br@outlook.com",
                major: "MATH & DESIGN"
            },
            {
                userId: 3,
                name: "Ronald Nguyen",
                email: "rn@northeastern.edu",
                major: "COMPUTER SCIENCE"
            },
            {
                userId: 4,
                name: "Alex Rhonemus",
                email: "ar@aol.com",
                major: "MATH"
            },
            {
                userId: 5,
                name: "Tyler Go",
                email: "tg@icloud.com",
                major: "COMPUTER SCIENCE"
            },
            {
                userId: 6,
                name: "Lucas Fu",
                email: "lf@yahoo.com",
                major: "DESIGN"
            }
        ]);
    });
});

describe('GET /roles', () => {
    it('gets all the roles in the database', async () => {
        const res = await request(app).get('/roles');
        expect(res.body).toHaveProperty('message', 'Roles obtained successfully.');
        expect(res.body).toHaveProperty('roles', [
            {
                company: "Meta",
                roleId: 1,
                role: "UI/UX Designer",
                suggestedMajors: ["DESIGN"]
            },
            {
                company: "Amazon",
                roleId: 2,
                role: "Software Engineer",
                suggestedMajors: ["COMPUTER SCIENCE"]
            },
            {
                company: "Apple",
                roleId: 3,
                role: "iOS Developer",
                suggestedMajors: ["COMPUTER SCIENCE", "MATH"]
            },
            {
                company: "Netflix",
                roleId: 4,
                role: "Full-Stack Engineer",
                suggestedMajors: ["COMPUTER SCIENCE", "DESIGN"]
            },
            {
                company: "Google",
                roleId: 5,
                role: "Data Engineer",
                suggestedMajors: ["COMPUTER SCIENCE", "MATH"]
            }
        ]);
    });
});

describe('GET /reviews', () => {
    it('gets an empty list of reviews', async () => {
        const res = await request(app).get('/reviews');
        expect(res.body).toHaveProperty('message', 'Reviews obtained successfully.');
        expect(res.body).toHaveProperty('reviews', []);
    });
});

describe('POST /reviews', () => {
    it('tries to post a review with missing fields', async () => {
        const res = await testUtil.addReview(7, 1, 5, null, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Please make sure all fields are filled out.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where user does not exist', async () => {
        const res = await testUtil.addReview(7, 1, 5, 3, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'User does not exist.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the userId is not a number', async () => {
        const res = await testUtil.addReview('Ronald Nguyen', 1, 5, 3, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'UserId and RoleId must be identifiers.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the role does not exist', async () => {
        const res = await testUtil.addReview(2, 6, 5, 3, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Role does not exist.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the roleId is not a number', async () => {
        const res = await testUtil.addReview(2, 'Software Engineer', 5, 3, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'UserId and RoleId must be identifiers.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the pay is negative', async () => {
        const res = await testUtil.addReview(2, 2, -1, 3, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Pay cannot be less than 0.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the pay is not a number', async () => {
        const res = await testUtil.addReview(2, 2, '50', 3, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Pay, Rating, Coop must all be a number.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the rating is not a number', async () => {
        const res = await testUtil.addReview(2, 2, 5, '3', 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Pay, Rating, Coop must all be a number.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the coop is not a number', async () => {
        const res = await testUtil.addReview(2, 2, 5, 3, '1', "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Pay, Rating, Coop must all be a number.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the comment is not a String', async () => {
        const res = await testUtil.addReview(2, 2, 5, 3, 1, 6);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Comment must all be a String.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the rating is > 5', async () => {
        const res = await testUtil.addReview(2, 2, 5, 6, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Rating must be between 1 and 5 inclusive.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the rating is < 1', async () => {
        const res = await testUtil.addReview(2, 2, 5, -1, 1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Rating must be between 1 and 5 inclusive.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the coop is < 1', async () => {
        const res = await testUtil.addReview(2, 2, 5, 3, -1, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Coop must be between 1 and 3 inclusive.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review where the coop is > 3', async () => {
        const res = await testUtil.addReview(2, 2, 5, 3, 4, "");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'Coop must be between 1 and 3 inclusive.'
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a valid review', async () => {
        const res = await testUtil.addReview(1, 2, 35, 4, 2, "It was great");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty(
            'message', 'Review has been successfully added.'
        );
        expect(res.body).toHaveProperty(
            'review', {
                userId : 1,
                roleId : 2,
                pay : 35,
                rating : 4,
                coop : 2,
                reviewId : 1,
                comment : "It was great"
            }
        );
    });
});

describe('POST /reviews', () => {
    it('tries to post a review for a role that has already been reviewed by the user', async () => {
        const res = await testUtil.addReview(1, 2, 35, 2, 1, "Would do again");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'User has already reviewed this role.'
        )
    })
})

describe('POST /reviews', () => {
    it('tries to post a review from a user that is claim it is his second coop again', async () => {
        const res = await testUtil.addReview(1, 3, 40, 2, 2, "Great Coop");
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty(
            'error', 'User has already done 2 coops.'
        )
    })
})