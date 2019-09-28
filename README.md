 
Usage:

```
import React from 'react';
import SpeechToText from 'speechtotext'
import './index.css'

class App extends React.Component {

state = { start: false, txt: "Speech To Text Web Api" };

onClick = () => this.setState({ start: !this.state.start });

onListen = txt => this.setState({ txt: txt });

render() {
    const { start, txt } = this.state;
    return (
        <div onClick={this.onClick} className='myDiv'  >    
            <center> 
                <div className={start?'blink':''}> 
                    <SpeechToText
                            start={start}
                            defaultText={txt}
                            onListen={this.onListen}
                            style={{fontSize:30,display:'contents'}}
                     />
                </div>
                <p>{txt}</p>
            </center>
        </div>);
    }
}
export default App;
```