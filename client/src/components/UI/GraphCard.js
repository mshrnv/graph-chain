import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {styled} from "@mui/material/styles";
import {useContext, useEffect, useState} from "react";
import LikeService from "../../api/LikeService";
import {Link} from "react-router-dom";
import Web3 from "web3";
import {CONTRACT_ADDRESS, CONTRACT_ABI} from "../../ContractConfig"
import {AppContext} from "../AppContext";
import BuyAccessButton from "./BuyAccessButton";
import {Badge, Button} from "flowbite-react";
import transformAddress from "../../utils/addressTransform";

const CardGraph = styled(Card)(({theme}) => ({
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
        <div className='h-auto max-w-full rounded-lg'>
            <CardGraph className='p-2 rounded-lg'>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.item.name}
                    </Typography>
                    <Typography color="text.secondary">
                        {props.item.desc}
                    </Typography>
                    <Typography color="text.secondary" sx={{marginTop: 2}}>
                        <Badge
                            color="info"
                            size="sm"
                            className='w-fit'
                        >
                            {transformAddress(props.item.owner)}
                        </Badge>
                    </Typography>
                </CardContent>
                <CardActions>
                    <div className='w-full'>
                        {
                            hasAccess ? (
                                <Link className={'float-left'} to={`/graph/${props.item._id}`}
                                      sx={{marginLeft: 'auto', verticalAlign: 'bottom', color: "green"}}>
                                    <Button className='font-extrabold' size={'sm'} gradientMonochrome="success">
                                        Перейти
                                    </Button>
                                </Link>
                            ) : (
                                <BuyAccessButton graphId={props.item._id} setUpdateAccess={setUpdateAccess}/>
                            )
                        }
                    </div>
                </CardActions>
            </CardGraph>
        </div>

    );
}