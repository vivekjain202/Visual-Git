import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import FilesView from './FilesView';
import DiffView from './DiffView';

class Details extends Component {
  render() {
    return (
      <Fragment>
        <Grid container>
          <Grid item>
            <FilesView />
          </Grid>
          <Grid item>
            <DiffView />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Details;
