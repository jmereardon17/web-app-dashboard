const notificationIconDiv = document.querySelector('.app-header__icon-container');
const notificationIcon = document.querySelector('.app-header__icon');
const notificationLight = document.querySelector('.notification-light');
const notificationsList = document.querySelector('.notifications');
const nav = document.querySelector('.app-nav');
const navLinks = nav.querySelectorAll('.app-nav__link');
const main = document.querySelector('main');
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
const settingsWrapper = document.querySelector('.settings .wrapper');
const emailSettingsCheckBox = document.getElementById('emailSetting');
const profileSettingsCheckBox = document.getElementById('profileSetting');
const timeZoneSelect = document.getElementById('time-zone');
const saveSettingsBtn = document.getElementById('save');
const cancelSettingsBtn = document.getElementById('cancel');

// Add default notifications to DOM
addNotifications();
notificationLight.style.visibility = 'hidden';

// Play notification icon animation on page load
window.addEventListener('load', function(){
  this.setTimeout(function(){
    notificationLight.style.visibility = 'visible';
    notificationIcon.classList.add('shake');
    animateLight();
  },2000);
});

// display default login alert box
showAlert('Alert', 'Chart data is from Saturday due to a system update that ran overnight.');

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
  notificationLight.style.visibility = 'hidden';
  notificationIcon.classList.remove('shake');
  if (notificationsList.style.display === 'block') {
    notificationsList.style.display = 'none';
  } else {
    notificationsList.style.display = 'block';
    if (notificationsList.childElementCount === 0) {
      const li = document.createElement('li');
      li.innerHTML = '<span>No new notifications.</span>';
      li.className = 'notification';
      notificationsList.appendChild(li);
    } else {
      if (notificationsList.childElementCount > 1) {
        let notifications = document.querySelectorAll('.notification');
        for (let i = 0; i < notifications.length; i += 1) {
         if (notifications[i].innerHTML === '<span>No new notifications.</span>') {
            notificationsList.removeChild(notifications[i]);
          }
        }
      }
    }
  }
});

nav.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    let iconLink = e.target.parentNode;
    let selected = e.target;
    toggleClass(iconLink, navLinks, 'app-nav__link--selected');
  }
});

trafficNav.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    let link = e.target;
    toggleClass(link, trafficLinks, 'traffic__link--active');
    if (link.textContent === 'Hourly') {
      trafficData.labels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
      trafficData.datasets[0].data = [867, 200, 768, 100, 232, 231, 112, 122, 200];
      trafficChart = new Chart(trafficCanvas, {
        type: "line",
        data: trafficData,
        options: trafficOptions
      });
    }
    if (link.textContent === 'Daily') {
      trafficData.labels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
      trafficData.datasets[0].data = [300, 670, 550, 820, 700, 520, 580];
      trafficChart = new Chart(trafficCanvas, {
        type: "line",
        data: trafficData,
        options: trafficOptions
      });
    }
    if (link.textContent === 'Weekly') {
      trafficData.labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', 
    '11-17', '18-24', '25-31'];
      trafficData.datasets[0].data = [800, 1250, 1000, 1500, 2000, 1500, 1700, 1250, 1700, 2250, 1700, 2250];
      trafficChart = new Chart(trafficCanvas, {
        type: "line",
        data: trafficData,
        options: trafficOptions
      });
    }
    if (link.textContent === 'Monthly') {
      trafficData.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 
    'Aug', 'Oct', 'Nov', 'Dec'];
      trafficData.datasets[0].data = [950, 2012, 542, 768, 1024, 1200, 480, 1020, 1025, 1230, 2400, 2120];
      trafficChart = new Chart(trafficCanvas, {
        type: "line",
        data: trafficData,
        options: trafficOptions
      });
    }
  }
});

messageForm.addEventListener('click', e => {
  e.preventDefault();
  if (e.target === sendButton) {
    let user = userField.value.toLowerCase();
    let message = messageField.value;
    if (user === '' && message === '') {
      showAlert('error', 'Message unsuccessfully sent, please fill in both form fields.');
    } else if (user === '') {
      showAlert('error', 'Message unsuccessfully sent, please enter a member name.');
    } else if (message === '') {
      showAlert('error', 'Message unsuccessfully sent, please enter a message.');
    } else if (message.length < 6 ) {
      showAlert('error', 'Message unsuccessfully sent, please enter a message that is longer than 5 characters.');
      message = '';
    } else {
      let userNames = [];
      for (let i = 0; i < users.length; i += 1) {
        let userName = users[i].name.toLowerCase();
        userNames.push(userName);
      }
      if (userNames.indexOf(user) < 0) {
        showAlert('error', 'Message unsuccessfully sent, there is no such member that matches your user search.');
      } else {
          showAlert('success', 'Message sent successfully.');
        if (user === 'Jamie Reardon'.toLowerCase()) {
          let notificationsArrayLength = notifications.length;
          notifications.push({from: 'Jamie Reardon', notification: 'sent you a message.'});
          const li = document.createElement('li');
          let userPhoto = users[0].photo;
          let from = notifications[notificationsArrayLength].from;
          let notification = notifications[notificationsArrayLength].notification;
          li.innerHTML = `<img class="profile-photo" src="${userPhoto}"> <span><strong class="activity__desc--name">${from}</strong> ${notification}</span> <span class="close-icon purple"></span>`;
          li.className = 'notification';
          notificationsList.appendChild(li);
          notificationLight.style.visibility = 'visible';
          animateLight();
          window.setTimeout(function(){
            notificationIcon.classList.add('shake');
            ion.sound.play('level_up');
          },2000);
        }
      }
      user = '';
      message = '';
    }
  }
});

autocomplete(userField, users);

// To move and refactor

let emailPref = localStorage.getItem('Email Notifications');

if (emailPref === 'true') {
  emailSettingsCheckBox.checked = true;
}
if (emailPref === 'false') {
  emailSettingsCheckBox.checked = false;
}

let profilePref = localStorage.getItem('Profile Public');

if (profilePref === 'true') {
  profileSettingsCheckBox.checked = true;
}
if (profilePref === 'false') {
  profileSettingsCheckBox.checked = false;
}

let timeZonePref = localStorage.getItem('Timezone');

if (timeZonePref === 'Eastern') {
  timeZoneSelect.selectedIndex = '1';
}
if (timeZonePref === 'Central') {
  timeZoneSelect.selectedIndex = '2';
}
if (timeZonePref === 'Pacific') {
  timeZoneSelect.selectedIndex = '3';
}

// timeZoneSelect.addEventListener('change', (e) => {
//   let selectedTimeZone = e.target.options[e.target.selectedIndex];
//   if (selectedTimeZone.textContent === 'Eastern') {
//     timeZonePref = 'Eastern';
//   } else if (selectedTimeZone.textContent === 'Central') {
//     timeZonePref = localStorage.setItem('Timezone', 'Eastern');
//   } else if (selectedTimeZone.textContent === 'Pacific') {
//     timeZonePref = localStorage.setItem('Timezone', 'Eastern');
//   }
// });

saveSettingsBtn.addEventListener('click', () => {
  let selectedTimeZone = timeZoneSelect[timeZoneSelect.selectedIndex];
  if (emailSettingsCheckBox.checked) {
    localStorage.setItem('Email Notifications', 'true');
  } else {
    localStorage.setItem('Email Notifications', 'false');
  }
  if (profileSettingsCheckBox.checked) {
    localStorage.setItem('Profile Public', 'true');
  } else {
    localStorage.setItem('Profile Public', 'false');
  }
  if (selectedTimeZone.textContent === 'Eastern') {
    timeZonePref = localStorage.setItem('Timezone', 'Eastern');
  } else if (selectedTimeZone.textContent === 'Central') {
    timeZonePref = localStorage.setItem('Timezone', 'Central');
  } else if (selectedTimeZone.textContent === 'Pacific') {
    timeZonePref = localStorage.setItem('Timezone', 'Pacific');
  }
  showAlert('success', 'Settings saved successfully.')
});

cancelSettingsBtn.addEventListener("click", () => {

  if (emailSettingsCheckBox.checked) {
    emailSettingsCheckBox.checked = false;
  }
  if (profileSettingsCheckBox.checked) {
    profileSettingsCheckBox.checked = false;
  }
});

// settingsWrapper.addEventListener('click', (e) => {
//   let newEmailSetting;
//   let newProfileSetting;
//   if (e.target.className === 'toggle-checkbox') {
//     let checkbox = e.target;
//     if (checkbox === emailSettingsCheckBox) {
//       if (checkbox.checked) {
//         newEmailSetting = true;
//       } else {
//         newEmailSetting = false;
//       }
//       // newEmailSetting = emailSettingsCheckBox.checked;
//     } else if (checkbox === profileSettingsCheckBox) {
//       newProfileSetting = profileSettingsCheckBox.checked;
//       console.log(newProfileSetting);
//     }
//   }
//   if (e.target === cancelSettingsBtn) {
//     let oldEmailSetting = emailSettingsCheckBox.checked;
//     if (newEmailSetting !== oldEmailSetting) {
//       console.log('no it\'s not');
//     } else {
//       console.log('yes it is');
//     }
//   }
// });

