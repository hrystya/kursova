'use strict';
class Guitar {

    constructor(context, buffer) {
        this.context = context;
        this.buffer = buffer;
    }

    setup() {
        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);

        this.gainNode.gain.value = 0.8;
    }

    play() {
        this.setup();
        this.source.start(this.context.currentTime);
    }

    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        this.source.stop(this.context.currentTime + 0.5);
    }

}

class Buffer {

    constructor(context, urls) {
        this.context = context;
        this.urls = urls;
        this.buffer = [];
    }

    loadSound(url, index) {
        let request = new XMLHttpRequest();
        request.open('get', url, true);
        request.responseType = 'arraybuffer';
        let thisBuffer = this;
        request.onload = function() {
          // Safari doesn't support promise based syntax
          thisBuffer.context
            .decodeAudioData(request.response, function(buffer) {
              thisBuffer.buffer[index] = buffer;
              updateProgress(thisBuffer.urls.length);
              if(index == thisBuffer.urls.length-1) {
                thisBuffer.loaded();
              }
            });
        };
        request.send();
    };

    getBuffer() {
        this.urls.forEach((url, index) => {
            this.loadSound(url, index);
        })
    }

    loaded() {
        document.querySelector('.loading').style.opacity = 0;
        document.querySelector('.loading').style.height = 0;
        document.querySelector('.notes').style.height = "auto";
        document.querySelector('.notes').style.opacity = 1;
        loaded = true;
    }

    getSound(index) {
        return sounds[index];
    }

}

let progressBar = document.querySelector('.progress');
let iteration = 0;

function updateProgress(total) {
    progressBar.style.width = ++iteration / total * 100 + '%';
}

let guitar = null;
let preset = 0;
let loaded = false;

function playGuitar() {
    let index = parseInt(this.dataset.note) + preset;
    guitar = new Guitar(context, buffer.getSound(index));
    guitar.play();
}

function stopGuitar() {
    guitar.stop();
}

let context = new(window.AudioContext || window.webkitAudioContext)();

let sounds = [
    'static/sound/G4.mp3',
    'static/sound/A4.mp3',
    'static/sound/C5.mp3',
    'static/sound/D5.mp3',
    'static/sound/E5.mp3',
    'static/sound/G5.mp3',
    'static/sound/A5.mp3',
    'static/sound/C6.mp3',
    'static/sound/D6.mp3',
    'static/sound/D%236.mp3',
    'static/sound/E6.mp3',
    'static/sound/G6.mp3',
    'static/sound/A6.mp3',
    'static/sound/C7.mp3',
    'static/sound/D7.mp3',
    'static/sound/d_G4.mp3',
    'static/sound/d_A4.mp3',
    'static/sound/d_C5.mp3',
    'static/sound/d_D5.mp3',
    'static/sound/d_E5.mp3',
    'static/sound/d_G5.mp3',
    'static/sound/d_A5.mp3',
    'static/sound/d_C6.mp3',
    'static/sound/d_D6.mp3',
    'static/sound/d_D%236.mp3',
    'static/sound/d_E6.mp3',
    'static/sound/d_G6.mp3',
    'static/sound/d_A6.mp3',
    'static/sound/d_C7.mp3',
    'static/sound/d_D7.mp3'
];


let buffer = new Buffer(context, sounds);
let guitarSound = buffer.getBuffer();

let buttons = document.querySelectorAll('.notes .note');
buttons.forEach(button => {
    button.addEventListener('mouseenter', playGuitar.bind(button));
    button.addEventListener('mouseleave', stopGuitar);
})


let audio = document.querySelector('audio');
let play = document.querySelector('.play');
let rewind = document.querySelector('.rewind');
let circle = document.querySelector('.circle');

audio.addEventListener('pause', pauseTrack);
audio.addEventListener('play', playTrack);

play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playTrack();
    } else {
        audio.pause();
        pauseTrack();
    }
})
rewind.addEventListener('click', () => {
    audio.currentTime = 0;
})
circle.addEventListener('click', () => {
    preset = (preset == 0) ? 15 : 0;
    circle.classList.toggle('rock');
})
audio.addEventListener('ended', () => {
    pauseTrack();
});

function playTrack() {
    play.querySelector('.pause-icon').style.display = "block";
    play.querySelector('.play-icon').style.display = "none";
}

function pauseTrack() {
    play.querySelector('.pause-icon').style.display = "none";
    play.querySelector('.play-icon').style.display = "block";
}
