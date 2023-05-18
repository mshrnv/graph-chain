import React from 'react';
import {Card, FormControl, Grid, Input} from "@mui/material";
import GraphCard from "../components/UI/GraphCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import HubIcon from '@mui/icons-material/Hub';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@mui/material/IconButton";
const graphs = [
    {
        "name": "Изучаем питон",
        "desc": "Это статья про питон",
        "author": "Иван иванов"
    },
    {
        "name": "Изучаем js",
        "desc": "Это статья про js",
        "author": "Иван иванов"
    },
    {
        "name": "Изучаем rubydsfds afdsafdas",
        "desc": "Это статья про питон",
        "author": "Иван иванов"
    },
    {
        "name": "Изучаем php",
        "desc": "Это статья про питон",
        "author": "Иван иванов"
    },
    {
        "name": "Изучаем c++",
        "desc": "Это статья про питон fdsafdslafdsafjf daksjfklsjakjlk",
        "author": "Иван иванов"
    },
]

const CreateGraphButton = styled(Button)(({theme})=>({
    margin: theme.spacing(2, 0)
}))
const CreateBox = styled(Box)(({theme})=> ({
    margin: theme.spacing(0, 1),

}))
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

function InputButton(props) {
    return null;
}

const ListGraphPage = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{width: '60%', margin: 'auto'}}>
            <CreateBox>
                <CreateGraphButton onClick={handleOpen}>
                    <HubIcon sx={{marginRight: 1}}/>
                    Создайте свой граф
                </CreateGraphButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <FormControl sx={style}>
                        <Typography>Введите название графа</Typography>
                        <div>
                            <Input></Input>
                            <IconButton onClick={handleClose} sx={{marginLeft: 2}}>
                                <CheckIcon/>
                            </IconButton>
                        </div>

                    </FormControl>
                </Modal>
            </CreateBox>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                {graphs.map(item =>
                    <GraphCard key={item.name} item={item}></GraphCard>
                )}
            </Grid>
        </Box>
    );
};

export default ListGraphPage;