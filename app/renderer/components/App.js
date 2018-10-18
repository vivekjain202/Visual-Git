import React from 'react';
import RepoHome from './RepoHome/RepoHome';
import { loadCSS } from 'fg-loadcss'
import Home from './RepoHome/Home/Home'
import { connect } from 'react-redux'

class App extends React.Component {
  state = {
    currentRepo: "",
    allRepos: []
  }
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
    this.setState({
      currentRepo: this.props.repoName,
      allRepos: this.props.allRepos
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allRepos !== this.props.allRepos) {
      this.setState({
        allRepos: this.props.allRepos
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        {!this.state.allRepos.length ? <Home></Home> : <RepoHome />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    repoName: state.global.currentRepo,
    allRepos: state.global.otherRepos
  }
}
export default connect(mapStateToProps)(App)