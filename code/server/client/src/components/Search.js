import React, { Component } from 'react'
import { withStyles, theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"

import Result from './Results.js'

import Typography from "@material-ui/core/Typography"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import FormLabel from '@material-ui/core/FormLabel'
import Box from '@material-ui/core/Box'



import axios from 'axios'

const API_URL = "http://localhost:5000/";

const styles = (theme) => ({

  searchForm: {
    position: "relative",
  },

  formControl: {
    margin: "3 3 3 3",
    width: "80%",
    position: "relative",
  },

  button: {
    margin: "4 4 4 4",
  },


  root: {
    display: "flex",
    flexDirection: "row",
  },

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
    maxHeight: 500,
    overflow: 'auto',
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
});

class Search extends Component {
  // const [value, setValue] = React.useState("title");
  constructor(props) {
    super(props);
    this.state = {
      value: "title",
      query: "",
      searchData: [],
      priceFilter: "all",
      availFilter: "yes",
      tierFilter: "all",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  handleFilter = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  handleChange = (event) => {
    // setValue(event.target.value);
    this.setState({ value: event.target.value });
  };


  handleQueryChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = (event) => {
    axios.post(API_URL + "video/search/", {
      query: this.state.query.trim(),
      value: this.state.value,
    }).then(response => {
      let tempData = []
      let currentData = response.data;
      currentData.map((data) => {
        tempData.push({
          "id": data._id,
          "title": data.Title,
          "director": data.Director,
          "description": data.Description,
          "price": data.Price,
          "genre": data.Genre,
          "availability": data.Availability,
          "tier": data.Tier,
          "daysRent": data.DaysRent,
          "Copy": data.Copy
        });
      })
      this.setState({ searchData: tempData });
    }).catch((err) => {
      console.log(err);
    })
  };

    addToCart(videoId, e) {
        e.preventDefault();
        console.log(videoId,localStorage.getItem('token'));
        axios.post("/user/cart/add", {videoId: videoId}, {
            headers: {
                'authorization': `token ${localStorage.getItem('token')}`
            }}).then( res => {
            console.log(res.data)
            console.log(videoId)
        }).catch((error) => {
            console.log(error)
        });
    }

  render() {
    const { classes } = this.props;

    // This should be in Result.js but running inot error if use the component
    let result;
    // let sdata = this.state.searchData

    var filterData = this.state.searchData;

    if (this.state.priceFilter !== "all") {
      var p = Number(this.state.priceFilter);
      filterData = filterData.filter(data => data.price >= p);
    }

    if (this.state.tierFilter !== "all") {
      var t = Number(this.state.tierFilter);
      filterData = filterData.filter(data => data.tier === t);
    }

      if (this.state.searchData.length > 0){
          // // result = (
          // //     <Result
          // //         searchData={sdata}
          // //     ></Result>
          // //     )
          // console.log(this.state.searchData);
          result =  (<div className={classes.root}>
              <form className={classes.form}>
                  <FormControl component="fieldset">
                      <FormLabel coponent="legend">Filter</FormLabel>
                      <Box>
                          <label>Price Filter:</label>
                          <RadioGroup aria-label="Price"
                                      name="priceFilter"
                                      value={this.state.priceFilter}
                                      onChange={this.handleFilter}
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
                                      value={this.state.tierFilter}
                                      onChange={this.handleFilter}
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
                                      value={this.state.availFilter}
                                      onChange={this.handleFilter}
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
                                  <IconButton onClick={(e) => {this.addToCart(d.id, e)}}>
                                      <AddShoppingCartIcon></AddShoppingCartIcon>
                                  </IconButton>
                              </CardActions>
                          </Card>
                      </ListItem>
                  ))}
              </List>
          </div>)
      }
      else {
          result = <label>Welcome to VideoCo Searchbar</label>
      }

    return (
      <div>
          <form className={classes.searchForm}>
              <FormControl component="fieldset" className={classes.formControl}>
                  <TextField
                      id="outlined-textarea"
                      // label="VideoCo Search"
                      placeholder={"Enter the " + this.state.value + " of the video"}
                      multiline
                      value={this.state.query}
                      onChange={this.handleQueryChange}
                  >
                  </TextField>
                  <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSearch}>
                      Search
                  </Button>
                  <RadioGroup aria-label="criteria" name="criteria" value={this.state.value} onChange={this.handleChange}>
                      <FormControlLabel value="title" control={<Radio />} label="Title" />
                      <FormControlLabel value="director" control={<Radio />} label="Director" />
                  </RadioGroup>
              </FormControl>
          </form>
          {result}
      </div>
    )
    }
}
    /*
         render() {
        const { classes } = this.props;

        // This should be in Result.js but running inot error if use the component
        let result;
        // let sdata = this.state.searchData

        var filterData = this.state.searchData;

        if (this.state.priceFilter !== "all"){
            var p = Number(this.state.priceFilter);
            filterData = filterData.filter(data => data.price >= p);
        }

        if(this.state.tierFilter !== "all"){
            var t = Number(this.state.tierFilter);
            filterData = filterData.filter(data => data.tier === t);
        }

        filterData = filterData.filter(data => data.availability === this.state.availFilter);


            return (
            <div>
                <form className={classes.searchForm}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <TextField
                            id="outlined-textarea"
                            // label="VideoCo Search"
                            placeholder={"Enter the " + this.state.value + " of the video"}
                            multiline
                            value={this.state.query}
                            onChange={this.handleQueryChange}
                        >
                        </TextField>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSearch}>
                            Search
                        </Button>
                        <RadioGroup aria-label="criteria" name="criteria" value={this.state.value} onChange={this.handleChange}>
                            <FormControlLabel value="title" control={<Radio />} label="Title" />
                            <FormControlLabel value="director" control={<Radio />} label="Director" />
                        </RadioGroup>
                    </FormControl>
                </form>
                {result}
            </div>
        )

    filterData = filterData.filter(data => data.availability === this.state.availFilter);

    if (this.state.searchData.length > 0) {
      // // result = (
      // //     <Result
      // //         searchData={sdata}
      // //     ></Result>
      // //     )
      // console.log(this.state.searchData);
      result = (<div className={classes.root}>
        <form className={classes.form}>
          <FormControl component="fieldset">
            <FormLabel coponent="legend">Filter</FormLabel>
            <Box>
              <label>Price Filter:</label>
              <RadioGroup aria-label="Price"
                name="priceFilter"
                value={this.state.priceFilter}
                onChange={this.handleFilter}
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
                value={this.state.tierFilter}
                onChange={this.handleFilter}
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
                value={this.state.availFilter}
                onChange={this.handleFilter}
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
      </div>)
    }
    else {
      result = <label>Welcome to VideoCo Searchbar</label>

    }

  }
     */

export default withStyles(styles, { withTheme: true })(Search);
