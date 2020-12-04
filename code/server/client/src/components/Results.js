import React from 'react'
import { makeStyles } from "@material-ui/core/styles"

import Typography from "@material-ui/core/Typography"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea' 
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme)=> ({
    root: {
        display: "flex",
        flexDirection: "row",
    },
    
    // splitPage1: {
    //     width: '60%',
    // },
    
    // splitPage2: {
    //     width: '40%'
    // },

    // gridList: {
    //     height: 600,
    // }

    form: {
        margin: theme.spacing(2),
        border: "2px black solid"
    },

    videoList: {
        display: "flex",
        backgroundColor: "gray",
        flexDirection: "column",
        margin: theme.spacing(2),
        border: "2px black solid",
        width: "100%",
        height: 600,
    },

    videoItem: {
        display: "flex",
        margin: theme.spacing(1),
        width: "100%",
    },

    videoCard: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
    },

    videoGrid: {
        flexGrow: 1,
    },
}));

function Results(props) {

    const classes = useStyles();

    const [value, setValue] = React.useState('None');
    const [priceFilter, setPriceFilter] = React.useState("all");
    const [availFilter, setAvailFilter] = React.useState("yes");
    const [tierFilter, setTierFilter] = React.useState("all");

    const [searchData, setSearchData] = React.useState([]);
    const [filterData, setFilterData] = React.useState(searchData);

    setSearchData(props.searchData);


    // const handleChange = (event) => {
    //     var currentValue = event.target.value

    //     if (currentValue === 'None')
    //         setFilterData(searchData)
    //     else {
    //         setFilterData(searchData.filter(data => data.price >= currentValue))
    //     }
    //     setValue(currentValue)
    // }

    const handleFilter = (event) => {
        let nameFilter = event.target.name;
        let valueF = event.target.value;
        if (nameFilter === "priceFilter")
            setPriceFilter(valueF);
        else if (nameFilter === "tierFilter")
            setTierFilter(valueF);
        else if (nameFilter === "availFilter")
            setAvailFilter(valueF);
    }

    if (priceFilter !== "all"){
        var p = Number(priceFilter);
        setFilterData(filterData.filter(data => data.price >= p));
    }

    if(tierFilter !== "all"){
        var t = Number(tierFilter);
         setFilterData(filterData.filter(data => data.tier === t));
    }

    setFilterData(filterData.filter(data => data.availability === availFilter));

    return (
        // <div className={classes.splitScreen}>
        <div className={classes.root}>
            <form className={classes.form}>
                <FormControl component="fieldset">
                    <FormLabel coponent="legend">Filter</FormLabel>
                    <Box>
                        <label>Price Filter:</label>
                        <RadioGroup aria-label="Price" 
                            name="priceFilter" 
                            value={priceFilter} 
                            onChange={handleFilter}
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="5" control={<Radio />} label=">5" />
                            <FormControlLabel value="10" control={<Radio />} label=">10" />
                        </RadioGroup>
                    </Box>

                    <Box>
                        <label>Tier Filter:</label>
                        <RadioGroup aria-label="Tier" 
                            name="tierFilter" 
                            value={tierFilter} 
                            onChange={handleFilter}
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                        </RadioGroup>
                    </Box>

                    <Box>
                        <label>Availability Filter:</label>
                        <RadioGroup aria-label="Availability" 
                            name="availFilter" 
                            value={availFilter} 
                            onChange={handleFilter}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="yes" />
                            <FormControlLabel value="no" control={<Radio />} label="no" />
                        </RadioGroup>
                    </Box>
                </FormControl>
            </form>
            <List className={classes.videoList}>
                {filterData && filterData.map((d) => (
                    <ListItem id={d.id} key={d.id} className={classes.videoItem}>
                        <Card className={classes.videoCard}>
                            <div>
                                <img src={'https://reactnative.dev/img/tiny_logo.png'} />
                            </div>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h3" component="h1">
                                        {d.title}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Director: {d.director}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Tier: {d.tier}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Genre: {d.genre}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Price: {d.price}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Availability: {d.availability}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <IconButton>
                                    <AddShoppingCartIcon></AddShoppingCartIcon>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Results
