import React, { Component } from 'react';
//import dcvfdg from ''
class Logout extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }
  
  logout() {

    localStorage.clear();
    window.location.href='/';
    // window.location.href='../auth/lock/LockPage';
  }

  render() {
    return (
      <div>
        {this.logout()}
      </div>
    );
  }
}

export default Logout;
