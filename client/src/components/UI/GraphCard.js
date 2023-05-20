import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from "@mui/material/styles";
import {Grid} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import LikeService from "../../api/LikeService";
import {Link} from "react-router-dom";
import Web3 from "web3";
import {CONTRACT_ADDRESS, CONTRACT_ABI} from "../../ContractConfig"
import {AppContext} from "../AppContext";
import BuyAccessButton from "./BuyAccessButton";

const CardGraph = styled(Card)(({theme})=> ({
    margin: theme.spacing(2, 1),
    maxHeight: '400px',
}))

export default function GraphCard(props) {

    const [user, setUser] = useContext(AppContext)

    const [likesCount, setLikesCount] = useState(0);
    const [hasAccess, setHasAccess] = useState(false);
    const [updateAccess, setUpdateAccess] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            const data = await LikeService.getGraphLikes(props.item._id);
            setLikesCount(data.count);
        }
        fetchLikes();
    }, [])

    useEffect(() => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        contract.methods.hasAccess(user, props.item._id).call({from: user})
            .then((value) => setHasAccess(value))
            .catch((value) => console.log(value));
    }, [updateAccess])

    return (
        <Grid item xs={3} md={3}>
            <CardGraph >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.item.name}
                    </Typography>
                    <Typography  color="text.secondary">
                        {props.item.desc}
                    </Typography>
                    <Typography  color="text.secondary" sx={{marginTop: 2}}>
                        {props.item.owner}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* TODO: Pretty view */}
                    <div>
                        {likesCount}️ ❤️
                    </div>
                    {
                        hasAccess ? (
                            <Link to={`/graph/${props.item._id}`} sx={{marginLeft: 'auto', verticalAlign: 'bottom', color: "green"}}>
                                <Button size="small">View</Button>
                            </Link>
                        ) : (
                            <BuyAccessButton graphId={props.item._id} setUpdateAccess={setUpdateAccess}/>
                            // <Button size="small" sx={{marginLeft:'auto', verticalAlign: 'bottom'}}>Buy access</Button>
                        )
                    }
                </CardActions>
            </CardGraph>
        </Grid>

    );
}