'use strict';

var Sequelize = require('sequelize-cockroachdb');

// For secure connection to CockroachDB
const fs = require('fs');

const path = require("path");
 
// Connect to CockroachDB through Sequelize
var sequelize = new Sequelize({
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
  },
  logging: false, 
});

var DataTypes = Sequelize.DataTypes;

if (!Sequelize.supportsCockroachDB) {
  throw new Error("CockroachDB dialect for Sequelize not installed");
}

module.exports.Customer = sequelize.define('customer', {
  name: DataTypes.STRING
}, {
  timestamps: false
});

module.exports.customerToJSON = function(customer) {
  return {
    id: parseInt(customer.id),
    name: customer.name
  };
};

module.exports.Order = sequelize.define('order', {
  customer_id: DataTypes.INTEGER,
  subtotal: DataTypes.DECIMAL(18, 2)
}, {
  timestamps: false
});

module.exports.orderToJSON = function(order) {
  return{
    id: parseInt(order.id),
    subtotal: order.subtotal,
    customer: {
      id: order.customer_id
    }
  };
};

module.exports.OrderProduct = sequelize.define('order_products', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  timestamps: false
});

module.exports.Product = sequelize.define('product', {
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL(18, 2)
}, {
  timestamps: false
});

module.exports.productToJSON = function(product) {
  return {
    id: parseInt(product.id),
    name: product.name,
    price: product.price,
  };
};

module.exports.sequelize = sequelize;
//module.exports.Sequelize = Sequelize;

