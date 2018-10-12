import React, { Fragment } from 'react';
import SelectionBar from './SelectionBar/SelectionBar';
import SideBar from './SideBar/SideBar';

class RepoHome extends React.Component {
  render() {
    return (
      <Fragment>
        <SelectionBar />
        <SideBar />
      </Fragment>
    );
  }
}

export default RepoHome;
