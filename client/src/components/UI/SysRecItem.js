import React  from 'react';
import {styled} from "@mui/material/styles";
import {IconButton, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RatingRecItem from "./RatingRecItem";
import parseRecItem from "../../utils/parseRecItem";

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
const SysRecItem = ({rec}) => {
    return (
        <Item>
            <RatingRecItem props={parseRecItem(rec)}></RatingRecItem>
            <NameItem>{rec.title}</NameItem>
            <IconButton sx={{marginLeft: 'auto'}}>
                <AddIcon/>
            </IconButton>
        </Item>
    );
};

export default SysRecItem;