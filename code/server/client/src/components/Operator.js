import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField"
import { makeStyles, withStyles } from '@material-ui/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const styles = theme => ({
    textField: {
        margin: "4 4 4 4",
        padding: "10 10 0 0",
        width: "80%",
    },

    sectionDetail: {
        display: 'flex',
        flexDirection: 'column',
    },

    videoTable: {
        borderCollapse: 'collapse',
        width: "100%",
    },

    videoTd: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: "8 8 8 8",
    },

    videoTh: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: "8 8 8 8",
    },
});

const data_sample = [
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

class Operator extends Component {

    state = {
        text: "",
        expanded: false,
        data: data_sample,
    };

    handleTextChange = (event) => {
        // event.stopPropagation();
        this.setState({text: event.target.text});
    };

    handleSectionChange = (panel) => (event, isExpanded) => {
        this.setState({expanded: isExpanded ? panel : false});
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleSectionChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1hbh-header"
                    >
                        <Typography component="h3">Video</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.sectionDetail}>
                        <TextField
                            className={classes.textField}
                            id="outlined-textarea"
                            placeholder={this.state.text} 
                            multiline
                            variant="outlined"
                            label="Video Title"
                            onChange={this.handleTextChange}
                        >    
                        </TextField>
                        <div style={{ height: 400, width: '100%' }}>
                            <table className={classes.videoTable}>
                                <tr className={classes.videoTr}>
                                    <th className={classes.videoTh}>Title</th>
                                    <th className={classes.videoTh}>Director</th>
                                    <th className={classes.videoTh}>Available</th>
                                </tr>
                                {this.state.data.map((entry) => (
                                <tr id={entry.id} className={classes.videoTr}>
                                    <td className={classes.videoTd}>{entry.title}</td>
                                    <td className={classes.videoTd}>{entry.director}</td>
                                    <td className={classes.videoTd}>{entry.availability}</td>
                                </tr>
                                ))}
                            </table>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Operator);
