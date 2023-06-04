const Router = require('express')
const controller = require('../controllers/ReviewController')

const router = new Router()

// Review API
router.get('/', controller.getGraphReviews)
router.post('/', controller.newReview)
router.delete('/', controller.deleteReview)


module.exports = router