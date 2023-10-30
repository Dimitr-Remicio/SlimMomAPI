const express = require('express');

const { basedir } = global;

const ctrl = require(`../../controllers/authentication`);

const { ctrlWrapper } = require(`../../helpers`);

const { auth } = require(`../../middlewares`);

const router = express.Router();

router.post('/register', ctrlWrapper(ctrl.register));

router.post('/login', ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch("/current", auth, ctrlWrapper(ctrl.updateUserSubscription));

module.exports = router;