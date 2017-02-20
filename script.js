var supportMsg = document.getElementById('supportMsg');

if ('speechSynthesis' in window) {
  var msg = new SpeechSynthesisUtterance('hi');
  window.speechSynthesis.speak(msg);
} else {
  supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="http://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
  supportMsg.classList.add('not-supported');
}

var speakButton = document.getElementById('speak');
var pauseButton = document.getElementById('pause');
var resumeButton = document.getElementById('resume');
var cancelButton = document.getElementById('cancel');

//var speechMsgInput = document.getElementById('speech-msg');
var speechMsgInput = document.getElementById('speechMsg');

var voiceSelect = document.getElementById('voice');

var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');

function loadVoices() {
  var voices = speechSynthesis.getVoices();
  // put Chinese non-Cantonese voices as default and top of list
  var re = /^zh.(?!hk)/i;
  voices.forEach(function(voice, i) {
    addMatchingVoice(voiceSelect, voice, re, true);
  });
  voices.forEach(function(voice, i) {
    addMatchingVoice(voiceSelect, voice, re, false);
  });
}

function addMatchingVoice(voiceSelect, voice, re, match) {
  if ((voice.lang.match(re) != null) == match) {
    var option = document.createElement('option');
    option.value = voice.name;
    option.innerHTML = voice.name + " - " + voice.lang;
    voiceSelect.appendChild(option);
  }
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};


// Create a new utterance for the specified text and add it to
// the queue.
var msg;
function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
  var msg = new SpeechSynthesisUtterance();
  
  msg.text = text;  
  msg.volume = parseFloat(volumeInput.value);
  msg.rate = parseFloat(rateInput.value);
  msg.pitch = parseFloat(pitchInput.value);
  
  if (voiceSelect.value) {
    msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
  }
  
  // Queue this utterance.
  window.speechSynthesis.speak(msg);
}

speakButton.addEventListener('click', function(e) {
  if (speechMsgInput.value.length > 0) {
    speak(speechMsgInput.value);
  }
});

pauseButton.addEventListener('click', function(e) {
  window.speechSynthesis.pause();
});
resumeButton.addEventListener('click', function(e) {
  window.speechSynthesis.resume();
});
cancelButton.addEventListener('click', function(e) {
  window.speechSynthesis.cancel();
});
