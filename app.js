const notificationIconDiv = document.querySelector('.app-header__icon-container');
const notificationIcon = document.querySelector('.app-header__icon');
const nav = document.querySelector('.app-nav');
const navLinks = nav.querySelectorAll('.app-nav__link');
const searchBox = document.querySelector('.header__search');
const alertMessage = document.getElementById('alertMessage');
const trafficNav = document.querySelector('.traffic__nav');
const trafficLinks = trafficNav.querySelectorAll('.traffic__link');
const trafficCanvas = document.getElementById('trafficChart');
const dailyTrafficCanvas = document.getElementById('dailyTrafficChart');
const devicesTrafficCanvas = document.getElementById('devicesChart');

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
    duration: 0
  },
  scales: {
    yAxes: [
      {
        ticks: {
          maxTicksLimit: 5,
          fontFamily: 'Open Sans, sans-serif',
          fontColor: '#939393',
          padding: 15
        },
        gridLines: {
          offsetGridLines: true,
          drawTicks: false
        }
      }
    ],
    xAxes: [
      {
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
      backgroundColor: "#7377BF",
      borderWidth: 1
    }
  ]
};

const dailyTrafficOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: {
    display: false
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
  legend: {
    position: 'right',
    align: 'center',
    labels: {
      boxWidth: 28,
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 14,
      padding: 18
    }
  }
};

alertMessage.innerHTML = 
  `<span class="alert__title">Alert</span>
   <p class="alert__message">You have <strong>6</strong> overdue tasks to complete.</p>
   <span class="alert__icon"></span>`;

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

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    let iconLink = e.target.parentNode;
    toggleClass(iconLink, navLinks, 'app-nav__link--selected');
  }
});

searchBox.addEventListener('keypress', (e) => {
  let text = searchBox.value;
  let key = e.which || e.keyCode;
  if (key === 13) {
    console.log(text);
    searchBox.value = '';
  }
});

trafficNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    let link = e.target;
    toggleClass(link, trafficLinks, 'traffic__link--active');
  }
});

