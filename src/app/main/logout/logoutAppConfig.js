import { FuseLoadable } from '@fuse';
import { authRoles } from 'app/auth';

export const logoutAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/logout',
      component: FuseLoadable({
        loader: () => import('./logout')
      })
    }
  ]
};
