import React from 'react';
import RepoHome from './RepoHome/RepoHome';
import {loadCSS} from 'fg-loadcss'

class App extends React.Component {
  componentDidMount(){
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }
  render() {
    return (
      <React.Fragment>
        <RepoHome />
      </React.Fragment>
    );
  }
}

export default App;
