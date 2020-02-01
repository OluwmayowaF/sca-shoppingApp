/* eslint-disable object-curly-newline */
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Order = require('./model/order');

const connUri = 'mongodb://mayowa_dbuser:mayowadBuser@cluster0-shard-00-00-7pndu.mongodb.net:27017,cluster0-shard-00-01-7pndu.mongodb.net:27017,cluster0-shard-00-02-7pndu.mongodb.net:27017/shoppingApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
// Create an order
router.post('/create-order', async (req, res) => {
  mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    const result = {};
    let status = 201;

    if (!err) {
      const {
        name, amount, type, quantity,
      } = req.body;

      const order = new Order({ name, amount, type, quantity });
      order.save((error, newOrder) => {
        if (!error && newOrder) {
          result.status = status;
          result.data = newOrder;
        } else {
          status = 400;
          result.status = status;
          result.message = 'Something Went wrong please see hint for more information';
          result.hint = err;
        }
        res.status(status).send(result);
      });
    } else {
      status = 500;
      result.status = status;
      result.error = err;
      result.message = 'Unable to connect with the database,please try again';
      res.status(status).send(result);
    }
  });
});

// Get all Orders created
router.get('/orders', async (req, res) => {
  mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    const result = {};
    let status = 200;
    if (!err) {
      Order.find({}, (error, order) => {
        if (!error && order) {
          result.status = status;
          result.message = 'All Orders found';
          result.data = order;
        } else {
          status = 404;
          result.status = status;
          result.message = 'No Orders have been found';
        }
        res.status(status).send(result);
      });
    } else {
      status = 500;
      result.status = status;
      result.error = err;
      result.message = 'Unable to connect with the database,please try again';
      res.status(status).send(result);
    }
  });
});

// Update a specific order by id
router.patch('/orders/:id', async (req, res) => {
  mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    const result = {};
    let status = 201;

    if (!err) {
      const {
        name, amount, type, quantity,
      } = req.body;
      const { id } = req.params;
      Order.findOneAndUpdate({ _id: id }, { $set: { name, amount, type, quantity } }, { new: true },
        (error, updatedOrder) => {
          if (!error && updatedOrder) {
            result.status = status;
            result.message = 'Order successfully updated';
            result.data = updatedOrder;
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            result.message = 'Order does not exist, Please try again';
          }
          res.status(status).send(result);
        });
    } else {
      status = 500;
      result.status = status;
      result.error = err;
      result.message = 'Something Went wrong please try again';
      res.status(status).send(result);
    }
  });
});

// View a specific order by Id
router.get('/orders/:id', async (req, res) => {
  mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    const result = {};
    let status = 200;

    if (!err) {
      const { id } = req.params;
      Order.find({ _id: id }, (error, order) => {
        if (!error && order) {
          result.status = status;
          result.data = order;
        } else {
          status = 404;
          result.status = status;
          result.error = error;
          result.message = 'Order does not exist please try again';
        }
        res.status(status).send(result);
      });
    } else {
      status = 500;
      result.status = status;
      result.error = err;
      result.message = 'Something Went wrong please try again';
      res.status(status).send(result);
    }
  });
});

// Delete a specific order
router.delete('/orders/:id', async (req, res) => {
  mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    const result = {};
    let status = 200;

    if (!err) {
      const { id } = req.params;
      Order.findOneAndDelete({ _id: id }, (error, order) => {
        if (!error && order) {
          result.status = status;
          result.message = 'Order Deleted Successfully';
        } else {
          status = 404;
          result.status = status;
          result.error = error;
          result.message = 'Order was not found';
        }
        res.status(status).send(result);
      });
    } else {
      status = 500;
      result.status = status;
      result.error = err;
      result.message = 'Something Went wrong please try again';
      res.status(status).send(result);
    }
  });
});

module.exports = router;
