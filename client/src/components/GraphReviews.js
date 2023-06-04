import React, {useEffect, useState} from 'react';
import ReviewService from "../api/ReviewService";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import {useFetching} from "../hooks/useFetching";

const GraphReviews = ({graphId}) => {

    const [reviews, setReviews] = useState([])

    const [fetchReviews, isReviewsLoading, reviewsError] = useFetching(async (graph) => {
        const response = await ReviewService.getGraphReviews(graph)
        setReviews(response)
    })

    useEffect(() => {
        fetchReviews(graphId)
    }, [])

    return (
        <div className='w-full px-6 mt-8'>
            <ReviewForm graphId={graphId} fetchReviews={fetchReviews} />
            <ReviewsList reviews={reviews}/>
        </div>
    );
};

export default GraphReviews;