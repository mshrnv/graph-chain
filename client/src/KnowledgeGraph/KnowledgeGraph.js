import React from "react";
import {Graph} from 'react-d3-graph';
import GraphConfig from "./GraphConfig";
import Node from "./Node";


function KnowledgeGraph({data, setData, setSelected}) {

    // the graph configuration
    let myConfig = GraphConfig;
    myConfig["node"]["viewGenerator"] = (node) => <Node node={node} data={data} setData={setData} setSelected={setSelected}/>

    // graph event callbacks
    const onNodeMove = function (node, x, y) {
        const index = data.nodes.findIndex(item => item.id === node)
        let newData = data;

        newData.nodes[index].x = x;
        newData.nodes[index].y = y;

        setData(newData);
    }


    return (
        <div className="knowledge-graph">
            <div id='graph' style={{border: "1px solid black"}}>
                <Graph
                    id="graph-id"
                    data={data}
                    config={myConfig}
                    onNodePositionChange={onNodeMove}
                    onClickGraph={() => setSelected(false)}
                />
            </div>
        </div>
    );
}

export default KnowledgeGraph;
