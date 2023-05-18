import React from 'react';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {Typography} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
const Rate = styled(Box)(({theme})=>({
    margin: theme.spacing(0, 2),
    display: 'flex'
}))
const CountRate = styled(Typography)(({theme})=>({
    fontWeight: 300,
    marginLeft: theme.spacing(1)
}))
const RatingRecItem = ({props}) => {
    console.log(props.resource)
    let rating;
    let icon;
    if(props.resource ==='github'){
        rating = <CountRate>{props.rate}</CountRate>
        icon = <StarBorderIcon></StarBorderIcon>
    } else if (props.resource ==='habr') {
        rating =<CountRate>{props.rate}</CountRate>
        icon = <BookmarkBorderIcon></BookmarkBorderIcon>
    } else {
        rating = <CountRate>{props.rate}</CountRate>
        icon = <YouTubeIcon></YouTubeIcon>

    }
    return (
            <Rate>
                {icon}
                {rating}
            </Rate>
    );
};

export default RatingRecItem;