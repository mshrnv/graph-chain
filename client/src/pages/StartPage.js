import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";

const StartBox = styled(Box)(({theme})=>({
    margin: 'auto',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',

}))
const StartPage = () => {
    return (
        <StartBox>
            <Button sx={{marginTop: 20}}>Зарегистрироваться</Button>
        </StartBox>
    );
};

export default StartPage;