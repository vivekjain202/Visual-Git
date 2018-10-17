import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'
var Convert = require('ansi-to-html');
var convert = new Convert();

const styles = {
  sidebar: {
    width: 272.17,
    height: 'calc(100vh - 48px)',
  },
  listItem: {
    padding: '0',
  },
  listItemText: {
    padding: '0',
  },
};

class DiffView extends Component {
  render() {
    let display;
    if (this.props.diffDetails)
      display = convert.toHtml(this.props.diffDetails.split('\n').join('<br /><br />'));
    return (
      <div style={{width: '100%', backgroundColor:'#b7b7b7', paddingTop:'10px',paddingLeft:'30px'}}>
        <pre dangerouslySetInnerHTML={{__html:display}}></pre>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    diffDetails : state.diff.diffDetails
  };
}
function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DiffView));
