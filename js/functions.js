const addAlertHTML = (type, message) => {
  alertMessage.innerHTML = `<span class="alert__title">${type}</span>
   <p class="alert__message">${message}</p>
   <span class="alert__icon"></span>`;
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
        // messageForm.scrollIntoView( { behavour: 'smooth' } );
      }
    });
  }
  const alertMessageText = document.querySelector('.alert__message');
  if (alertMessageText.textContent.length > 150) {
    alertMessageText.style.margin = '5px 0 0 0';
  }
};

const checkUser = search => {
  let matched = [];
  for (let i = 0; i < users.length; i += 1) {
    let user = users[i].name.toLowerCase();
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
  const matchDivs = document.querySelectorAll('.message__match');
  // matchDivs.forEach(match => {
  //   if (!match.textContent.startsWith(search)) {
  //     messageForm.removeChild(match);
  //   }
  // });
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

// function animateLight() {
//   if (notificationLight.style.display === 'block') {
//     $(notificationLight).fadeOut(1000,function(){ 
//     $(this).fadeIn(1000,function(){ 
//       animateLight() });
//     });
//   }
//   if (notificationLight.style.display === 'none') {
//     $(notificationLight).hide();
//   }
// }
function animateLight() {
  $(notificationLight).fadeOut(1000,function(){ 
  $(this).fadeIn(1000,function(){ 
    animateLight() });
  });
}

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
  notificationLight.style.display = 'block';
};