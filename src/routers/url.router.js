const router = require('express').Router({mergeParams: true});
const url_usesRouter = require('./url_uses.router');
const controller = require('./url.controller');
const notAllowed = require('../errors/notAllowed');


router.use('/:urlId/uses', controller.requestedUrlExists, url_usesRouter)


router
    .route('/:urlId')
    .get(controller.read)
    .put(controller.update)
    .all(notAllowed)


router
    .route('/')
    .get(controller.list)
    .post(controller.create)
    .all(notAllowed);

module.exports = router;