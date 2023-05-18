import React from 'react';
import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import SysRecItem from "./UI/SysRecItem";

const SysHeader = styled(Typography)(({theme})=> ({
    textAlign: 'center',
    margin: theme.spacing(1, 0)
}))
const SystemRec = () => {
    return (
        <div>
            <SysHeader>Приложение рекомендует</SysHeader>
            <SysRecItem></SysRecItem>
            <SysRecItem></SysRecItem>
            <SysRecItem></SysRecItem>
            <SysRecItem></SysRecItem>
        </div>
    );
};

export default SystemRec;