// Get User settings and display them
addUserSettings();

// Add default notifications to DOM
addNotifications();

// Play notification icon animation and display green light on page load
window.addEventListener('load', showNotificationAlert());

// display default login alert box
showAlert('Alert', 'Chart data is from Saturday due to a system update that ran overnight.');
$('#alertMessage').delay(300).slideDown(700);

// Event Listeners

notificationsList.addEventListener('click', e => {
  // Check if user clicked on a notification X icon
  if (e.target.className === 'close-icon purple') {
    // Reference the List item containing the notification and remove it
    let notificationLI = e.target.parentNode;
    removeElement(notificationsList, notificationLI);
  }
  // Check if there are no notifications
  if (notificationsList.childElementCount === 0) {
    // If so hide the notification's list
    notificationsList.style.display = 'none';
  }
});

notificationIcon.addEventListener('click', () => {
  // Hide the notification light
  hideElement(notificationLight);
  // Check to see if the notification's list is visible
  if (notificationsList.style.display === 'block') {
    // If so hide it
    notificationsList.style.display = 'none';
    // Otherwise display it
  } else {
    notificationsList.style.display = 'block';
    // Check if there are no notifications
    if (notificationsList.childElementCount === 0) {
     addEmptyNotification();
      // Otherwise, if there is more than 1 list item that doesn't include the new list item containing the no new notifications message
    } else {
      if (notificationsList.childElementCount > 1) {
        // Select all list items
        let notifications = document.querySelectorAll('.notification');
        // Loop over the length of the list items
        for (let i = 0; i < notifications.length; i += 1) {
          // Check if the notification's content matches the new list item that tells the user there are no notifications
         if (notifications[i].innerHTML === '<span>No new notifications.</span>') {
           // Remove the list item because there are new notifications
            removeElement(notificationsList, notifications[i]);
          }
        }
      }
    }
  }
});

nav.addEventListener('click', e => {
  // Check to see if an icon was clicked on
  if (e.target.tagName === 'IMG') {
    // Reference the anchor element
    let iconLink = e.target.parentNode;
    // Add the active page class to the clicked nav icon
    toggleClass(iconLink, navLinks, 'app-nav__link--selected');
  }
});

alertMessage.addEventListener('click', e => {
  // Check if the X icon was clicked on
  if (e.target.className === 'alert__icon') {
    // Slide up and hide the alert message
    $(alertMessage).slideUp(700);
  }
});

trafficNav.addEventListener('click', e => {
  // Check if the clicked element is a list item
  if (e.target.tagName === 'LI') {
    let link = e.target;
    // Add the active state class to the clicked list item
    toggleClass(link, trafficLinks, 'traffic__link--active');
    // If the clicked link is Hourly
    if (link.textContent === 'Hourly') {
      // Call the updateChart function to update the chart data
      updateTrafficChart('hourly', hourlyData);
    } // If the clicked link is Daily
    if (link.textContent === 'Daily') {
      updateTrafficChart('daily', dailyData);
    } // If the clicked link is Weekly
    if (link.textContent === 'Weekly') {
      updateTrafficChart('weekly', weeklyData);
    } // If the clicked link is Monthly
    if (link.textContent === 'Monthly') {
      updateTrafficChart('monthly', monthlyData);
    }
  }
});

messageForm.addEventListener('click', e => {
  // Remove default form submission behaviour
  e.preventDefault();
  // Check if the send button was clicked
  if (e.target === sendButton) {
    // Reference the value entered into the user field
    let user = userField.value.toLowerCase();
    // Reference the value entered into the message field
    let message = messageField.value;
    // Check form data
    validateForm(user, message);
  }
});

// Add the autocomplete function for the user field in the message area
autocomplete(userField, users);

saveSettingsBtn.addEventListener('click', () => {
  saveSettings('email');
  saveSettings('profile');
  saveSettings('timezone');
});

cancelSettingsBtn.addEventListener("click", () => {
  if (emailSettingsCheckBox.checked) {
    emailSettingsCheckBox.checked = false;
  }
  if (profileSettingsCheckBox.checked) {
    profileSettingsCheckBox.checked = false;
  }
});

