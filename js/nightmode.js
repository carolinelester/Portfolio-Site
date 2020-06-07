var nightmode = '';
if (document.getElementsByTagName('html')[0].classList.contains('nightmode-auto')) {
  nightmode = 'nightmode-auto';
} else if (document.getElementsByTagName('html')[0].classList.contains('nightmode-on')) {
  nightmode = 'nightmode-on';
}

switch (nightmode) {
  case 'nightmode-auto':
    var hr = (new Date()).getHours();
    if ((hr >= 19 && hr <= 24) || hr >= 0 && hr <= 7) {
      setTimeout(function () {
        document.getElementById('main-css').setAttribute('href', './css/main.nightmode.min.css');
        document.getElementById('main-css').dataset.mode = './css/main.min.css';
        document.getElementsByClassName('style-toggle-title')[0].textContent = 'night';
        document.getElementsByClassName('style-toggle-title')[0].dataset.title = 'day';
      }, 75);
    }
  break;

  case 'nightmode-on':
    setTimeout(function () {
      document.getElementById('main-css').setAttribute('href', './css/main.nightmode.min.css');
      document.getElementById('main-css').dataset.mode = './css/main.min.css';
      document.getElementsByClassName('style-toggle-title')[0].textContent = 'night';
      document.getElementsByClassName('style-toggle-title')[0].dataset.title = 'day';
    }, 75);
  break;
}

