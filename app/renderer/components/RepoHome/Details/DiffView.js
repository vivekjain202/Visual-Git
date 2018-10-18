// import React, { Component, Fragment } from 'react';
// import { Paper, withStyles } from '@material-ui/core';
// import { connect } from 'react-redux';

// const styles = {
//   root: {
//     height: "100%",
//     border: '1px solid #bbb',
//     borderRadius: '0px',
//     boxShadow: 'none',
//     boxSizing: 'border-box'
//   },
// };

// class DiffView extends Component {
//   render() {
//     const { containerHeight, classes } = this.props;
//     return (
//       <Fragment>
//         <Paper
//           color="primary"
//           classes={{root:classes.root}}
//         />
//       </Fragment>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     diffDetails: state.diff && state.diff.diffDetails,
//   };
// }
// function mapDispatchToProps() {
//   return {};
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withStyles(styles)(DiffView));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'
var AU = require('ansi_up');
var ansi_up = new AU.default;

const styles = {
  sidebar: {
    width: 272.17,
    height: 'calc(100vh - 48px)',
    overflow: 'auto'
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
      <div style={{backgroundColor:'black', overflow:'auto', paddingTop:'10px',paddingLeft:'30px', height: 'calc(100vh - 160px)' }}>
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
