const controller = require('./controller')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const isAuth = require('../../middleware/isAuth')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get((...args) => controller.findAll(...args))
  .post(isAuthAdmin, (...args) => controller.create(...args))

router.route('/id/:id')
  .get((...args) => controller.findById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
router.get('/name/:name', (...args) => controller.findByName(...args))
router.get('/search/:text', isAuthAdmin, (...args) => controller.search(...args))
router.get('/search/', isAuthAdmin, (...args) => controller.search(...args))


router.post('/check', (...args) => controller.check(...args))

router.get('/admin/id/:id', isAuthAdmin, (...args) => controller.findById(...args))


module.exports = router
