import React, {useState} from 'react';
import DataExample from "./DataExample";
import KnowledgeGraph from "./KnowledgeGraph/KnowledgeGraph";
import NodeInfo from "./NodeInfo/NodeInfo";
import axios from "axios";

const GraphPage = () => {

    const [graphId, setGraphId] = useState('64637c511f084604b9b28903')
    const [data, setData] = useState(DataExample);
    const [selected, setSelected] = useState(null);

    const updateGraph = async () => {
        await axios.put('http://localhost:5000/graph', {
            _id: graphId,
            data: JSON.stringify(data)
        })
    }

    return (
        <div>
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
            <button onClick={updateGraph}>
                Save
            </button>
        </div>
    );
};

export default GraphPage;