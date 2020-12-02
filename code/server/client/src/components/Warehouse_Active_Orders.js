import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {

    },

    list: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        marginLeft: '2rem',
    }
  }));

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${index + 1}`} />
        Active: Yes
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        To-Be-Shipped: No
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export default function Warehouse_Active_Orders() {
    const classes = useStyles();
    

    return (
        <div>
        <h1>Active Orders</h1>
        Order# | Active | To-Be-Shipped
        <div className={classes.list}>
        <FixedSizeList height={400} width={800} itemSize={46} itemCount={200}>
            {renderRow}
        </FixedSizeList>
        </div>
        <br></br>
        <Button className={classes.button} variant="contained" color="Primary">Send To-Be-Shipped List</Button>
        <Button className={classes.button} variant="contained" color="Primary">Apply Changes</Button>
        </div>
    );
}

