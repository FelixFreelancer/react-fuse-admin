import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, FuseLoadable } from '@fuse';
import { Router, Route, Redirect } from 'react-router-dom';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from 'app/store/withReducer';
import * as Actions from 'app/store/actions';
import * as ChartActions from './store/actions';
import reducer from './store/reducers';

import history from '../../../history';

// Material Components
import { Typography, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  layoutRoot: {},
  loader: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    background: 'rgba(255,255,255,0.75)',
    border: '1px dashed #ccc',
    padding: '10px'
  }
});

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    };
    this.initializeRoutes = this.initializeRoutes.bind(this);
  }

  componentWillUnmount() {
    const { resetNavigation, removeActivePatient } = this.props;
    resetNavigation();
    removeActivePatient();
  }

  componentDidMount() {
    const {
      getChart,
      match: { params }
    } = this.props;
    getChart(params.id);
    this.initializeRoutes();
    this.props.getPatientInfo(params.id)
  }

  /**
   * @description Initializes the Route and Appends the Navigation
   * @author Giriprasad
   */
  initializeRoutes() {
    const {
      match: { url },
      appendNavigationItem
    } = this.props;
    const routes = [
      {
        path: `${url}/ros`,
        exact: true,
        component: FuseLoadable({
          loader: () => import('./review-of-systems')
        })
      },
      {
        path: `${url}/test`,
        exact: true,
        component: FuseLoadable({
          loader: () => import('./test')
        })
      },
      {
        path: `${url}/exam`,
        exact: true,
        component: FuseLoadable({
          loader: () => import('./exam')
        })
      },
      {
        path: `${url}/ap`,
        exact: true,
        component: FuseLoadable({
          loader: () => import('./assessment-and-plan')
        })
      },
      {
        path: `${url}/bill`,
        exact: true,
        component: FuseLoadable({
          loader: () => import('./bill')
        })
      },
      {
        path: `${url}/`,
        exact: true,
        component: () => <Redirect from={`${url}/`} to={`${url}/ros`} />
      }
    ];

    this.setState({ routes });

    appendNavigationItem({
      id: 'chart',
      title: 'Chart',
      type: 'group',
      icon: 'apps',
      children: [
        {
          id: 'ros-component',
          title: 'ROS',
          type: 'item',
          icon: 'accessibility',
          url: `${url}/ros`
        },
        {
          id: 'test-component',
          title: 'Test',
          type: 'item',
          icon: 'airline_seat_recline_normal',
          url: `${url}/test`
        },
        {
          id: 'exam-component',
          title: 'Exam',
          type: 'item',
          icon: 'remove_red_eye',
          url: `${url}/exam`
        },
        {
          id: 'ap-component',
          title: 'AP',
          type: 'item',
          icon: 'insert_chart',
          url: `${url}/ap`
        },
        {
          id: 'bill-component',
          title: 'Bill',
          type: 'item',
          icon: 'attach_money',
          url: `${url}/bill`
        }
      ]
    });
  }

  render() {
    const {
      classes,
      match: { url },
      loading,
      patient,
      chart
    } = this.props;
    console.log("hello babes", chart);
    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot
        }}
        header={
          <div className="p-24 mt-24 w-full">
            <div className="flex mb-24 text-center">
              <div className="w-full md:w-1/4">
                <Typography variant="body1">
                  Date :{' '}
                  <strong className="text-teal-lighter">
                    {loading && 'loading...'}
                    {!loading && !chart && 'error'}
                    {!loading && chart && moment(chart.date).format('MM/DD/YYYY')}
                  </strong>
                </Typography>
              </div>
              <div className="w-full md:w-1/4">
                <Typography variant="body1">
                  Name :{' '}
                  <strong className="text-teal-lighter">
                    {loading && 'loading...'}
                    {!loading && !patient && 'error'}
                    {!loading &&
                      patient &&
                      patient.user.firstName + ' ' + patient.user.lastName}
                  </strong>
                </Typography>
              </div>
              <div className="w-full md:w-1/4">
                <Typography variant="body1">
                  Age :{' '}
                  <strong className="text-teal-lighter">
                    {loading && 'loading...'}
                    {!loading && !patient && 'error'}
                    {!loading &&
                      patient &&
                      moment().diff(moment(patient.dob), 'years')}
                  </strong>
                </Typography>
              </div>
              <div className="w-full md:w-1/4">
                <Typography variant="body1">
                  DOB :{' '}
                  <strong className="text-teal-lighter">
                    {loading && 'loading...'}
                    {!loading && !patient && 'error'}
                    {!loading &&
                      patient &&
                      moment(patient.dob).format('MM/DD/YYYY')}
                  </strong>{' '}
                </Typography>
              </div>
            </div>
          </div>
        }
        content={
          <div className="p-24">
            {/* <section className={classes.loader}>
              <CircularProgress size={20} color="secondary" />
            </section> */}
            <Router history={history}>
              <div>
                {loading === false && chart && patient ? (
                  <div>
                    {this.state.routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    ))}
                  </div>
                ) : (
                    'fetching patient...'
                  )}
              </div>
            </Router>
          </div>
        }
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      appendNavigationItem: Actions.appendNavigationItem,
      resetNavigation: Actions.resetNavigation,
      getPatientInfo: ChartActions.getPatientInfo,
      removeActivePatient: ChartActions.removeActivePatient,
      getChart: ChartActions.getChart
    },
    dispatch
  );
}

function mapStateToProps({ applicationsReducer }) {
  return {
    ...applicationsReducer.application,
    patient: applicationsReducer.application.patient
  };
}

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Chart)
  )
);
