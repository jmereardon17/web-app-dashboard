const notificationIconDiv = document.querySelector('.app-header__icon-container');
const notificationIcon = document.querySelector('.app-header__icon');
const notificationLight = document.querySelector('.notification-light');
const notificationsList = document.querySelector('.notifications');
const nav = document.querySelector('.app-nav');
const navLinks = nav.querySelectorAll('.app-nav__link');
const searchBox = document.querySelector('.header__search');
const alertMessage = document.getElementById('alertMessage');
const trafficNav = document.querySelector('.traffic__nav');
const trafficLinks = trafficNav.querySelectorAll('.traffic__link');
const trafficCanvas = document.getElementById('trafficChart');
const trafficProgress = document.getElementById('animationProgress');
const dailyTrafficCanvas = document.getElementById('dailyTrafficChart');
const devicesTrafficCanvas = document.getElementById('devicesChart');
const messageForm = document.querySelector('.message__form');
const userField = document.getElementById('userField');
const messageField = document.getElementById('messageField');
const sendButton = document.querySelector('.btn-positive');

// Add default notifications to DOM
addNotifications();

// display default login alert box
showAlert('login', 'Chart data is from Saturday due to a system update that ran overnight.');

// Generate charts for display
let trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: trafficData,
  options: trafficOptions
});

let dailyTrafficChart = new Chart(dailyTrafficCanvas, {
  type: "bar",
  data: dailyTrafficData,
  options: dailyTrafficOptions
});

let devicesTrafficChart = new Chart(devicesTrafficCanvas, {
  type: 'doughnut',
  data: devicesTrafficData,
  options: devicesTrafficOptions
});

// Event Listeners
notificationsList.addEventListener('click', e => {
  if (e.target.className === 'close-icon purple') {
    let notification = e.target.parentNode;
    // let content += e.target.previousElementSibling.childNodes[1];
    let content = e.target.previousElementSibling.firstChild.nextSibling.textContent;
    // let content = e.target.previousElementSibling.firstChild.nextSibling;
    notificationsList.removeChild(notification);
    for (let i = 0; i < notifications.length; i += 1) {
      let comparison = ' ' + notifications[i].notification;
      if (comparison === content) {
        notifications.splice(i, 1);
      }
    }
  }
  if (notificationsList.childElementCount === 0) {
    notificationsList.style.display = 'none';
  }
});

notificationIcon.addEventListener('click', () => {
  if (notificationsList.style.display === 'block') {
    notificationsList.style.display = 'none';
  } else {
    notificationsList.style.display = 'block';
    notificationLight.style.display = 'none';
    if (notificationsList.childElementCount === 0) {
      const li = document.createElement('li');
      li.innerHTML = '<span>No new notifications.</span>';
      li.className = 'notification';
      notificationsList.appendChild(li);
    }
  }
});

nav.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    let iconLink = e.target.parentNode;
    toggleClass(iconLink, navLinks, 'app-nav__link--selected');
  }
});

trafficNav.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    let link = e.target;
    toggleClass(link, trafficLinks, 'traffic__link--active');
  }
});

messageForm.addEventListener('click', e => {
  e.preventDefault();
  if (e.target === sendButton) {
    let user = userField.value;
    let message = messageField.value;
    if (user === '' && message === '') {
      showAlert('fail', 'Message <strong>Unsuccessfully</strong> sent, please fill in both form fields.');
      user = '';
      message = '';
    } else if (user === '') {
      showAlert('fail', 'Message <strong>Unsuccessfully</strong> sent, please enter a member name.');
    } else if (message === '') {
      showAlert('fail', 'Message <strong>Unsuccessfully</strong> sent, please enter a message.');
    } else if (message.length < 6 ) {
      showAlert('fail', 'Message <strong>Unsuccessfully</strong> sent, please enter a message that is longer than 5 characters.');
      message = '';
    } else {
      showAlert('sent', 'Message sent <strong>successfully</strong>.');
      if (user === 'Jamie Reardon') {
        notifications.push({from: 'Jamie Reardon', notification: 'sent you a message.'});
        const li = document.createElement('li');
        let userPhoto = users[0].photo;
        let from = notifications[3].from;
        let notification = notifications[3].notification;
        li.innerHTML = `<img class="profile-photo" src="${userPhoto}"> <span><strong class="activity__desc--name">${from}</strong> ${notification}</span> <span class="close-icon purple"></span>`;
        li.className = 'notification';
        notificationsList.appendChild(li);
        notificationLight.style.display = 'block';
      }
      user = '';
      message = '';
    }
  }
});

userField.addEventListener('keyup', e => {
  let userSearch = userField.value;
  if (userSearch !== '') {
    checkUser(userSearch);
  }
});

