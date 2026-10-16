const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const animatedElements = document.querySelectorAll('.falling, .shadow, .splash, .drops, .pool, .half, h1, .oil-wave');
let loopTimer;

function positionSplash() {
  const impact = document.querySelector('.shadow').getBoundingClientRect();
  const overlay = document.querySelector('.screen-splash');
  overlay.style.setProperty('--impact-x', `${impact.left + impact.width / 2}px`);
  overlay.style.setProperty('--impact-y', `${impact.top + impact.height / 2}px`);
}

function restartAnimation() {
  animatedElements.forEach(element => { element.style.animation = 'none'; });
  void document.body.offsetWidth;
  animatedElements.forEach(element => { element.style.animation = ''; });
  positionSplash();
}

function updatePlayback() {
  window.clearInterval(loopTimer);
  if (!motionPreference.matches && !document.hidden) {
    restartAnimation();
    loopTimer = window.setInterval(restartAnimation, 11000);
  }
}

window.addEventListener('resize', positionSplash);
document.addEventListener('visibilitychange', updatePlayback);
motionPreference.addEventListener('change', updatePlayback);
updatePlayback();
