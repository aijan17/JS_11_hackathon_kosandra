import React, { useContext } from 'react';
import { Grid, Paper, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { clientContext } from '../../contexts/ClientContext';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    }
}))

const SideBar = () => {
    const {getProducts,filterProductsByPrice} = useContext(clientContext)
    const classes = useStyles();
    const history = useHistory()

    function fetchProducts(params,value){
        let search = new URLSearchParams(history.location.search)
        search.set(params,value)
        let url = `${history.location.pathname}?${search.toString()}`
        history.push(url)
        getProducts()
    }

    function reset(){
        history.push('/')
        getProducts()
    }


    function filterByPrice(value){
        filterProductsByPrice(value)
    }


    return (
        <>
            <Grid item md={3}>
                <Paper className={classes.paper}>
                    <Grid component="fieldset">
                        <FormControl>
                            <FormLabel component="legend">memory</FormLabel>
                            <RadioGroup onChange={(e) => fetchProducts('category',e.target.value)} aria-label="memory" name="memory1">
                                <FormControlLabel value='16' control={<Radio />} label="16" />
                                <FormControlLabel value="32" control={<Radio />} label="32" />
                                <FormControlLabel value="64" control={<Radio />} label="64" />
                                <FormControlLabel value="128" control={<Radio />} label="128" />
                                <FormControlLabel value="256" control={<Radio />} label="256" />
                                <FormControlLabel value="512" control={<Radio />} label="512" />
                            </RadioGroup>
                        </FormControl>
                        
                        <button onClick={reset}>reset</button>
                    </Grid>
                    <Grid component="fieldset">
                        <FormControl>
                            <FormLabel component="legend">price</FormLabel>
                            <RadioGroup onChange={(e) => filterByPrice(e.target.value)} aria-label="price" name="price1">
                                <FormControlLabel value='15000' control={<Radio />} label="15000" />
                                <FormControlLabel value="30000" control={<Radio />} label="30000" />
                                <FormControlLabel value="40000" control={<Radio />} label="40000" />
                                <FormControlLabel value="60000" control={<Radio />} label="60000" />
                                <FormControlLabel value="100000" control={<Radio />} label="100000" />
                                <FormControlLabel value="200000" control={<Radio />} label="200000" />
                            </RadioGroup>
                        </FormControl>
                        

                    </Grid>
                </Paper>
            </Grid>
        </>
    );
};

export default SideBar;