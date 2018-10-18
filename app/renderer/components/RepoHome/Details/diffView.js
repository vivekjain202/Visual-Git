import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'
var AU = require('ansi_up');
var ansi_up = new AU.default;

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
    if (this.props.diffDetails){
      display = ansi_up.ansi_to_html(this.props.diffDetails);
      display = display.split('\n').join('<br /><br />');
    }
    return (
      <div style={{backgroundColor:'black', paddingTop:'10px',paddingLeft:'30px'}}>
        <pre style={{color:'white'}} dangerouslySetInnerHTML={{__html:display}}></pre>
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
