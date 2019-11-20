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

let notifications = [
  {
    from: 'Dan Oliver',
    notification: 'liked your post'
  },
  {
    from: 'Victoria Chambers',
    notification: 'shared your post'
  },
  {
    from: 'Dale Byrd',
    notification: 'upvoted your post'
  }
];

let trafficData = {
  labels: [
    '16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', 
    '11-17', '18-24', '25-31'
  ],
  datasets: [
    {
      data: [800, 1250, 1000, 1500, 2000, 1500, 1700, 1250, 1700, 2250, 1700, 2250],
      backgroundColor: 'rgba(116, 119, 191, .3)',
      borderColor: '#BCBFEB',
      borderWidth: 2,
      lineTension: 0,
      spanGaps: true,
      pointBackgroundColor: '#FFFFFF',
      pointRadius: 6,
      pointBorderColor: '#7377BF',
      pointBorderWidth: 2
    }
  ]
};

const trafficOptions = {
  responsive: true,
  aspectRatio: 4.5,
  animation: {
    onProgress: function(animation) {
      trafficProgress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
    },
    onComplete: function(animation) {
      $(trafficProgress).fadeOut(1500);
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          maxTicksLimit: 5,
          fontFamily: 'Open Sans, sans-serif',
          fontColor: '#939393',
          padding: 14
        },
        gridLines: {
          offsetGridLines: true,
          drawTicks: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          fontFamily: 'Open Sans, sans-serif',
          fontColor: '#939393',
          padding: 18
        },
        gridLines: {
          offsetGridLines: true,
          drawTicks: false
        }
      }
    ]
  },
  legend: {
    display: false
  },
  layout: {
    padding: {
      left: 5,
      right: 0,
      top: 0,
      bottom: 0
    }
  }
};

let dailyTrafficData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      label: "# of Hits",
      data: [75, 100, 175, 125, 225, 200, 100],
      backgroundColor: "#7377BF"
    }
  ]
};

const dailyTrafficOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          maxTicksLimit: 5,
          fontFamily: 'Open Sans, sans-serif',
          fontColor: '#939393',
          padding: 14
        },
        gridLines: {
          offsetGridLines: true,
          drawTicks: false
        }
      }
    ],
    xAxes: [
      {
        barThickness: 30,
        ticks: {
          fontFamily: 'Open Sans, sans-serif',
          fontColor: '#939393',
          padding: 18
        },
        gridLines: {
          drawTicks: false
        }
      }
    ]
  },
  legend: {
    display: false
  },
  layout: {
    padding: {
      left: 5,
      right: 0,
      top: 0,
      bottom: 0
    }
  }
};

let devicesTrafficData = {
  labels: [ 'Phones', 'Tablets', 'Desktop' ],
  datasets: [
    {
      label: '# of Users',
      data: [ 60, 45, 250 ],
      borderWidth: 0,
      backgroundColor: [
        '#81C98F',
        '#73B1BF',
        '#7377BF'
      ]
    }
  ]
};

const devicesTrafficOptions = {
  responsive: true,
  legend: {
    position: 'right',
    align: 'center',
    labels: {
      boxWidth: 28,
      fontFamily: 'Open Sans, sans-serif',
      fontSize: 14,
      padding: 18
    }
  },
  layout: {
    padding: {
      left: 0,
      right: 20,
      top: 0,
      bottom: 0
    }
  }
};

let users = [
  {
    name: 'Jamie Reardon',
    photo: 'images/profile-photo.jpg'
  },
  {
    name: 'Victoria Chambers',
    photo: 'images/member-1.jpg'
  },
  {
    name: 'Dale Byrd',
    photo: 'images/member-2.jpg'
  },
  {
    name: 'Dawn Wood',
    photo: 'images/member-3.jpg'
  },
  {
    name: 'Dan Oliver',
    photo: 'images/member-4.jpg'
  }
];

const addAlertHTML = message => {
  alertMessage.innerHTML = 
  `<span class="alert__title">Alert</span>
   <p class="alert__message">${message}</p>
   <span class="alert__icon"></span>`;
}

const showAlert = (type, message) => {
  if (type === 'login') {
   addAlertHTML(message);
  }
  if (type === 'sent') {
    alertMessage.style.backgroundColor = '#81C98F';
    addAlertHTML(message);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $('#alertMessage').delay(300).slideDown(700);
  }
  if (type === 'fail') {
    alertMessage.style.backgroundColor = 'tomato';
    addAlertHTML(message);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $('#alertMessage').delay(300).slideDown(700);
  }
}

// const checkUser = search => {
//   if (users.indexOf(search) > -1) {
//     const div = document.createElement('div');
//     div.className = 'message__match';
//     div.textContent = search;
//     messageForm.insertBefore(div, messageField);

//     const divTexts = messageForm.querySelectorAll('div');

//     divTexts.forEach(divText => {
//       if (divText.textContent !== search) {
//         divText.parentNode.removeChild(divText);
//       }
//     });
//   }
// }

const checkUser = search => {
  let matched = [];
  for (let i = 0; i < users.length; i += 1) {
    let user = users[i].name;
    if (user.indexOf(search) > -1) {
      matched.push(user);
    }
  }
  let sorted = Array.from(new Set(matched));
  sorted.forEach(user => {
    const div = document.createElement('div');
    div.textContent = user;
    div.className = 'message__match';
    messageForm.appendChild(div);
  });
}

showAlert('login', 'Chart data is from Saturday due to a system update that ran overnight.');

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

const toggleClass = (element, parent, name) => {
  for (let i = 0; i < parent.length; i += 1) {
    if (parent[i].classList.contains(name)) {
      parent[i].classList.remove(name);
    }
  }
  element.classList.add(name);
}

const addNotifications = () => {
  for (let i = 0; i < notifications.length; i += 1) {
    let from = notifications[i].from;
    let notification = notifications[i].notification;
    for (let j = 0; j < users.length; j += 1) {
      if (users[i].name === from) {
        let userPhoto = users[i].photo;
        const li = document.createElement('li');
        li.innerHTML = `<img class="profile-photo feed" src="${userPhoto}"> <strong>${from}</strong> ${notification} <span class="close-icon"></span>`;
        li.className = 'notification';
        notificationsList.appendChild(li);
      }
    }
  }
}

notificationIcon.addEventListener('click', () => {
  if (notificationsList.style.display === 'block') {
    notificationsList.style.display = 'none';
    notificationLight.style.display = 'block';
  } else {
    notificationsList.style.display = 'block';
    notificationLight.style.display = 'none';
    addNotifications();
  }
});

nav.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    let iconLink = e.target.parentNode;
    toggleClass(iconLink, navLinks, 'app-nav__link--selected');
  }
});

searchBox.addEventListener('keypress', e => {
  let text = searchBox.value;
  let key = e.which || e.keyCode;
  if (key === 13) {
    console.log(text);
    searchBox.value = '';
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
