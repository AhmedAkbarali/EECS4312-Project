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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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
        width: "100%"
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

function Results() {

    const classes = useStyles();

    const [value, setValue] = React.useState('None')

    const data = [
        {"id": 1, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 10.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 2, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 5.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 3, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 4.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 4, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 15.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 5, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 20.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 6, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 4.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 7, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 3.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 8, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 9.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 9, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 29.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 10, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 11.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 11, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 12.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
        {"id": 12, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 6.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17}
    ];

    var [filterData, setFilterData] = React.useState(data);

    const handleChange = (event) => {
        var currentValue = event.target.value

        if (currentValue === 'None')
            setFilterData(data)
        else {
            setFilterData(data.filter(data => data.price >= currentValue))
        }
        setValue(currentValue)
    }

    return (
        // <div className={classes.splitScreen}>
        <div className={classes.root}>
            <form className={classes.form}>
                <FormControl component="fieldset">
                    <FormLabel coponent="legend">Filter</FormLabel>
                    <Box>
                        <label>Price Filter:</label>
                        <RadioGroup aria-label="priceFilter" name="riceFilter" value={value} onChange={handleChange}>
                            <FormControlLabel value="None" control={<Radio />} label="None" />
                            <FormControlLabel value="5" control={<Radio />} label=">5" />
                            <FormControlLabel value="10" control={<Radio />} label=">10" />
                        </RadioGroup>
                    </Box>
                </FormControl>
            </form>
            <List className={classes.videoList}>
                {filterData && filterData.map((d) => (
                    <ListItem className={classes.videoItem}>
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
