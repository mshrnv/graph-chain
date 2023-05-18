import React, {useEffect, useState} from 'react';
import KnowledgeGraph from "./KnowledgeGraph";
import NodeInfo from "./NodeInfo";
import {styled} from "@mui/material/styles";
import GraphService from "../../api/GraphService";

const GraphDiv = styled('div')(({theme})=> ({
   margin: theme.spacing(0,2)
}))
const GraphBox = () => {

    const graphId = "64661b03f28096a71970636c";

    const [owner, setOwner] = useState(null)
    const [data, setData] = useState({nodes: [], likes: []});
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const fetchGraphData = async (graphId) => {
            const graph = await GraphService.getGraphData(graphId);

            setOwner(graph.owner)
            setData(JSON.parse(graph.data));
        }
        fetchGraphData(graphId);
    }, [])

    return (
        <GraphDiv>
            <KnowledgeGraph
                data={data}
                setData={setData}
                setSelected={setSelected}
            />
            <NodeInfo
                data={data}
                setData={setData}
                selected={selected}
                setSelected={setSelected}
                graphId={graphId}
            />
        </GraphDiv>
    );
};

export default GraphBox;