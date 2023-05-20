import React, {useContext} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Web3 from "web3";
import {AppContext} from "../components/AppContext";

const StartBox = styled(Box)(({theme})=>({
    margin: 'auto',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',

}))
const StartPage = () => {
    const [user, setUser] = useContext(AppContext);

    const authViaMetamask = () => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        web3.eth.requestAccounts().then((accounts) => {
            console.log(accounts);
            setUser(accounts[0])
        })

    }

    return (
        <StartBox>
            <Button onClick={authViaMetamask} sx={{marginTop: 20}}>Войти с MetaMask</Button>
        </StartBox>
    );
};

export default StartPage;