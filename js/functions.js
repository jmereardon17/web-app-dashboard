const addAlertHTML = message => {
  alertMessage.innerHTML = `<span class="alert__title">Alert</span>
   <p class="alert__message">${message}</p>
   <span class="alert__icon"></span>`;
};

const showAlert = (type, message) => {
  if (type === "login") {
    addAlertHTML(message);
  }
  if (type === "sent") {
    alertMessage.style.backgroundColor = "#81C98F";
    addAlertHTML(message);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#alertMessage")
      .delay(300)
      .slideDown(700);
  }
  if (type === "fail") {
    alertMessage.style.backgroundColor = "tomato";
    addAlertHTML(message);
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
        // messageForm.scrollIntoView( { behavour: 'smooth' } );
      }
    });
  }
};

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
    const div = document.createElement("div");
    div.textContent = user;
    div.className = "message__match";
    messageForm.appendChild(div);
  });
};

const toggleClass = (element, parent, name) => {
  for (let i = 0; i < parent.length; i += 1) {
    if (parent[i].classList.contains(name)) {
      parent[i].classList.remove(name);
    }
  }
  element.classList.add(name);
};

const addNotifications = () => {
  for (let i = 0; i < notifications.length; i += 1) {
    let from = notifications[i].from;
    let notification = notifications[i].notification;
    for (let j = 0; j < users.length; j += 1) {
      if (users[j].name === from) {
        let userPhoto = users[j].photo;
        const li = document.createElement("li");
        li.innerHTML = `<img class="profile-photo" src="${userPhoto}"> <span><strong class="activity__desc--name">${from}</strong> ${notification}</span> <span class="close-icon purple"></span>`;
        li.className = "notification";
        notificationsList.appendChild(li);
      }
    }
  }
};