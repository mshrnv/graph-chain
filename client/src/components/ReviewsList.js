import React from 'react';
import {Badge} from "flowbite-react";

const ReviewsList = ({reviews}) => {
    return (
        <div>
            {
                reviews.map(review => (
                    <div className="w-full bg-gray-700 rounded rounded-md mb-4 pl-4 pt-4 pb-3">
                        <div className="flex flex-row">
                            <div className="mr-4">
                                <Badge
                                    color="dark"
                                    size="xs"
                                    className={'h-full'}
                                >
                                    {review.rating} ⭐️
                                </Badge>
                            </div>
                            <div className='w-fit'>
                                <Badge
                                    color="info"
                                    size="xs"
                                    className={'h-full'}
                                >
                                    {review.userId}
                                </Badge>
                            </div>
                        </div>
                        <div className={'mt-2'}>
                            <h6 className="text-lg font-bold text-white">{review.text}</h6>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ReviewsList;