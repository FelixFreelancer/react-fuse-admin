import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// Material Components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  layoutRoot: {}
});

class ContactLensFinal extends Component {
  render() {
    return (
      <div className="flex flex-wrap mb-24 text-center">
        <div className="w-full md:w-1/2">
          <Card className="mr-16">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Contact Lens
              </Typography>
              <Divider />
              <form className="w-full max-w-md my-8">
                <TextField
                  id="filled-multiline-flexible"
                  multiline
                  rows="8"
                  //   value={this.state.multiline}
                  //   onChange={this.handleChange('multiline')}
                  className="w-full"
                  margin="normal"
                  helperText="Any helper text"
                />
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/2">
          <Card className="ml-16">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Both Eye
              </Typography>
              <Divider />
              <form className="w-full max-w-md my-24">
                <div className="flex flex-wrap mb-6 text-center">
                  <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0" />
                  <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <FormControlLabel
                      // style={{ marginTop: '27px' }}
                      control={
                        <Switch
                          // checked={this.state.checkedA}
                          // onChange={this.handleChange('checkedA')}
                          value="checkedA"
                        />
                      }
                      label="Final"
                    />
                  </div>
                  <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="Add"
                      className="mx-12"
                    >
                      <Icon>add</Icon>
                    </Fab>
                  </div>
                  <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="Add"
                      className="mx-12"
                    >
                      <Icon>delete</Icon>
                    </Fab>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContactLensFinal);
