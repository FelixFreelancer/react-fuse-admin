import React from 'react';
import {
  AppBar,
  MuiThemeProvider,
  Toolbar,
  Typography
} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';

const FooterLayout1 = ({ classes, footerTheme }) => {
  return (
    <MuiThemeProvider theme={footerTheme}>
      <AppBar id="fuse-footer" className="relative z-10" color="default">
        <Toolbar className="px-16 py-0 flex items-center">
          <div className="flex flex-1">
            {/* <Typography variant="h6">Active Patient : <strong className="text-teal-lighter">John</strong></Typography> */}
          </div>

          <div>
            <Typography>© Plano 2019. All rights reserved</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
};

function mapStateToProps({ fuse }) {
  return {
    footerTheme: fuse.settings.footerTheme
  };
}

export default connect(mapStateToProps)(FooterLayout1);
