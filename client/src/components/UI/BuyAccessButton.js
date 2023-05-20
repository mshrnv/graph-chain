import React, {useContext} from 'react';
import Modal from "@mui/material/Modal";
import {FormControl} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {AppContext} from "../AppContext";
import Web3 from "web3";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "../../ContractConfig";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BuyAccessButton = ({graphId, setUpdateAccess}) => {
    const [user, setUser] = useContext(AppContext)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const buyAccess = () => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        contract.methods.buyAccess(graphId).send({ from: user, value: web3.utils.toWei(String(2), 'ether') })
            .then((value) => setUpdateAccess((item) => !item))
            .catch((value) => console.log(value));

        handleClose()
    }

    return (
        <Box>
            <Button onClick={handleOpen}>
                Buy access
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <FormControl sx={style}>
                    <Typography sx={{marginBottom: 2}}>Вы уверены что хотите купить доступ к графу за 2 ETH?</Typography>
                    <div>
                        <Button onClick={buyAccess}>
                            Да
                        </Button>
                        <Button onClick={handleClose}>
                            Отмена
                        </Button>
                    </div>

                </FormControl>
            </Modal>
        </Box>
    );
};

export default BuyAccessButton;