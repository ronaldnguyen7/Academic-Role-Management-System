const userModel = require('../models/userModel');
const roleModel = require('../models/roleModel');
const companyModel = require('../models/companyModel');
const userMajorModel = require('../models/userMajorModel');
const roleMajorModel = require('../models/roleMajorModel');
const reviewModel = require('../models/reviewModel');

const clearModels = () => {
    userModel.clearModel();
    roleModel.clearModel();
    companyModel.clearModel();
    userMajorModel.clearModel();
    roleMajorModel.clearModel();
    reviewModel.clearModel();
};

module.exports = {
    clearModels
};