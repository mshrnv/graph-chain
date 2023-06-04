import React, {useContext, useState} from 'react';
import {AppContext} from "./AppContext";
import ReviewService from "../api/ReviewService";

const ReviewForm = ({graphId, fetchReviews}) => {

    const [user, setUser] = useContext(AppContext);
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");

    const sendReview = async () => {
        const response = await ReviewService.newReview(graphId, user, rating, text);
        setText("");
        fetchReviews(graphId);
    }

    return (
        <div>
            <form className="mb-4">
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-700">
                    <select id="states"
                            onChange={(event) => setRating(Number(event.target.value))}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-1/10 p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 h-full">
                        <option selected value="5">5 ⭐️</option>
                        <option value="4">4 ⭐️</option>
                        <option value="3">3 ⭐️</option>
                        <option value="2">2 ⭐️</option>
                        <option value="1">1 ⭐️</option>
                    </select>
                    <textarea id="chat" rows="1"
                              onChange={(event) => setText(event.target.value)}
                              className="block mx-4 p-2.5 w-full text-md bg-gray-700 rounded-lg border bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Ваш отзыв..."></textarea>
                    <button type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                sendReview();
                            }}
                            className="inline-flex justify-center p-2 rounded-full cursor-pointer text-blue-500 hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;