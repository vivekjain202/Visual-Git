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
   }

   handleChange(event) {
     this.setState({cmd: event.target.value});
   }

   handleClick() {
     const log = ipcRenderer.sendSync('git-log',this.state.cmd);
     console.log(log);
     this.setState({log:log.toString()});
   }

   openDialogue() {
     const repoInfo = ipcRenderer.sendSync('git-init');
     this.setState({ repoInfo: repoInfo.repo.toString(), log:repoInfo.log.toString() });
   }

   render() {
     return (
       <div>
       <input type="button" value="GET LOG" onClick={this.handleClick} />
       <input type="button" value="INITIALIZE REPO" onClick={this.openDialogue} />
       <p>
         {this.state.repoInfo}
       </p>
       <p>
         Git log:<br />
         {this.state.log}
       </p>
     </div>
     );
   }
 }


 ReactDOM.render( <App />,rootElement);