const addAlertHTML = (type, message) => {
  alertMessage.innerHTML = `<span class="alert__title">${type}</span>
   <p class="alert__message">${message}</p>
   <img class="alert__icon" src="icons/icon-close.svg" alt="Close Icon">`;
};

const resetFields = () => {
  let userField = document.getElementById('userField');
  let messageField = document.getElementById('messageField');
  userField.value = '';
  messageField.value = '';
}

const showAlert = (type, message) => {
  if (type === "Alert") {
    addAlertHTML(type, message);
  }
  if (type === 'success') {
    resetFields();
    alertMessage.style.backgroundColor = "#81C98F";
    addAlertHTML('Success', message);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#alertMessage")
      .delay(300)
      .slideDown(700);
  }
  if (type === "error") {
    resetFields();
    alertMessage.style.backgroundColor = "tomato";
    addAlertHTML('Error', message);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#alertMessage")
      .delay(300)
      .slideDown(700);
    alertMessage.addEventListener("click", e => {
      if (e.target.className === "alert__icon") {
        $("#alertMessage").slideUp(700);
        $("html, body").animate(
          {
            scrollTop: $(messageForm).offset().top
          },
          1000
        );
      }
    });
  }
  const alertMessageText = document.querySelector('.alert__message');
  if (alertMessageText.textContent.length > 150) {
    alertMessageText.style.margin = '5px 0 0 0';
  }
};

const autocomplete = (inp, arr) => {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      let a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].name.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

const toggleClass = (element, parent, name) => {
  for (let i = 0; i < parent.length; i += 1) {
    if (parent[i].classList.contains(name)) {
      parent[i].classList.remove(name);
    }
  }
  element.classList.add(name);
};

const removeElement = (parent, element) => {
  parent.removeChild(element);
}

const hideElement = element => {
  element.style.visibility = 'hidden';
}

const showElement = element => {
  element.style.visibility = 'visible';
}

const animateLight = () => {
  $(notificationLight).fadeOut(1000,function(){ 
  $(this).fadeIn(1000,function(){ 
    animateLight() });
  });
}

const addUserSettings = () => {
  /* Get the user's email and profile setting preferences
    Compare the values and reflect the settings for the checkboxes states
  */
  let emailPreference = localStorage.getItem('Email Notifications');
  if (emailPreference === 'on') {
    emailSettingsCheckBox.checked = true;
  }
  if (emailPreference === 'off') {
    emailSettingsCheckBox.checked = false;
  }

  let profilePreference = localStorage.getItem('Profile Public');
  if (profilePreference === 'on') {
    profileSettingsCheckBox.checked = true;
  }
  if (profilePreference === 'off') {
    profileSettingsCheckBox.checked = false;
  }
  // Get the user's timezone setting preference, compare the value and reflect the setting for the select option
  let timezonePreference = localStorage.getItem('Timezone');
  if (timezonePreference === 'Eastern') {
    timezoneSelect.selectedIndex = '1';
  }
  if (timezonePreference === 'Central') {
    timezoneSelect.selectedIndex = '2';
  }
  if (timezonePreference === 'Pacific') {
    timezoneSelect.selectedIndex = '3';
  }
}

const addNotifications = () => {
  for (let i = 0; i < notifications.length; i += 1) {
    let from = notifications[i].from;
    let notification = notifications[i].notification;
    for (let j = 0; j < users.length; j += 1) {
      if (users[j].name === from) {
        let userPhoto = users[j].photo;
        const li = document.createElement('li');
        li.innerHTML = `<img class="profile-photo" src="${userPhoto}"> <span><strong class="activity__desc--name">${from}</strong> ${notification}</span> <img class="close-icon purple" src="icons/icon-close-purple.svg" alt="Close Icon">`;
        li.className = 'notification';
        notificationsList.appendChild(li);
      }
    }
  }
};

const addEmptyNotification = () => {
  // Create a new notification list item
  const li = document.createElement('li');
  // Add a message to show the user there are no more notifications
  li.innerHTML = '<span>No new notifications.</span>';
  // Add the class to the list item
  li.className = 'notification';
  // Add the list item to the notification's list
  notificationsList.appendChild(li);
}

const showNotificationAlert = option => {
  window.setTimeout(function(){
    notificationLight.style.visibility = 'visible';
    notificationIcon.classList.add('shake');
    animateLight();
    if (option === 'sound') {
      ion.sound.play('level_up');
    }
  },2000);
  window.setTimeout(function(){
    notificationIcon.classList.remove('shake');
  },4000);
}

const userNewNotification = () => {
  // Reference the length of the notifications array
  let notificationsArrayLength = notifications.length;
  // Add a new notification to the logged in user
  notifications.push({from: 'Jamie Reardon', notification: 'sent you a message.'});
  // Create a new notification's list item
  const li = document.createElement('li');
  // Get the photo and name of the user that is logged in who messaged
  let userPhoto = users[0].photo;
  let from = notifications[notificationsArrayLength].from;
  // Get the notification message
  let notification = notifications[notificationsArrayLength].notification;
  // Add the HTML for the new notification list item
  li.innerHTML = `<img class="profile-photo" src="${userPhoto}"> <span><strong class="activity__desc--name">${from}</strong> ${notification}</span> <img class="close-icon purple" src="icons/icon-close-purple.svg" alt="Close Icon">`;
  li.className = 'notification';
  // Add the new notification to the notification list
  notificationsList.appendChild(li);
  // Show the notification light to indicate to the user that they have a new message
  showNotificationAlert('sound');
}

const updateTrafficChart = (labels, datasets) => {
  // Set the Hourly labels
  if (labels === 'hourly') {
    trafficData.labels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  } else if (labels === 'daily') {
    trafficData.labels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  } else if (labels === 'weekly') {
    trafficData.labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];
  } else if (labels === 'monthly') {
    trafficData.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
  // Set the Hourly data
  trafficData.datasets[0].data = datasets;
  // Update the chart
  trafficChart.update();
}

const validateForm = (userField, messageField) => {
  // Check if both fields are blank
  if (userField === '' && messageField === '') {
    // If so display an error alert
    showAlert('error', 'Message unsuccessfully sent, please fill in both form fields.');
    // Check if the user field is blank
  } else if (userField === '') {
    // If so display an error alert
    showAlert('error', 'Message unsuccessfully sent, please enter a member name.');
    // Check if the message field is blank
  } else if (messageField === '') {
    // If so display an error alert
    showAlert('error', 'Message unsuccessfully sent, please enter a message.');
    // Check if the message field contains less than 6 characters
  } else if (messageField.length < 6 ) {
    // If so display an error alert
    showAlert('error', 'Message unsuccessfully sent, please enter a message that is longer than 5 characters.');
    // reset message field
    messageField = '';
    // Otherwise assume form data is correct for submission
  } else {
    // Create an empty array literal for the usernames of the members
    let userNames = [];
    // Loop over the users array's length and add each username to the new array
    for (let i = 0; i < users.length; i += 1) {
      let userName = users[i].name.toLowerCase();
      userNames.push(userName);
    } // Check to see if the submitted user field value matches any of the usernames in the array
    if (userNames.indexOf(userField) < 0) {
      // If it doesn't show an error alert
      showAlert('error', 'Message unsuccessfully sent, there is no such member that matches your user search.');
    } else {
      // Otherwise submit form and show a success alert
      submitForm(userField);
    } // Reset form data
    userField = '';
    messageField = '';
  }
}

const submitForm = userField => {
  showAlert('success', 'Message sent successfully.');
  // Check to see if the username was the logged in user
  if (userField === 'Jamie Reardon'.toLowerCase()) {
    userNewNotification();
  }
}

const saveSettings = settings => {
  if (settings === 'email') {
    if (emailSettingsCheckBox.checked) {
      localStorage.setItem('Email Notifications', 'on');
    } else {
      localStorage.setItem('Email Notifications', 'off');
    }
  }
  if (settings === 'profile') {
    if (profileSettingsCheckBox.checked) {
      localStorage.setItem('Profile Public', 'on');
    } else {
      localStorage.setItem('Profile Public', 'off');
    }
  }
  if (settings === 'timezone') {
    let selectedTimezone = timezoneSelect[timezoneSelect.selectedIndex];
    if (selectedTimezone.textContent === 'Eastern') {
      timezonePreference = localStorage.setItem('Timezone', 'Eastern');
    } else if (selectedTimezone.textContent === 'Central') {
      timezonePreference = localStorage.setItem('Timezone', 'Central');
    } else if (selectedTimezone.textContent === 'Pacific') {
      timezonePreference = localStorage.setItem('Timezone', 'Pacific');
    }
  }
  showAlert('success', 'Settings saved successfully.')
}