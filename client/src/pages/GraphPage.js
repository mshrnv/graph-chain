import React from 'react';
import {Grid} from "@mui/material";
import GraphBox from "../components/Graph/GraphBox";
import SystemRec from "../components/SystemRec";

const GraphPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8} md={8}>
                <GraphBox/>
            </Grid>
            <Grid item xs={4} md={4}>
                <SystemRec/>
            </Grid>
        </Grid>
    );
};

export default GraphPage;