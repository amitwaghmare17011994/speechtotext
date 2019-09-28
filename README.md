 
Installation:

`npm install react_chrome_speechtotext`

Usage:

```
import React from 'react';
import SpeechToText from 'react_chrome_speechtotext'
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
					<div className={start ? 'blink' : ''}>
						<SpeechToText
							start={start}
							defaultText={txt}
							onListen={this.onListen}
							style={{ fontSize: 30, display: 'contents' }}
						/>
					</div>
					<p>{txt}</p>
				</center>
			</div>
		);
	}
}


export default App;

```

index.css
```
 
.blink {
  animation: blinker 0.9s cubic-bezier(.5, 0, 1, 1) infinite alternate;  
 }
@keyframes blinker {  
  from { opacity: 1; }
  to { opacity: 0; }
}


.myDiv
{
  top: 50%;
    left: 50%;
    width:30em;
    height:18em;
    margin-top: -9em; /*set to a negative number 1/2 of your height*/
    margin-left: -15em; /*set to a negative number 1/2 of your width*/
    border: 1px solid #ccc;
    background-color: #f3f3f3;
    position:fixed;

}
```