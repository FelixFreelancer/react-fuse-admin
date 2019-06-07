import Settings from './Settings';

import Add from './offices/add';
import Offices from './offices';
import Profile from './profile';
import Appointment from './appointment';
import Users from './users';
import Billing from './billing';
import Insurance from './insurance';
import Payment from './payment';
import mainPage from './offices/mainPage';
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
export const SettingsConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/settings/profile',
      component: FuseLoadable({
        loader: () => import('./profile')
    })
     // component: Profile
    },
    {
      path: '/settings/offices/mainPage',
      exact: true,
      component: FuseLoadable({
        loader: () => import('./offices/mainPage')
    })
      //component: mainPage
    },
    {
      path: '/settings/offices/mainPage/:id',
      exact: true,
      component: FuseLoadable({
        loader: () => import('./offices/mainPage')
    })
      //component: mainPage
    },
    
    {
      path: '/settings/offices',
      exact: true,
      component: FuseLoadable({
        loader: () => import('./offices')
    })
      //component: Offices
    },
    
    // {
    //   path: '/settings/offices/mainPage/:id',
    //   component: mainPage
    // },

    // {
    //   path: '/settings/offices/mainPage/:id',
    //   component: mainPage
    // },
    // {
    //   path: '/settings/offices/mainPage/:id',
    //   component: mainPage
    // },
    // {
    //   path: '/settings/offices/mainPage/:id',
    //   component: mainPage
    // },
    // {
    //   path: '/settings/offices/mainPage/:id',
    //   component: mainPage
    // }
  ]
};
