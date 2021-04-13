var knob = $('.knob');
var angle = 0;
var minangle = 0;
var maxangle = 270;
var vid = document.getElementById("car-video");
var arrow = document.getElementById("arrow");
var video = document.getElementsByTagName("video")[0],
  source = '',
  pause = document.querySelector("#pause"),
  stop = document.querySelector("#stop"),
  play = document.querySelector("#play"),
  increase = document.querySelector("#increase"),
  decrease = document.querySelector("#decrease"),
  fforward = document.querySelector("#fastforward"),
  rrewind = document.querySelector("#fastrewind"),
  rsTime = 0;

function moveKnob(direction) {

  if (direction == 'up') {
    if ((angle + 2) <= maxangle) {
      angle = angle + 2;
      setAngle();
    }
  }

  else if (direction == 'down') {
    if ((angle - 2) >= minangle) {
      angle = angle - 2;
      setAngle();
    }
  }

}

// Video controls
function VideoSpeedControl(speed) {
  vid.playbackRate = speed;
}

function playVid() {
  vid.play();
}

function pauseVid() {
  vid.pause();
}

function manualOverride() {
  document.getElementById("pause").disabled = true;
}

function changeVideo() {
  var source = vid.getElementsByTagName('source')[0];
  source.src = 'https://www.youtube.com/watch?v=6BkFT_73-y4'; //todo
  vid.load();
}

function turnLeft() {
  arrow.style.display = "block";
  arrow.style.transform = "rotate(-90deg)";
}

function turnRight() {
  arrow.style.display = "block";
  arrow.style.transform = "rotate(90deg)";
}
// Video controls

function setAngle() {

  // rotate knob
  knob.css({
    '-moz-transform': 'rotate(' + angle + 'deg)',
    '-webkit-transform': 'rotate(' + angle + 'deg)',
    '-o-transform': 'rotate(' + angle + 'deg)',
    '-ms-transform': 'rotate(' + angle + 'deg)',
    'transform': 'rotate(' + angle + 'deg)'
  });

  // highlight ticks
  var activeTicks = (Math.round(angle / 3) + 1);
  $('.tick').removeClass('activetick');
  $('.tick').slice(0, activeTicks).addClass('activetick');

  // update % value in text
  var pc = Math.round((angle / 50) * 100);
  $('.current-value').text(pc + '%');

}

// mousewheel event - firefox
knob.bind('DOMMouseScroll', function (e) {
  if (e.originalEvent.detail > 0) {
    moveKnob('down');
    video.volume -= .1;
  } else {
    moveKnob('up');
    video.volume += .1;
  }
  return false;
});

// mousewheel event - ie, safari, opera
knob.bind('mousewheel', function (e) {
  if (e.originalEvent.wheelDelta < 0) {
    moveKnob('down');
    video.volume -= .1;
  } else {
    moveKnob('up');
    video.volume += .1;
  }
  return false;
});





playVideo(video);

pause.onclick = function () {
  video.pause();
}

play.onclick = function () {
  if (typeof (source.src) != "undefined") {
    source.setAttribute("src", "https://india.rso.msu.edu/Reverse.mp4");
    video.load();
  }
  video.play();
}

stop.onclick = function () {
  // Check if the video tag has the "source" as child tag
  if (video.hasChildNodes()) {
    // get all child nodes from video tag
    var sources = video.childNodes;
    // loop through the video tag child nodes
    for (var i = sources.length - 1; i >= 0; i--) {
      // check if the child node is a "source" type
      if (sources[i].src != undefined) {
        source = sources[i];
      }
    }
    // remove source attr to stop the download
    source.removeAttribute("src");
  } else {
    video.removeAttribute("src");
  }
  video.load();
}

increase.onclick = function () {
  video.volume += .1;
}

decrease.onclick = function () {
  video.volume -= .1;
}

fforward.onclick = function () {
  video.currentTime += 10
}

rrewind.onclick = function () {
  video.currentTime -= 10
}

teste.onclick = function () {
  video.load();
  video.currentTime = sessionStorage.getItem('videotimeset');
  video.play();
}

function playVideo(media) {
  if (sessionStorage.getItem('videotimeset')) {
    video.currentTime = sessionStorage.getItem('videotimeset');
  }
  media.play();
  setInterval(registerTime, 5000);
}

function registerTime() {
  rsTime = video.currentTime;
  if (window.sessionStorage) {
    sessionStorage.setItem("videotimeset", rsTime);
  }
}
