
const express = require('express')
const { basedir } = global;

const ctrl = require(`../../controllers/products`);

const { ctrlWrapper } = require(`../..helpers`);

const router = express.Router()

// const { auth } = require(`${basedir}/middlewares`);

router.get('/',  ctrlWrapper(ctrl.getAllProducts));

module.exports = router;
