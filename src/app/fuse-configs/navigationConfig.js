const navigationConfig = [
  {
    id: 'dashboard-component',
    title: 'Dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/dashboard'
  },
  {
    id: 'calendar-component',
    title: 'Calendar',
    type: 'item',
    icon: 'calendar_today',
    url: '/calendar'
  },
  {
    id: 'search-component',
    title: 'Search',
    type: 'item',
    icon: 'search',
    url: '/search'
  },
  {
    id: 'settings-component',
    title: 'Settings',
    type: 'collapse',
    icon: 'settings',
    children: [
      {
        id: 'settings-profile-component',
        title: 'Profile',
        type: 'item',
        icon: 'person',
        url: '/settings/profile'
      },
      {
        id: 'settings-offices-component',
        title: 'Offices',
        type: 'item',
        icon: 'ballot',
        url: '/settings/offices'
      }
      // {
      //   id: 'key-app-component',
      //   title: 'Appointments',
      //   type: 'item',
      //   icon: 'ballot',
      //   url: '/settings/appointment'
      // },
      // {
      //   id: 'settings-user-component',
      //   title: 'Users',
      //   type: 'item',
      //   icon: 'people',
      //   url: '/settings/users'
      // },
      // {
      //   id: 'billing-component',
      //   title: 'Billing',
      //   type: 'item',
      //   icon: 'ballot',
      //   url: '/settings/billing'
      // },
      // {
      //   id: 'key-insurance-component',
      //   title: 'Insurance',
      //   type: 'item',
      //   icon: 'ballot',
      //   url: '/settings/insurance'
      // },
      // {
      //   id: 'key-payment-component',
      //   title: 'Payment',
      //   type: 'item',
      //   icon: 'ballot',
      //   url: '/settings/payment'
      // }
      // {
      //   id: 'key-info-component',
      //   title: 'Web',
      //   type: 'item',
      //   icon: 'ballot',
      //   url: '/applications/key-info'
      // }
    ]
  },
  {
    id: 'logout-component',
    title: 'Logout',
    type: 'item',
    icon: 'Users',
    url: '/logout'
    
  },
  // {
  //   id: 'lock-component',
  //   title: 'Lock',
  //   type: 'item',
  //   icon: 'Users',
  //   url: '/lock'
    
  // },
  // {
  //   id: 'applications',
  //   title: 'Applications',
  //   type: 'group',
  //   icon: 'apps',
  //   children: [
  //     {
  //       id: 'key-info-component',
  //       title: 'Key Info',
  //       type: 'item',
  //       icon: 'ballot',
  //       url: '/applications/key-info'
  //     },
  //     {
  //       id: 'ros-component',
  //       title: 'ROS',
  //       type: 'item',
  //       icon: 'calendar_today',
  //       url: `/applications/ros`
  //     },
  //     {
  //       id: 'test-component',
  //       title: 'Test',
  //       type: 'item',
  //       icon: 'shopping_cart',
  //       url: '/applications/test'
  //     },
  //     {
  //       id: 'exam-component',
  //       title: 'Exam',
  //       type: 'item',
  //       icon: 'school',
  //       url: '/applications/exam'
  //     },
  //     {
  //       id: 'ap-component',
  //       title: 'AP',
  //       type: 'item',
  //       icon: 'email',
  //       url: '/applications/ap',
  //       badge: {
  //         title: 25,
  //         bg: 'rgb(255, 0, 0)',
  //         fg: '#FFFFFF'
  //       }
  //     },
  //     {
  //       id: 'bill-component',
  //       title: 'Bills',
  //       type: 'item',
  //       icon: 'check_circle',
  //       url: '/applications/bill',
  //       badge: {
  //         title: 3,
  //         bg: 'rgb(255, 102, 0)',
  //         fg: '#FFFFFF'
  //       }
  //     }
  //   ]
  // }
];

// Refer http://react-material.fusetheme.com/components/fuse/fuse-navigation to dynamically add / update navigation

export default navigationConfig;
