// get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// FUNCTIONS 

// play

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method](); // calls video[play] OR video[pause]
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// skip

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// sliders

function handleRangeUpdate() {
  video[this.name] = this.value;
}

// prgress

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`;
}

// scrub

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


// EVENT LISTENERS

//play
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

// skip
skipButtons.forEach(button => button.addEventListener('click', skip));

// sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

// progress
video.addEventListener('timeupdate', handleProgress);

// scrub

let mouseDown = false;
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);