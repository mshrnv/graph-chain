import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import SysRecItem from "./UI/SysRecItem";
import GraphService from "../api/GraphService";
import {useFetching} from "../hooks/useFetching";
import RecLoader from "./UI/RecLoader";

const SysHeader = styled(Typography)(({theme})=> ({
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    margin: theme.spacing(1, 0)
}))
const SystemRec = ({name, data, setData, owner}) => {

    const [recommendations, setRecommendations] = useState([])

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
            return
        fetchRecs(name)
    }, [name])

    return (
        <div>
            {recsError &&
                <h6>Произошла ошибка: {recsError}</h6>}
            <SysHeader>Приложение рекомендует:</SysHeader>
            <hr color={'white'}/>
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
            {isRecsLoading &&
                <RecLoader />
            }
        </div>
    );
};

export default SystemRec;