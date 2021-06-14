const router = require('express').Router({mergeParams: true});
const controller = require('./url_uses.controller');
const notAllowed = require('../errors/notAllowed');

router
    .route('/:useId')
    .get(controller.read)
    .delete(controller.destroy)
    .all(notAllowed)

router
    .route('/')
    .get(controller.list)
    .all(notAllowed)

module.exports = router