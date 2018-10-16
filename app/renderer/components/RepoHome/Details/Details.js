import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import FilesView from './FilesView';
class Details extends Component {
  render() {
    return (
      <Fragment>
        <Grid container>
          <Grid item>
            <FilesView></FilesView>
          </Grid>
          <Grid item />
        </Grid>
      </Fragment>
    );
  }
}

export default Details;
