'use strict';

const Sequelize = require('sequelize-cockroachdb');

// For secure connection to CockroachDB
const fs = require('fs');

const path = require("path");
 
// Connect to CockroachDB through Sequelize
const sequelize = new Sequelize({
  dialect: "postgres",
  username: "pripri99",
  password: "YqmXHAU05AOukdNdnSKfyg",
  host: "free-tier11.gcp-us-east1.cockroachlabs.cloud",
  port: 26257,
  database: "scared-to-compile-18.defaultdb",
  dialectOptions: {
    ssl: {
      
      //For secure connection:
      ca: fs.readFileSync(path.resolve(__dirname, "../certs/root.crt"))
              .toString()
    },
    logging: false, 
  }
});

const DataTypes = Sequelize.DataTypes;

if (!Sequelize.supportsCockroachDB) {
  throw new Error("CockroachDB dialect for Sequelize not installed");
}

module.exports.User = sequelize.define('User', {
  userID: DataTypes.INTEGER,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  timestamps: false
});

module.exports.userToJSON = function(user) {
  return {
    name: user.name,
    time: user.time
  };
};

module.exports.sequelize = sequelize;
