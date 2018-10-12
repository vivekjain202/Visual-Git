import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

 class App extends React.Component {
   constructor() {
     super();
     this.state = {
       repoInfo: '',
       log:''
     };
     this.handleChange = this.handleChange.bind(this);
     this.handleClick = this.handleClick.bind(this);
     this.openDialogue = this.openDialogue.bind(this);
     this.handleClickClone = this.handleClickClone.bind(this);
   }

   handleChange(event) {
     this.setState({cmd: event.target.value});
   }

   handleClick() {
     const log = ipcRenderer.sendSync('git-log');
     console.log(log);
     this.setState({log:log.toString()});
   }

   handleClickClone() {
    const log = ipcRenderer.sendSync('git-clone');
    console.log(log);
  }
   openDialogue() {
     const repoInfo = ipcRenderer.sendSync('git-init');
     this.setState({ repoInfo: repoInfo.repo.toString(), log:repoInfo.log.toString() });
   }

   render() {
     const log = (this.state.log == {})?'Nothing to show':this.state.log;
     return (
       <div>
       <input type="button" value="GET LOG" onClick={this.handleClick} />
       <input type="button" value="INITIALIZE REPO" onClick={this.openDialogue} />
       <input type="button" value="Clone" onClick={this.handleClickClone} />
       <p>
         {this.state.repoInfo}
       </p>
       <p>
         Git log:<br />
         {log}
       </p>
     </div>
     );
   }
 }


 ReactDOM.render( <App />,rootElement);