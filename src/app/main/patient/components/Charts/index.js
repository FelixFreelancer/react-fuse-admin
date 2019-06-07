import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import withReducer from 'app/store/withReducer';
import { withStyles, Icon, Button, Fab } from '@material-ui/core';
import * as moment from 'moment';

// Components
import Add from './Add';

import PDFChart from './../../../../services/chartService';

import Dialog from '@material-ui/core/Dialog';
import '../../../../../styles/style-narola.css';
//import styles form './../../../../styles/';

const styles = theme => ({
  layoutRoot: {},
  fab: {
    bottom: '85px',
    right: '30px',
    position: 'fixed'
  }
});

class Charts extends Component {
  state = {
    open: false
  };
  constructor(props) {
    super(props);

    props.getChartList(this.props.patientId);
  }

  /**
   * @description Triggered on Form Submit
   * @author Sharan
   * @param values Chart
   * @todo Save the data here
   */
  onSubmit = values => {
    console.log('values', values);
    // const chartDate = moment(values.date , 'YYYY-MM-DD').format();
    const chartDate =  moment.utc(values.date).format()
    console.log('chartDate ====> ',chartDate);
    values.date = chartDate;
    values.patientId = this.props.patientId;
    this.props.createChart(values);
    this.handleClose();
  };

  downloadRX = async chart => {
    console.log("chart", chart)
    const {
      patientProfile,
      contactLens,
      subjectiveRefraction
    } = await Actions.getRX(chart._id);
    var doc = new PDFChart({
      patientProfile,
      contactLens,
      subjectiveRefraction
    });
    console.log("document data", doc)
    doc.save('patient-RX.pdf');
  };

  downloadChart = async chart => {
    const { exam, test, ap } = await Actions.getChart(chart._id);
    console.log('exam:', exam, test, ap);
    alert('To be implemented');
  };

  addChart = event => {
    event.preventDefault();
    console.log('ev', event);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { isLoading, charts, classes } = this.props;
    console.log('charts', charts);
    return (
      <div className="download-rx-chart">
        <Fab color="primary" className={classes.fab} onClick={this.addChart}>
          <Icon>add</Icon>
        </Fab>
        {charts.map(chart => (
          <div className="flex justify-between items-center mb-12">
            <h6>
              <Link to={'/chart/' + chart._id}>
                {moment(chart.date).format('ll')}
              </Link>
            </h6>
            <section>
              <Button
                size="small"
                disabled={isLoading}
                variant="outlined"
                color="primary"
                onClick={() => this.downloadRX(chart)}
              >
                Download RX
              </Button>
              <Button
                size="small"
                disabled={isLoading}
                variant="outlined"
                color="primary"
                onClick={() => this.downloadChart(chart)}
              >
                Download Chart
              </Button>
            </section>
          </div>
        ))}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Add onSubmit={this.onSubmit} handleClose={this.handleClose} />
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getChartList: Actions.listCharts,
      createChart: Actions.createChart
    },
    dispatch
  );
}

function mapStateToProps({ patientReducer }) {
  return {
    ...patientReducer.chart,
    ...patientReducer.patient
  };
}

export default withReducer('Reducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Charts)
    )
  )
);
