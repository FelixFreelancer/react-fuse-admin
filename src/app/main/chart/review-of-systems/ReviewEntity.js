import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardActions, CardContent, Icon, IconButton, Typography, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import * as Actions from './../store/actions';
import reducer from './../store/reducers';
import AddEntity from './AddEntity';

const styles = theme => ({
  layoutRoot: {}
});

const reviewMapping = {
  medication: {
    title: 'Medications',
    key: 'medication'
  },
  allergy: {
    title: 'Allergies',
    key: 'allergy'
  },
  systemHistory: {
    title: 'System History',
    key: 'system-history'
  },
  familyHistory: {
    title: 'Family History',
    key: 'family-history'
  }
};

const cardStyles = {
  margin: '0 15px'
};

class ReviewEntity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // toggle box is closed initially
      isOpened: false
    };
    // http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html
    this.toggleBox = this.toggleBox.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  toggleBox() {
    this.setState(s => ({ isOpened: !s.isOpened }));
  }
  deleteItem(review) {
    this.props.deleteReview(review._id);
  }
  render() {
    console.log("reviews+++", reviews)
    const { classes, reviews = [], chart } = this.props;
    return (
      <Card style={cardStyles}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {reviewMapping[this.props.type].title}
          </Typography>
          <List component="nav">
            {reviews
              .filter(r => r.type === reviewMapping[this.props.type].key)
              .map((r, i) => (
                <ListItem key={i} button>
                  <ListItemText primary={r.name} key={i} />
                  <ListItemSecondaryAction >
                    <IconButton disabled={chart.isSigned} onClick={() => this.deleteItem(r)} aria-label="Comments">
                      <Icon>delete</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </CardContent>
        <CardActions>
          <AddEntity reviewType={reviewMapping[this.props.type].key} />
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps({ Reducer, applicationsReducer }) {
  return {
    ...applicationsReducer.application
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteReview: Actions.deleteRos
  }, dispatch)
}

export default withReducer('Reducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ReviewEntity)
    )
  )
);
