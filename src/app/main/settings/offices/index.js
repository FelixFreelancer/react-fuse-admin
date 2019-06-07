import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
//import { Button, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import reducer from '../../../auth/store/reducers';
import settingReducer from '../store/reducers'
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {
  Card,
  CardContent,
  Icon,
  TextField,
  Typography,
  Divider,
  CardActions,
  Button,
  CircularProgress,
  Fab
} from '@material-ui/core';
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class Offices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deleteData:""
    }
  }

  componentDidMount() {
 
    this.props.getOfficeList()

  }

  handleClickOpen = (idx, detID) => {
    console.log("deleteData is~~~~~~~~", idx, detID)
    this.setState({ open: true });
   this.setState({deleteData:detID})

}
handleDelete = () => {
  console.log("helloooooooooo")
  this.props.deleteOfficeList(this.state.deleteData)
  //this.props.getOfficeList()
  this.handleClose()
}


handleClose = () => {
  this.setState({ open: false });
};


  render() {
    const { classes,fullScreen  } = this.props;
    console.log("this.props.getOfficeData--->", this.props.getOfficeData)
    return (
      <FusePageSimple
    
        header={
          <div className="flex flex-1 w-full items-center justify-between ">
            <div className="flex items-center store-icon-div">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Icon className="text-32 mr-0 sm:mr-12">store</Icon>
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="hidden sm:flex" variant="h6">
                  Offices
                </Typography>
              </FuseAnimate>
            </div>

            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                component={Link}
                to="/settings/offices/mainPage"
                className="whitespace-no-wrap new-btn-div"
                variant="contained"
              >
                <span className="hidden sm:flex">Add New Office</span>
                <span className="flex sm:hidden">New</span>
              </Button>
            </FuseAnimate>
          </div>
        }
        content={
          <div className="p-24">
            <h4>Content</h4>
            <br />
            <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="right">Ofiice Name</CustomTableCell>
            <CustomTableCell align="right">First Address</CustomTableCell>
            <CustomTableCell align="right">Second Address</CustomTableCell>
            <CustomTableCell align="right">City</CustomTableCell>
            <CustomTableCell align="right">State</CustomTableCell>
            <CustomTableCell align="right">Zip</CustomTableCell>
            <CustomTableCell align="right">View</CustomTableCell>
            <CustomTableCell align="right">Delete</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.getOfficeData && this.props.getOfficeData.map((office, index) => (
            <TableRow className={classes.row} key={office.index} key={index}>
              <CustomTableCell align="right">{office.Office_Name}</CustomTableCell>
              <CustomTableCell align="right">{office.Address_1}</CustomTableCell>
              <CustomTableCell align="right">{office.Address_2}</CustomTableCell>
              <CustomTableCell align="right">{office.City}</CustomTableCell>
              <CustomTableCell align="right">{office.State}</CustomTableCell>
              <CustomTableCell align="right">{office.Zip}</CustomTableCell>
              <CustomTableCell align="right"><Link
                      to={`/settings/offices/mainPage/${office._id}`}
                      className="ui basic button green"
                    >
                      Edit
                </Link></CustomTableCell>
                <CustomTableCell align="right"><a href="javascript:void(0)" className="ui basic button green" onClick={(e) => this.handleClickOpen(index,office._id)}>Delete</a></CustomTableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

       <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete this record?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
           
            </DialogContentText>
          </DialogContent>
          <DialogActions className="record-btm-btn">
            <Button onClick={this.handleClose} color="primary" variant="contained">
              Cancle
            </Button>
            <Button onClick={this.handleDelete} color="secondary" autoFocus variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
   
          </div>
        }
      />
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveOffice: Actions.saveOffice,
    getOfficeList: Actions.getOfficeList,
    deleteOfficeList:Actions.deleteOfficeList
  }, dispatch);
}

function mapStateToProps({ authReducers, settingReducer }) {
  return {
    userData: authReducers.login,
    getOfficeData: settingReducer.office.getOffice,
  }
}

export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Offices)
    )
  ))
);
