import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import { Tab, Tabs } from '@material-ui/core';

import Patients from './components/Patients';


const styles = theme => ({
    layoutRoot: {}
});

class Example extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h4>Search</h4></div>
                }
                contentToolbar={
                    <Tabs
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full h-64 border-b-1"
                        value={value}
                        onChange={this.handleChange}>
                        >
                        <Tab className="h-64" label="Patients" />
                        <Tab className="h-64" label="Reports" />
                    </Tabs>
                }
                content={
                    <div>
                        {value === 0 && <Patients />}
                        {value === 1 && <div>Reports</div>}

                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, { withTheme: true })(Example);