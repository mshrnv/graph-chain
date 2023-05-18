import React, {useState} from 'react';
import DataExample from "../../utils/DataExample";
import KnowledgeGraph from "./KnowledgeGraph";
import NodeInfo from "./NodeInfo";
import {styled} from "@mui/material/styles";

const GraphDiv = styled('div')(({theme})=> ({
   margin: theme.spacing(0,2)
}))
const GraphBox = () => {

    const [data, setData] = useState(DataExample);
    const [selected, setSelected] = useState(null);

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
            />
        </GraphDiv>
    );
};

export default GraphBox;