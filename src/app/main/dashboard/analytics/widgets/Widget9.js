import React from 'react';
import {
  withStyles,
  Button,
  Card,
  Chip,
  Fab,
  Divider,
  Icon,
  IconButton,
  Typography
} from '@material-ui/core';

const Widget9 = ({ data }) => {
  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pr-4 flex flex-row items-center justify-between">
        <Typography className="h1 pr-16">Schedule</Typography>

        <div>
          <IconButton aria-label="more">
            <Icon>more_vert</Icon>
          </IconButton>
        </div>
      </div>

      <table className="simple clickable">
        <thead>
          <tr>
            <th />
            <th className="text-center">Status</th>
            <th className="text-right">Exam</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr key={row.title}>
              <td>Patient Name</td>
              <td className="text-right">
                <Chip label="Eligible / Self Pay" />
              </td>
              <td className="text-right">
                <Fab size="small" color="primary" aria-label="Add">
                  <Icon>play_arrow</Icon>
                </Fab>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Divider className="card-divider w-full" />

      {/* <div className="p-8 pt-16 flex flex-row items-center">
        <Button>GO TO CAMPAIGNS</Button>
      </div> */}
    </Card>
  );
};

export default withStyles(null, { withTheme: true })(Widget9);
