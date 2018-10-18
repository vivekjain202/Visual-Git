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
          <Grid item xs={3}>
            <SideBar />
          </Grid>
          <Grid item xs={9}>
            <Details />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default RepoHome

