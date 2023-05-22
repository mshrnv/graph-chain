import React, {useContext} from 'react';
import {FormControl, FormLabel, Input, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import GraphService from "../../api/GraphService";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {AppContext} from "../AppContext";


const DescNode = styled('div')(({theme})=>({
    width: '100%',
    marginTop: theme.spacing(1),

}))

const NodeBox = styled('div')(({theme})=>({
    border: "1px solid grey",
    borderRadius: theme.shape.borderRadius.fields,
    marginBottom: theme.spacing(1)

}))

const InfoFormLabel = styled(FormLabel)(({theme})=>({
    margin: theme.spacing(1,1),
    width: '100%'
}))

const InfoInput = styled(Input)(({theme})=>({
    margin: theme.spacing(1),
    width: '70%'
}))

const AlertMessage = styled(Typography)(({theme})=>({
    margin: theme.spacing(1, 1),

}))

const NodeInfo = ({data, setData, selected, setSelected, graphId, owner}) => {
    const [user, setUser] = useContext(AppContext)
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

    const updateGraph = async () => {
        await GraphService.updateGraphData(graphId, data)
        // toast("🔥Graph saved!");
        // setData(newData)
        toast("🔥Graph saved!");
    }

    const renderNodeInfo = (node) => {

        if (owner !== user) {
            if (node.isFolder) {
                return (
                    <h6>{selected.id}</h6>
                )
            }

            return (
                <div>
                    <h6>{selected.id}</h6>
                    <h6>{selected.description}</h6>
                    <h6>{selected.url}</h6>
                </div>
            )
        }

        if (node.isFolder) {
            return (
                <FormControl sx={{width: '100%'}}>
                    <InfoFormLabel>Название</InfoFormLabel>
                    <Input value={selected.id} onChange={(e) => handleNodeName(selected.id, e.target.value)} />
                </FormControl>
            )
        }

        return (
            <FormControl sx={{width: '100%'}}>
                <InfoFormLabel>Название</InfoFormLabel>
                <InfoInput value={selected.id} onChange={(e) => handleNodeName(selected.id, e.target.value)} />
                <InfoFormLabel>Описание</InfoFormLabel>
                <InfoInput value={selected.description} onChange={(e) => handleNodeDescription(selected.id, e.target.value)} />
                <InfoFormLabel>Ссылка на ресурс</InfoFormLabel>
                <InfoInput value={selected.url} onChange={(e) => handleNodeUrl(selected.id, e.target.value)} />
            </FormControl>
        )
    }

    return (
        <NodeBox>
            <DescNode>
                {selected ? (
                    renderNodeInfo(selected)
                ) : (
                    <AlertMessage>Нода не выбрана</AlertMessage>
                )}
            </DescNode>
            <ToastContainer />
            {
                owner === user ? (
                    <Button onClick={updateGraph}>
                        Сохранить изменения 📁
                    </Button>
                ) : (
                    <></>
                )
            }

        </NodeBox>
    );
};

export default NodeInfo;