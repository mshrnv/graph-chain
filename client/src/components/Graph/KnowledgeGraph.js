import React, {useState} from "react";
import {Graph} from 'react-d3-graph';
import GraphConfig from "../../utils/GraphConfig";
import Node from "./Node";
import {styled} from "@mui/material/styles";
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const DivKGraph = styled('div')(({theme}) => ({
    width: '100%',
    backgroundColor: '#bdbdf2',
    margin: theme.spacing(2, 0),
    borderRadius: '5px'
}))

function KnowledgeGraph({data, setData, setSelected}) {

    // the graph configuration
    let myConfig = GraphConfig;
    myConfig["node"]["viewGenerator"] = (node) => <Node node={node} data={data} setData={setData}
                                                        setSelected={setSelected}/>

    // graph event callbacks
    const onNodeMove = function (node, x, y) {
        const index = data.nodes.findIndex(item => item.id === node)
        let newData = data;

        newData.nodes[index].x = x;
        newData.nodes[index].y = y;

        setData(newData);
    }

    const [classes, setClasses] = useState(["knowledge-graph", "relative"]);
    const [fullScreen, setFullScreen] = useState(false);


    return (
        <div className={"knowledge-graph relative"}>
            <DivKGraph id='graph'>
                <Graph
                    id="graph-id"
                    data={data}
                    config={myConfig}
                    onNodePositionChange={onNodeMove}
                    onClickGraph={() => setSelected(false)}
                />
            </DivKGraph>
            <div className='absolute bottom-2 right-2'>
                <button>
                    <FullscreenIcon/>
                </button>
            </div>
        </div>
    );
}

export default KnowledgeGraph;
