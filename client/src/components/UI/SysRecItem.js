import React,  from 'react';
import {styled} from "@mui/material/styles";
import {IconButton, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RatingRecItem from "./RatingRecItem";

const Item = styled('div')(({theme})=> ({
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.recItem.bgColor,
    borderRadius: theme.shape.borderRadius.recItem,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',


}))
const NameItem = styled(Typography)(({theme})=>({

}))
const SysRecItem = () => {

    const rating = [
        {
            rate: 90,
            resource: 'github'
        },
        {
            rate: 100,
            resource: 'habr'
        },
        {
            rate: 21,
            resource: 'youtube'
        }
    ]
    return (
        <Item>

            <RatingRecItem props={rating[1]}></RatingRecItem>
            <NameItem>Это статья про питонг</NameItem>
            <IconButton sx={{marginLeft: 'auto'}}>
                <AddIcon/>
            </IconButton>
        </Item>
    );
};

export default SysRecItem;