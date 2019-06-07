import React from 'react';
import { FuseLoadable } from '@fuse';
import { authRoles } from 'app/auth';
import { Redirect } from 'react-router-dom';

const ChartConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/chart/:id',
      component: FuseLoadable({
        loader: () => import('./Chart')
      })
    }
    // {
    //   path: '/applications',
    //   exact: true,
    //   component: () => <Redirect to="/patient/all" />
    // }
  ]
};

export default ChartConfig;
