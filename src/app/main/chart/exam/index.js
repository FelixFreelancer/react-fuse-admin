import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from './../store/reducers';
import * as Actions from './../store/actions';
import { bindActionCreators } from 'redux';

// Material Components
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// Components
import HabitualRx from './components/HabitualRx';
import HabitualCLRx from './components/HabitualCLRx';
import UncorrectedDistance from './components/UncorrectedDistance';
import CorrectedDistance from './components/CorrectedDistance';
import ConfrontationFields from './components/ConfrontationFields';
import EOM from './components/EOM';
import SubjectiveRefraction from './components/SubjectiveRefraction';
import CLRx from './components/CLRx';
import ContactLens from './components/ContactLens';
import ContactLensFinal from './components/ContactLensFinal';
import SlitLamp from './components/SlitLamp';
import Fundus from './components/Fundus';

import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const styles = theme => ({
  layoutRoot: {}
});

class Exam extends Component {
  state = {
    activeStep: 9,
    skipped: new Set()
  };

  componentWillMount() {
    // console.log(this.props, 'llo');
    this.props.getExam(this.props.chart._id);
  }

  render() {
    return (
      <div className="p-12">
        <Typography variant="h5">Exam</Typography>
        <Divider className="my-24" />

        {/* Sequential Steps */}
        <HabitualRx />
        <HabitualCLRx />
        <UncorrectedDistance />
        <CorrectedDistance />
        <ConfrontationFields />
        <EOM />
        <SubjectiveRefraction />
        <ContactLens />
        <SlitLamp />
        <Fundus />
        <div className="flex justify-between mt-32">
          <Link to={`/chart/${this.props.chart._id}/test`}>
            <Button variant="contained">Back</Button>
          </Link>
          <Link to={`/chart/${this.props.chart._id}/ap`}>
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
      getExam: Actions.getExam
    },
    dispatch
  );
}

function mapStateToProps({ Reducer, applicationsReducer }) {
  return {
    ...applicationsReducer.application,
    exam: Reducer.exam
  };
}

export default withReducer('Reducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Exam)
    )
  )
);
