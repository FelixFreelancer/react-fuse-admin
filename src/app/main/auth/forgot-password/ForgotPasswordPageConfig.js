import { FuseLoadable } from '@fuse';
import { authRoles } from 'app/auth';

export const ForgotPasswordPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/forgot-password',
      component: FuseLoadable({
        loader: () => import('./ForgotPasswordPage')
      })
    }
  ]
};
