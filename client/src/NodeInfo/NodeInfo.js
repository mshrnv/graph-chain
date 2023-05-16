import React from 'react';
import {FormControl, FormLabel, Input} from "@mui/joy";

const NodeInfo = ({data, setData, selected, setSelected}) => {

    const handleNodeName = (oldName, newName) => {
        const newNodes = data.nodes.map((item) => {
            if (item.id === oldName) {
                return {...item, id: newName}
            }
            return item
        })

        const newLinks = data.links.map((item) => {
            if (item.source === oldName) {
                return {...item, source: newName}
            }
            if (item.target === oldName) {
                return {...item, target: newName}
            }
            return item
        })

        setData({nodes: newNodes, links: newLinks});
        setSelected({...selected, id: newName});
    }

    const handleNodeDescription = (node, description) => {
        const newNodes = data.nodes.map((item) => {
            if (item.id === node) {
                return {...item, description}
            }
            return item
        })

        setData({
            nodes: newNodes,
            links: data.links
        })
        setSelected({...selected, description});
    }

    const handleNodeUrl = (node, url) => {
        const newNodes = data.nodes.map((item) => {
            if (item.id === node) {
                return {...item, url}
            }
            return item
        })

        setData({
            nodes: newNodes,
            links: data.links
        })
        setSelected({...selected, url});
    }


    const renderNodeInfo = (node) => {
        if (node.isFolder) {
            return (
                <FormControl>
                    <FormLabel>Название</FormLabel>
                    <Input value={selected.id} onChange={(e) => handleNodeName(selected.id, e.target.value)} />
                </FormControl>
            )
        }

        return (
            <FormControl>
                <FormLabel>Название</FormLabel>
                <Input value={selected.id} onChange={(e) => handleNodeName(selected.id, e.target.value)} />
                <hr/>
                <FormLabel>Описание</FormLabel>
                <Input value={selected.description} onChange={(e) => handleNodeDescription(selected.id, e.target.value)} />
                <hr/>
                <FormLabel>Ссылка на ресурс</FormLabel>
                <Input value={selected.url} onChange={(e) => handleNodeUrl(selected.id, e.target.value)} />
            </FormControl>
        )
    }

    return (
        <div className="knowledge-graph-info">
            <div id='graph' style={{border: "1px solid black", marginTop: 20, padding: 8}}>
                {selected ? (
                    renderNodeInfo(selected)
                ) : (
                    <p>Нода не выбрана</p>
                )}
            </div>
        </div>
    );
};

export default NodeInfo;