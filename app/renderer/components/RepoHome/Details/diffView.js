import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'


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
    return (
      <div style={{paddingTop:'10px',paddingLeft:'30px'}}>
      <pre >        
          {this.props.diffDetails.split('\n').map((e,id)=><p key={id}>{e}</p>)}
      </pre>
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
