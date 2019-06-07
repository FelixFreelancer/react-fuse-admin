import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseLoadable } from '@fuse';
import { authRoles } from 'app/auth';

export const ContactsAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/patient/all',
      exact: true,
      component: FuseLoadable({
        loader: () => import('./ContactsApp')
      })
    },
    {
      path: '/patient',
      exact: true,
      component: () => <Redirect to="/patient/all" />
    }
  ]
};
