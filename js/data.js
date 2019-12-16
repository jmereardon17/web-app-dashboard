/* 
  Chart and page data for app
*/

// Traffic Chart Data
const hourlyData = [867, 200, 768, 100, 232, 231, 112, 122, 200];
const dailyData = [300, 670, 550, 820, 700, 520, 580];
const weeklyData = [800, 1250, 1000, 1500, 2000, 1500, 1700, 1250, 1700, 2250, 1700, 2250];
const monthlyData = [950, 2012, 542, 768, 1024, 1200, 480, 1020, 1025, 1230, 2400, 2120];

// Charts Configuration
let trafficData = {
  labels: [
    '16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', 
    '11-17', '18-24', '25-31'
  ],
  datasets: [
    {
      data: weeklyData,
      backgroundColor: 'rgba(116, 119, 191, .3)',
      hoverBackgroundColor: '#81C98F',
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
    onComplete: function() {
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
      backgroundColor: "#7377BF",
      hoverBackgroundColor: "#81C98F"
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
      ],
      hoverBackgroundColor: [
        '#9ad3a5',
        '#8ec0cb',
        '#8e92cb'
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

// Generate charts for display
let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions
});

let dailyTrafficChart = new Chart(dailyTrafficCanvas, {
  type: 'bar',
  data: dailyTrafficData,
  options: dailyTrafficOptions
});

let devicesTrafficChart = new Chart(devicesTrafficCanvas, {
  type: 'doughnut',
  data: devicesTrafficData,
  options: devicesTrafficOptions
});

// Page Data
let notifications = [
  {
    from: 'Dan Oliver',
    notification: 'liked your post.'
  },
  {
    from: 'Victoria Chambers',
    notification: 'shared your post.'
  },
  {
    from: 'Dale Byrd',
    notification: 'upvoted your post.'
  }
];

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

// Plugins
ion.sound({
    sounds: [
        {
          name: 'level_up',
          volume: 0.2
        }
    ],
    volume: 0,
    // volume: 0.2,
    path: "js/plugins/ion-sound/sounds/",
    preload: true
});