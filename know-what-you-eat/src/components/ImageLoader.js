import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
          <div className="ImageLoader container">
            <h1> Upload file here</h1>
            <input id="upload" ref="upload" type="file" accept="image/*"
               onChange={(event)=> { 
                   this.readFile(event) 
              }}
            onClick={(event)=> { 
                   event.target.value = null
              }}/>
          </div>
    );
    }
}

export default App;
