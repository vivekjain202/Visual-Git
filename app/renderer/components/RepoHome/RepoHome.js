import React, { Fragment } from 'react';
import SelectionBar from './SelectionBar/SelectionBar';
import SideBar from './SideBar/SideBar';
import { Grid } from '@material-ui/core';
import Details from './Details/Details';

class RepoHome extends React.Component {
  render() {
    return (
      <Fragment>
        <SelectionBar />
        <Grid container>
          <Grid item>
            <SideBar />
          </Grid>
          <Grid item>
            <Details />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default RepoHome;
