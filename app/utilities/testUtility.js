const request = require('supertest');
const app = require('../app');

const statusCode = (res, msg) => {
    if (res.statusCode != 200) {
        console.log(res.body.error);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', msg);
}

const addUser = async (name, email, major) => {
    return await request(app).post('/users').send({name, email, major});
};

const addRole = async (role, company, majors) => {
    return await request(app).post('/roles').send({role, company, suggestedMajors : majors});
};

const addReview = async (userId, roleId, pay, rating, coop, comment) => {
    return await request(app).post('/reviews').send({userId, roleId, pay, rating, coop, comment});
};

const users = [
    { userId: 1, name: 'Paulo Martinez Amezaga', email: 'rn@gmail.com', major: 'COMPUTER SCIENCE & MATH' },
    { userId: 2, name: 'Brayden Rumack', email: 'br@outlook.com', major: 'MATH & DESIGN' },
    { userId: 3, name: 'Ronald Nguyen', email: 'rn@northeastern.edu', major: 'COMPUTER SCIENCE' },
    { userId: 4, name: 'Alex Rhonemus', email: 'ar@aol.com', major: 'MATH' },
    { userId: 5, name: 'Tyler Go', email: 'tg@icloud.com', major: 'COMPUTER SCIENCE' },
    { userId: 6, name: 'Lucas Fu', email: 'lf@yahoo.com', major: 'DESIGN' }
];

const createTestUsers = async () => {
    for (const u of users) {
        await addUser(u.name, u.email, u.major);
    }
}

const roles = [
    { roleId: 1, role: 'UI/UX Designer', company: 'Meta', suggestedMajors: ['DESIGN'] },
    { roleId: 2, role: 'Software Engineer', company: 'Amazon', suggestedMajors: ['COMPUTER SCIENCE'] },
    { roleId: 3, role: 'iOS Developer', company: 'Apple', suggestedMajors: ['COMPUTER SCIENCE', 'MATH'] },
    { roleId: 4, role: 'Full-Stack Engineer', company: 'Netflix', suggestedMajors: ['COMPUTER SCIENCE', 'DESIGN'] },
    { roleId: 5, role: 'Data Engineer', company: 'Google', suggestedMajors: ['COMPUTER SCIENCE', 'MATH'] }
];


const createTestRoles = async () => {
    for (const r of roles) {
        await addRole(r.role, r.company, r.suggestedMajors);
    }
};

const reviews = [
    // Paulo Martinez Amezaga (userId = 1)
    { reviewId: 1, userId: 1, roleId: 2, pay: 42, rating: 5, coop: 1, comment: "" },
    { reviewId: 2, userId: 1, roleId: 5, pay: 38, rating: 4, coop: 2, comment: "" },
    { reviewId: 3, userId: 1, roleId: 4, pay: 40, rating: 3, coop: 3, comment: "" },

    // Brayden Rumack (userId = 2)
    { reviewId: 4, userId: 2, roleId: 1, pay: 30, rating: 5, coop: 1, comment: "" },
    { reviewId: 5, userId: 2, roleId: 5, pay: 35, rating: 4, coop: 2, comment: "" },
    { reviewId: 6, userId: 2, roleId: 4, pay: 33, rating: 3, coop: 3, comment: "" },

    // Ronald Nguyen (userId = 3)
    { reviewId: 7, userId: 3, roleId: 2, pay: 45, rating: 5, coop: 1, comment: "" },
    { reviewId: 8, userId: 3, roleId: 3, pay: 40, rating: 3, coop: 2, comment: "" },
    { reviewId: 9, userId: 3, roleId: 5, pay: 39, rating: 4, coop: 3, comment: "" },

    // Alex Rhonemus (userId = 4)
    { reviewId: 10, userId: 4, roleId: 5, pay: 41, rating: 4, coop: 1, comment: "" },
    { reviewId: 11, userId: 4, roleId: 3, pay: 36, rating: 3, coop: 2, comment: "" },
    { reviewId: 12, userId: 4, roleId: 1, pay: 35, rating: 4, coop: 3, comment: "" },

    // Tyler Go (userId = 5)
    { reviewId: 13, userId: 5, roleId: 2, pay: 39, rating: 4, coop: 1, comment: "" },
    { reviewId: 14, userId: 5, roleId: 4, pay: 37, rating: 5, coop: 2, comment: "" },
    { reviewId: 15, userId: 5, roleId: 3, pay: 38, rating: 3, coop: 3, comment: "" },

    // Lucas Fu (userId = 6)
    { reviewId: 16, userId: 6, roleId: 1, pay: 34, rating: 3, coop: 1, comment: "" },
    { reviewId: 17, userId: 6, roleId: 4, pay: 32, rating: 2, coop: 2, comment: "" },
    { reviewId: 18, userId: 6, roleId: 5, pay: 36, rating: 4, coop: 3, comment: "" }
];

const createTestReviews = async () => {
    for (const r of reviews) {
        await addReview(r.userId, r.roleId, r.pay, r.rating, r.coop, r.comment);
    }
};


module.exports = {
    statusCode,
    addUser,
    addRole,
    addReview,
    users,
    createTestUsers,
    roles,
    createTestRoles,
    reviews,
    createTestReviews
};