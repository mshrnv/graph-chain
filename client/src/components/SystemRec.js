import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import SysRecItem from "./UI/SysRecItem";
import GraphService from "../api/GraphService";
import {useFetching} from "../hooks/useFetching";

const SysHeader = styled(Typography)(({theme})=> ({
    textAlign: 'center',
    margin: theme.spacing(1, 0)
}))
const SystemRec = ({name}) => {

    const [recommendations, setRecommendations] = useState([])

    const [fetchRecs, isRecsLoading, recsError] = useFetching(async (graphName) => {
        const recs = await GraphService.getRecommendations(graphName)
        setRecommendations(recs)
    })

    useEffect(() => {
        if (name === "")
            return
        fetchRecs(name)
    }, [name])

    return (
        <div>
            {recsError &&
                <h1>Произошла ошибка: {recsError}</h1>}
            <SysHeader>Приложение рекомендует:</SysHeader>
            {
                recommendations.map(rec =>
                    <SysRecItem rec={rec} key={rec.title} />
                )
            }
            {isRecsLoading &&
                <h1>Загрузка рекомендаций</h1>
            }
        </div>
    );
};

export default SystemRec;