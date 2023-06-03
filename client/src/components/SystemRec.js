import React, {useEffect, useState} from 'react';
import SysRecItem from "./UI/SysRecItem";
import GraphService from "../api/GraphService";
import {useFetching} from "../hooks/useFetching";
import RecLoader from "./UI/RecLoader";

const SystemRec = ({name, data, setData, owner}) => {

    const [recommendations, setRecommendations] = useState([])
    const [search, setSearch] = useState('');

    const [fetchRecs, isRecsLoading, recsError] = useFetching(async (graphName) => {
        const response = await GraphService.getCache(graphName)

        if (response.data.length !== 0) {
            const cache = JSON.parse(response.data[0].data)
            if (cache.length !== 0) {
                setRecommendations(cache)
                return
            }
        }

        const recs = await GraphService.getRecommendations(graphName)
        setRecommendations(recs)
        const cached = await GraphService.setCache(graphName, recs)
        console.log("cached")
    })

    useEffect(() => {
        if (name === "")
            return;
        fetchRecs(name);
    }, [name])

    const searchRecs = () => {
        fetchRecs(search);
    }

    return (
        <div>
            {recsError &&
                <h6>Произошла ошибка: {recsError}</h6>}
            <form className='pr-4 mt-4'>
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input id="default-search"
                           className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-50 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                           placeholder="Поиск рекомендаций..."
                           onChange={event => setSearch(event.target.value)}
                    />
                    <button onClick={(e) => {
                           e.preventDefault();
                           searchRecs();
                    }}
                            className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Поиск
                    </button>
                </div>
            </form>
            {!isRecsLoading &&
                <div className="flow-root">
                    <ul className="divide-y divide-gray-700">
                        {
                            recommendations.map(rec =>
                                <SysRecItem
                                    rec={rec}
                                    key={rec.title}
                                    data={data}
                                    setData={setData}
                                    owner={owner}
                                />
                            )
                        }
                    </ul>
                </div>
            }
            {isRecsLoading &&
                <RecLoader/>
            }
        </div>
    );
};

export default SystemRec;