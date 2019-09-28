import React from "react";
import ReactDOM from "react-dom";
import SpeechToText from "react_chrome_speechtotext";

class App extends React.Component {
	// state = { start: false, txt: "My Name is Amit" };

	constructor()
	{
		super()
		this.state={start: false, txt: "My Name is Amit"}
	}
	onClick = () => this.setState({ start: !this.state.start });
	onListen = txt => this.setState({ txt: txt });
	render() {
		const { start, txt } = this.state;
		return (
			<div onClick={this.onClick}>
				<SpeechToText
					start={start}
					defaultText={txt}
					onListen={this.onListen}
				/>
				<p>{txt}</p>
			</div>
		);
	}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
