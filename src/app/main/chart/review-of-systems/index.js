import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReviewEntity from './ReviewEntity';
import { Link } from 'react-router-dom';
import { Divider, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import withReducer from 'app/store/withReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reducer from './../store/reducers';
import * as Actions from './../store/actions';

const styles = theme => ({
  layoutRoot: {}
});

class ReviewOfSystems extends Component {
  componentDidMount() {
    this.props.getRos(this.props.chart._id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chart != this.props.chart) {
      this.props.getRos(this.props.chart._id);
    }
  }

  render() {
    const { chart, reviews = [] } = this.props;
    return (
      <div className="p-12">
        <Typography variant="h5">Review of Systems</Typography>
        <Divider className="my-24" />
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <ReviewEntity type="medication" reviews={reviews} />
          </div>
          <div className="w-full md:w-1/4">
            <ReviewEntity type="allergy" reviews={reviews} />
          </div>
          <div className="w-full md:w-1/4">
            <ReviewEntity type="systemHistory" reviews={reviews} />
          </div>
          <div className="w-full md:w-1/4">
            <ReviewEntity type="familyHistory" reviews={reviews} />
          </div>
        </div>
        <div className="flex justify-end mt-32">
          <Link to={`/chart/${chart._id}/test`}>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRos: Actions.getRos,
      resetRos: Actions.resetRos
    },
    dispatch
  );
}

function mapStateToProps({ applicationsReducer }) {
  console.log(
    'applicationsReducer.application',
    applicationsReducer.application
  );
  return {
    ...applicationsReducer.application,
    reviews: applicationsReducer.ros.reviews
  };
}

export default withReducer('Reducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ReviewOfSystems)
    )
  )
);
