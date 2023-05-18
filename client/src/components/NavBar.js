import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useContext, useState} from "react";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PaidIcon from '@mui/icons-material/Paid';
import {AppContext} from "./AppContext";
const BarTypography = styled(Typography)(({theme})=>({
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    color: theme.palette.nav.text
}))
const Bar = styled(AppBar)(({theme})=>({
    backgroundColor: theme.palette.nav.bgColor
}))

export default function Nav() {
    const {user} = useContext(AppContext)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Bar position="static">
                <Toolbar>
                    <Button sx={{marginLeft: 0}}>
                        К графам
                    </Button>

                    {user.id ?
                        <Box sx={{display: { md: 'flex', marginLeft: 'auto', alignItems: 'center'}}}>
                            <IconButton sx={{marginRight: 1}} >
                                <PaidIcon size='small'/>
                            </IconButton>
                            <BarTypography >4.8</BarTypography>
                            <BarTypography>Ваш логин</BarTypography>
                        </Box>
                        :
                        <Button  sx={{marginLeft: 'auto'}}>Войти</Button>
                    }

                </Toolbar>
            </Bar>
        </Box>
    );
}
