const Review = require('../models/Review')

class ReviewService {
    static async getReviews(graph) {
        const reviews = await Review.find({graphId: graph});
        return reviews
    }

    static async newReview(graph, user, rating, text) {
        const doc = new Review({graphId: graph, userId: user, rating, text});
        await doc.save();

        return doc;
    }

    static async deleteReview(reviewId) {
        const doc = await Review.findByIdAndDelete(reviewId)
        return doc
    }
}

module.exports = ReviewService