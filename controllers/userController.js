const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const headcount = async () => {
    const numOfUsers = await User.aggregate().count('userCount');
    return numOfUsers;
};

module.exports = {
    //Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                headcount: await headcount(),
            };

            res.json(userObj);
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },
    // get a single user
    async getUserById(req, res) {
        try{
            const user = await User.findOne({
                _id: req.params.//UserId
            })
        } catch (error){

        }
    }
}