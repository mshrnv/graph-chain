const ReviewService = require('../services/ReviewService')

class ReviewController {
    async getGraphReviews(req, res) {
        try {
            const {graph} = req.query

            if (!graph) {
                res.status(404).json({
                    message: "Не передано название графа"
                })
            }

            const reviews = await ReviewService.getReviews(graph)
            res.json(reviews)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка получения отзывов"
            })
        }
    }

    async newReview(req, res) {
        try {
            const {graph, user, rating, text} = req.body;

            if (!graph || !user) {
                res.status(404).json({
                    message: "Не передан граф или пользователь"
                })
            }

            const review = await ReviewService.newReview(graph, user, rating, text);
            res.json(review);
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка добавления отзыва"
            })
        }
    }

    async deleteReview(req, res) {
        try {
            const {reviewId} = req.query;

            if (!reviewId) {
                res.status(404).json({
                    message: "Не передан id отзыва"
                })
            }

            const deleted = await ReviewService.deleteReview(reviewId);
            res.json(deleted);
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка удаления отзыва"
            })
        }
    }

}

module.exports = new ReviewController()