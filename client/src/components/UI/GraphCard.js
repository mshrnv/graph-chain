import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from "@mui/material/styles";
import {Grid} from "@mui/material";

const CardGraph = styled(Card)(({theme})=> ({
    margin: theme.spacing(2, 1),
    maxHeight: '400px',
}))

export default function GraphCard(props) {

    return (
        <Grid item xs={3} md={3}>
            <CardGraph >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.item.name}
                    </Typography>
                    <Typography  color="text.secondary">
                        {props.item.desc}
                    </Typography>
                    <Typography  color="text.secondary" sx={{marginTop: 2}}>
                        {props.item.author}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" sx={{marginLeft:'auto', verticalAlign: 'bottom'}}>Buy View</Button>
                </CardActions>
            </CardGraph>
        </Grid>

    );
}