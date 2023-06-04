import axios from "axios";

class ReviewService {
    static async getGraphReviews(graphId) {
        const reviews = await axios.get('http://localhost:5000/review/?graph=' + graphId);
        return reviews.data
    }

    static async newReview(graph, user, rating, text) {
        const review = await axios.post('http://localhost:5000/review', {
            graph, user, rating, text
        });

        return review.data
    }

    static async deleteReview(reviewId) {
        const review = await axios.delete('http://localhost:5000/review/?reviewId=' + reviewId);

        return review.data
    }
}

export default ReviewService;