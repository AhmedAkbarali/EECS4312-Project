import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"

const useStyles = makeStyles((theme) => ({

    searchForm: {
        position: "relative",
    },

    formControl: {
        margin: theme.spacing(3),
        width: "80%",
        position: "relative",
    },

    textField: {
      width: "40%",
      position: "relative",  
    },


    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
  }));

function Search() {
    const [value, setValue] = React.useState("title");

    const classes = useStyles();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <form className={classes.searchForm}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">VideoCo Search</FormLabel>
                    <TextField placeholder={"Enter the " + value + " of the video"} className="classes.textField"></TextField>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Seacrh
                    </Button>
                    <RadioGroup aria-label="criteria" name="criteria" value={value} onChange={handleChange}>
                        <FormControlLabel value="title" control={<Radio />} label="Title" />
                        <FormControlLabel value="director" control={<Radio />} label="Director" />
                        <FormControlLabel value="price" control={<Radio />} label="Price" />
                    </RadioGroup>
                </FormControl>
            </form>
        </div>
    )
}

export default Search
