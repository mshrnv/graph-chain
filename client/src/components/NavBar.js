import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useContext, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import {AppContext} from "./AppContext";
import {ReactComponent as EthIcon} from "../assets/ethereum.svg"
import Web3 from "web3";

const BarTypography = styled(Typography)(({theme})=>({
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    color: theme.palette.nav.text
}))

const Bar = styled(AppBar)(({theme})=>({
    backgroundColor: theme.palette.nav.bgColor
}))

export default function Nav() {
    const [user, setUser] = useContext(AppContext)
    const [balance, setBalance] = useState(0)

    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

    useEffect(() => {
        if (!user) {
            return;
        }

        web3.eth.getBalance(user, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                setBalance(web3.utils.fromWei(result, "ether"));
            }
        })
    }, [user])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Bar position="static">
                <Toolbar>
                    <Button sx={{marginLeft: 0}}>
                        К графам
                    </Button>

                    {user ?
                        <Box sx={{display: { md: 'flex', marginLeft: 'auto', alignItems: 'center'}}}>
                            <BarTypography>{balance}</BarTypography>
                            <EthIcon width={20} />
                            <BarTypography sx={{marginLeft: '30px'}}>{user}</BarTypography>
                        </Box>
                        :
                        <></>
                    }

                </Toolbar>
            </Bar>
        </Box>
    );
}
