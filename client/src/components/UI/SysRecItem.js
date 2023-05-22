import React, {useContext} from 'react';
import {styled} from "@mui/material/styles";
import {IconButton, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RatingRecItem from "./RatingRecItem";
import parseRecItem from "../../utils/parseRecItem";
import Modal from "@mui/material/Modal";
import {FormControl} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {AppContext} from "../AppContext";

const Item = styled('div')(({theme}) => ({
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.recItem.bgColor,
    borderRadius: theme.shape.borderRadius.recItem,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',


}))
const NameItem = styled(Typography)(({theme}) => ({}))

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

const SysRecItem = ({rec, data, setData, owner}) => {
    const [user, setUser] = useContext(AppContext)
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => setSelected(e.target.value);

    const addRecToGraph = () => {

        if (!selected) {
            return;
        }

        let newNodes = data.nodes;
        let newLinks = data.links;

        newNodes.push({
            id: rec.title,
            isRoot: false,
            isFolder: false,
            x: 600,
            y: 100,
            url: rec.url
        })

        newLinks.push({
            "source": selected,
            "target": rec.title
        })

        setData({
            nodes: newNodes,
            links: newLinks
        })
        handleClose()
    }

    return (
        <Item>
            <RatingRecItem props={parseRecItem(rec)}></RatingRecItem>
            <a href={rec.url} style={{color: "white", textDecoration: "none"}}>
                <NameItem>{rec.title}</NameItem>
            </a>
            {
                user === owner ? (
                    <Box>
                        <IconButton onClick={handleOpen} sx={{marginLeft: 'auto'}}>
                            <AddIcon/>
                        </IconButton>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <FormControl sx={style}>
                                <Typography sx={{marginBottom: 2}}>Добавить ресурс "{rec.title}" к ноде:</Typography>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    onChange={handleChange}
                                >
                                    {data.nodes.map((node) =>
                                        <MenuItem key={node.id} value={node.id}>{node.id}</MenuItem>
                                    )}
                                </Select>
                                <div style={{marginTop: 20}}>
                                    <Button onClick={addRecToGraph}>
                                        Да
                                    </Button>
                                    <Button onClick={handleClose}>
                                        Отмена
                                    </Button>
                                </div>
                            </FormControl>
                        </Modal>
                    </Box>
                ) : (
                    <></>
                )
            }
        </Item>
    );
};

export default SysRecItem;