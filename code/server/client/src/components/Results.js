import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea' 
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(()=> ({
    splitScreen: {
        display: "flex",
        flexDirection: "row",
    },
    
    splitPage1: {
        width: '60%',
    },
    
    splitPage2: {
        width: '40%'
    },

    gridList: {
        height: 600,
    }
}));

function Results() {

    const classes = useStyles();

    const data = [
        {"id":  1, "title": "Apple", "Price": 1},
        {"id":  2, "title": "Apple", "Price": 2},
        {"id":  3, "title": "Apple", "Price": 3},
        {"id":  4, "title": "Apple", "Price": 4},
        {"id":  5, "title": "Apple", "Price": 5},
        {"id":  6, "title": "Apple", "Price": 18},
        {"id":  7, "title": "Apple", "Price": 13},
        {"id":  8, "title": "Apple", "Price": 16},
        {"id":  9, "title": "Apple", "Price": 12},
        {"id": 10, "title": "Apple", "Price": 11},
        {"id": 11, "title": "Apple", "Price": 1},
        {"id": 12, "title": "Apple", "Price": 2},
        {"id": 13, "title": "Apple", "Price": 3},
        {"id": 14, "title": "Apple", "Price": 4},
        {"id": 15, "title": "Apple", "Price": 5},
        {"id": 16, "title": "Apple", "Price": 18},
        {"id": 17, "title": "Apple", "Price": 13},
        {"id": 18, "title": "Apple", "Price": 16},
        {"id": 19, "title": "Apple", "Price": 12},
        {"id": 20, "title": "Apple", "Price": 11}
    ];

    return (
        <div className={classes.splitScreen}>
        <React.Fragment>
            <CssBaseline />
            <Container className={classes.splitPage1}>
                <GridList cellHeight={200} cellWidth={50} className={classes.gridList}>
                {data.map((d) => (
                    <GridListTile key={d.id}>
                        <Card>
                            <CardActionArea>
                             <CardMedia
                                component="img"
                                alt="Video Image"
                                height="120"
                                width="50"
                                source={{
                                    url: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                                title="Video"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {d.title}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </GridListTile>
                ))}
                </GridList>
            </Container>
         </React.Fragment>  
        <React.Fragment>
            <CssBaseline />
            <Container className={classes.splitPage2}>
                <Typography paragraph>
                    Hello World 2
                </Typography>
            </Container>
         </React.Fragment>
        </div>
    )
}

export default Results
