const sequelize = require('../db/squdb')
const Sequelize = require('sequelize');

const User = sequelize.define('User',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [6]
    }
})

module.exports = User