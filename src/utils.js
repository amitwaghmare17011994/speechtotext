window.final_transcript = "";
window.recognizing = false;
window.ignore_onend = false;
window.recognition = new window.webkitSpeechRecognition();
window.recognition.continuous = true;
window.recognition.interimResults = true;

window.recognition.onstart = function() {
	window.recognizing = true;
};

window.recognition.onerror = function(event) {
	window.caller.onError();
	if (event.error == "no-speech") {
		console.error("ERRROR", event.error);
		window.ignore_onend = true;
	}
	if (event.error == "audio-capture") {
		console.error("ERRROR", event.error);
		window.ignore_onend = true;
	}
	if (event.error == "not-allowed") {
		 
		alert("Permission to use microphone is blocked");
		window.ignore_onend = true;
	}
};

window.recognition.onend = function() {
	window.recognizing = false;
	window.final_transcript = "";

	if (window.ignore_onend) {
		return;
	}
};

window.recognition.onresult = function(event) {
	var interim_transcript = "";
	if (typeof event.results == "undefined") {
		window.recognition.onend = null;
		window.recognition.stop();
		return;
	}
	for (var i = event.resultIndex; i < event.results.length; ++i) {
		if (event.results[i].isFinal) {
			window.final_transcript += event.results[i][0].transcript;
		} else {
			interim_transcript += event.results[i][0].transcript;
		}
	}
	window.final_transcript = capitalize(window.final_transcript);
	if (window.caller)
		window.caller.onSpeechEnd(
			linebreak(window.final_transcript + interim_transcript)
		);
};

export function forceStop() {
	window.recognition.stop();
	window.caller = null;
	window.final_transcript = "";
	window.ignore_onend = false;
}
export function startListening(callingObject, defaultText) {
	try {
		if (window.recognizing) {
			window.recognition.stop();
			window.recognizing = false;
			return;
		}
		window.recognition.lang = "en-AU";
		window.recognition.start();
		window.caller = callingObject;
		window.final_transcript = defaultText + "  ";
		window.ignore_onend = false;
	} catch (err) {
		window.recognition.stop();
		setTimeout(function() {
			window.recognition.lang = "en-AU";
			window.recognition.start();
			window.caller = callingObject;
			window.final_transcript = defaultText + "  ";
			window.ignore_onend = false;
		}, 300);
	}
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
	return s.replace(two_line, "<p></p>").replace(one_line, "<br>");
}

var first_char = /\S/;
function capitalize(s) {
	return s.replace(first_char, function(m) {
		return m.toUpperCase();
	});
}
