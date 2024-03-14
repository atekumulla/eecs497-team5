let buttonsEl = Array.from(document.querySelectorAll(".button"));
let buttonsforsorting = Array.from(document.querySelectorAll(".button"));

let pressed = [];
const quadsPressed = [];
const delayBetweenButtons = 500;

let pairlist = [];
let pairIDlist = [];

let series1 = ["Acceptance", "Reflection", "Resilience", "Growth Mindset"];
let series2 = ["Fidget", "Pacing", "Rapid Speech", "Avoiding Eye Contact "];
let series3 = [
  "Think Before Posting",
  "Respectful Compliments",
  "Positive Engagement",
  "Authenticity",
];
let series4 = [
  "Active Listening",
  "Kind Words",
  "Non-Judgemental",
  "Validating Feelings",
];
let series1topic = ["Dealing with disappointment"];
let series2topic = ["Sign of nervousness"];
let series3topic = ["Social media etiquette"];
let series4topic = ["Showing empathy"];
let series1buttons = [];
let series2buttons = [];
let series3buttons = [];
let series4buttons = [];
let series1buttonsID = [];
let series2buttonsID = [];
let series3buttonsID = [];
let series4buttonsID = [];
let originalSeries1Buttons = [];
let originalSeries2Buttons = [];
let originalSeries3Buttons = [];
let originalSeries4Buttons = [];

//picking the teams

function pickteams() {
  const number = Math.floor(Math.random() * buttonsforsorting.length);
  const button = buttonsforsorting[number];
  buttonsforsorting.splice(number, 1);
  if (series1buttons.length < 4) {
    series1buttons.push(button);
    series1buttonsID.push(button.id);
    originalSeries1Buttons.push(button);
  } else if (series2buttons.length < 4) {
    series2buttonsID.push(button.id);
    series2buttons.push(button);
    originalSeries2Buttons.push(button);
  } else if (series3buttons.length < 4) {
    series3buttonsID.push(button.id);
    series3buttons.push(button);
    originalSeries1Buttons.push(button);
    series4buttonsID.push(button.id);
  } else {
    series4buttons.push(button);
    originalSeries1Buttons.push(button);
  }
}

for (let i = 0; i < 16; i++) {
  pickteams();
}

//entering values for the teams
for (let i = 0; i < 4; i++) {
  series1buttons[i].innerHTML = series1[i];
}
for (let i = 0; i < 4; i++) {
  series2buttons[i].innerHTML = series2[i];
}
for (let i = 0; i < 4; i++) {
  series3buttons[i].innerHTML = series3[i];
}
for (let i = 0; i < 4; i++) {
  series4buttons[i].innerHTML = series4[i];
}

//event listeners

function pressButtonHandler(event) {
  const button = event.target;
  if (
    !button.classList.contains("win1") &&
    !button.classList.contains("win2") &&
    !button.classList.contains("win3") &&
    !button.classList.contains("win4")
  ) {
    press(button); // Only allow pressing if the button is not a winning button
  }
}
function listen() {
  for (const button of buttonsEl) {
    button.addEventListener("click", pressButtonHandler);
  }
}

function relisten() {
  buttonsEl = Array.from(document.querySelectorAll(".button"));
  for (const button of buttonsEl) {
    button.removeEventListener("click", pressButtonHandler);
  }
  listen();
}

listen();

//pressing buttons

function press(button) {
  if (
    Array.from(button.classList).includes("win1") ||
    Array.from(button.classList).includes("win2") ||
    Array.from(button.classList).includes("win3") ||
    Array.from(button.classList).includes("win4")
  ) {
    return;
  }

  if (pressed.includes(button)) {
    button.classList.remove("pressed");
    console.log("removes");
    const index = pressed.indexOf(button);
    if (index > -1) {
      pressed.splice(index, 1);
    }
  } else if (pressed.length === 4) {
    console.log("you can only select 4 buttons at a time");
  } else {
    button.classList.add("pressed");
    pressed.push(button);
    if (pressed.length === 4) {
      checkwin();
    }
  }
}

//check a win
function checkwin() {
  let win = 0;
  let winarray = [];
  let won = false;
  for (const b of series1buttons) {
    for (const s of pressed) {
      if (s.id === b.id) {
        win++;
        winarray.push(s);
      }
    }
  }

  if (win === 4) {
    won = true;
    winning(winarray, 1);
    return;
  }
  win = 0;
  winarray = [];
  for (const b of series2buttons) {
    for (const s of pressed) {
      if (s.id === b.id) {
        win++;
        winarray.push(s);
      }
    }
  }
  if (win === 4) {
    winning(winarray, 2);
    won = true;
    return;
  }
  win = 0;
  winarray = [];
  for (const b of series3buttons) {
    for (const s of pressed) {
      if (s.id === b.id) {
        win++;
        winarray.push(s);
      }
    }
  }
  if (win === 4) {
    winning(winarray, 3);
    won = true;
    return;
  }
  win = 0;
  winarray = [];
  for (const b of series4buttons) {
    for (const s of pressed) {
      if (s.id === b.id) {
        win++;
        winarray.push(s);
      }
    }
  }
  if (win === 4) {
    won = true;
    winning(winarray, 4);
    return;
  }
  if (won == false && checkIfPlayed(pressed) === false) {
    takelife();
  } else {
    console.log("already played");
  }
}

//react to a win

let wintimes = 0;
function winning(array, number) {
  console.log("win");
  pressed.splice(0, 4);
  wintimes++;

  // Step 1: Buttons jumping
  array.forEach((button, index) => {
    animateButtonJump(button, index);
  });

  // Step 2: Delay before animations
  setTimeout(() => {
    list = pairs(array, wintimes);
    list.forEach((pair) => {
      addanimations(pair);
    });

    // Step 3: Check if you've won
    if (wintimes == 4) {
      console.log("you won");
    }

    // Step 4: Delay before switch and change color
    setTimeout(() => {
      if (number == 1) {
        for (button of array) {
          button.classList.add("win1");
        }
      }
      if (number == 2) {
        for (button of array) {
          button.classList.add("win2");
        }
      }
      if (number == 3) {
        for (button of array) {
          button.classList.add("win3");
        }
      }
      if (number == 4) {
        for (button of array) {
          button.classList.add("win4");
        }
      }
      setTimeout(() => {
        list.forEach((pair) => {
          switchPlaces(pair);
        });

        setTimeout(() => {
          addrect(number, wintimes);
        });
        pressed = [];
        pairlist = [];
        pairIDlist = [];
        relisten();
      }, 1000);
    }, 2000);
  }, 1000);
}
let string1 = series1.join(", ");
let string2 = series2.join(", ");
let string3 = series3.join(", ");
let string4 = series4.join(", ");

let HTML1 = `<div class='rectangle' id='rectangle1'><div class='title' id='title1'>${series1topic}</div><div class='textans' id='textans1'>${string1}</div></div>`;
let HTML2 = `<div class='rectangle' id='rectangle2'><div class='title' id='title2'>${series2topic}</div><div class='textans' id='textans2'>${string2}</div></div>`;
let HTML3 = `<div class='rectangle' id='rectangle3'><div class='title' id='title3'>${series3topic}</div><div class='textans' id='textans3'>${string3}</div></div>`;
let HTML4 = `<div class='rectangle' id='rectangle4'><div class='title' id='title4'>${series4topic}</div><div class='textans' id='textans4'>${string4}</div></div>`;
let row1isrect = false;
let row2isrect = false;
let row3isrect = false;
let row4isrect = false;
let rectsdone = [];

function addrect(number, wintimes) {
  let toadd = "";
  if (number == 1) {
    toadd = HTML1;
    rectsdone.push(1);
  } else if (number == 2) {
    toadd = HTML2;
    rectsdone.push(2);
  } else if (number == 3) {
    toadd = HTML3;
    rectsdone.push(3);
  } else if (number == 4) {
    toadd = HTML4;
    rectsdone.push(4);
  }

  if (wintimes === 1) {
    let rect = document.getElementById("row1");
    rect.innerHTML = toadd;
    row1isrect = true;
  } else if (wintimes === 2) {
    let rect = document.getElementById("row2");
    rect.innerHTML = toadd;
    row2isrect = true;
  } else if (wintimes === 3) {
    let rect = document.getElementById("row3");
    rect.innerHTML = toadd;
    row3isrect = true;
  } else if (wintimes === 4) {
    let rect = document.getElementById("row4");
    rect.innerHTML = toadd;
    row4isrect = true;
  }
}

function solverest() {
  let toadd = "";
  if (row1isrect == false) {
    if (rectsdone.includes(1) == false) {
      console.log(rectsdone);
      toadd = HTML1;
      rectsdone.push(1);
    } else if (rectsdone.includes(2) == false) {
      toadd = HTML2;
      rectsdone.push(2);
    } else if (rectsdone.includes(3) == false) {
      toadd = HTML3;
      rectsdone.push(3);
    } else if (rectsdone.includes(4) == false) {
      toadd = HTML4;
      rectsdone.push(4);
    }
    let rect = document.getElementById("row1");
    rect.innerHTML = toadd;
    row1isrect = true;
  }
  if (row2isrect == false) {
    if (rectsdone.includes(1) == false) {
      console.log(rectsdone);
      toadd = HTML1;
      rectsdone.push(1);
    } else if (rectsdone.includes(2) == false) {
      toadd = HTML2;
      rectsdone.push(2);
    } else if (rectsdone.includes(3) == false) {
      toadd = HTML3;
      rectsdone.push(3);
    } else if (rectsdone.includes(4) == false) {
      toadd = HTML4;
      rectsdone.push(4);
    }
    let rect = document.getElementById("row2");
    rect.innerHTML = toadd;
    row2isrect = true;
  }
  if (row3isrect == false) {
    if (rectsdone.includes(1) == false) {
      console.log(rectsdone);
      toadd = HTML1;
      rectsdone.push(1);
    } else if (rectsdone.includes(2) == false) {
      toadd = HTML2;
      rectsdone.push(2);
    } else if (rectsdone.includes(3) == false) {
      toadd = HTML3;
      rectsdone.push(3);
    } else if (rectsdone.includes(4) == false) {
      toadd = HTML4;
      rectsdone.push(4);
    }
    let rect = document.getElementById("row3");
    rect.innerHTML = toadd;
    row3isrect = true;
  }
  if (row4isrect == false) {
    if (rectsdone.includes(1) == false) {
      console.log(rectsdone);
      toadd = HTML1;
      rectsdone.push(1);
    } else if (rectsdone.includes(2) == false) {
      toadd = HTML2;
      rectsdone.push(2);
    } else if (rectsdone.includes(3) == false) {
      toadd = HTML3;
      rectsdone.push(3);
    } else if (rectsdone.includes(4) == false) {
      toadd = HTML4;
      rectsdone.push(4);
    }
    let rect = document.getElementById("row4");
    rect.innerHTML = toadd;
    row4isrect = true;
  }
}
//add lives
let lives = 4;

function takelife() {
  if (lives == 4) {
    const element = document.getElementById("life4");
    // showAlert("Wrong combination. Guess again");
    showAlert("Wrong combination. Guess again", 'warning');
    element.remove();
    lives--;
  } else if (lives == 3) {
    const element = document.getElementById("life3");
    // showAlert("Wrong combination. Guess again");
    showAlert("Wrong combination. Guess again", 'warning');
    element.remove();
    lives--;
  } else if (lives == 2) {
    const element = document.getElementById("life2");
    // showAlert("Wrong combination. Guess again");
    showAlert("Wrong combination. Guess again", 'warning');
    element.remove();
    lives--;
  } else if (lives == 1) {
    const element = document.getElementById("life1");
    element.remove();
    lives--;
    setTimeout(() => {
      // showAlert("Sorry, you lost. Better luck next time!");
      showAlert("Sorry, you lost. Better luck next time!", 'gameOver');
      solverest();
    }, 1000); // 2000 milliseconds = 2 seconds
  }
  for (element of pressed) {
    element.classList.remove("pressed");
  }
  pressed.splice(0, 4);
}

// function showAlert(message) {
//   // Create popup container
//   const popupContainer = document.createElement("div");
//   popupContainer.classList.add("popup-container");

//   // Create popup content
//   const popup = document.createElement("div");
//   popup.classList.add("popup");

//   // Create close button
//   const closeBtn = document.createElement("span");
//   closeBtn.classList.add("close-btn");
//   closeBtn.textContent = "Close";
//   closeBtn.onclick = () => {
//     popupContainer.remove();
//   };

//   // Create message element
//   const alertMessage = document.createElement("p");
//   alertMessage.textContent = message;

//   // Append close button and message to popup
//   popup.appendChild(alertMessage);
//   popup.appendChild(closeBtn);


//   // Append popup to container
//   popupContainer.appendChild(popup);

//   // Append container to body
//   document.body.appendChild(popupContainer);
// }
function showAlert(message, alertType = 'default') {
  // Create popup container
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  // Create popup content
  const popup = document.createElement("div");
  popup.classList.add("popup");

  // Differentiate between alert types
  if (alertType === 'gameOver') {
    popup.classList.add("game-over-popup");
  } else if (alertType === 'warning') {
    popup.classList.add("warning-popup");
  }
  // ... You can add more conditions for different types

  // Create message element
  const alertMessage = document.createElement("p");
  alertMessage.textContent = message;

  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => {
    popupContainer.remove();
  };

  // Append message and close button to popup
  popup.appendChild(alertMessage);
  popup.appendChild(closeBtn);

  // Append popup to container
  popupContainer.appendChild(popup);

  // Append container to body
  document.body.appendChild(popupContainer);
}

//one away

function checkIfPlayed(quad) {
  const quadButtonIDs = quad.map((button) => button.id).sort();
  for (const p of quadsPressed) {
    const pButtonIDs = p.map((button) => button.id).sort();
    const isSame = quadButtonIDs.every(
      (buttonID, index) => buttonID === pButtonIDs[index]
    );
    if (isSame) {
      for (element of pressed) {
        element.classList.remove("pressed");
      }
      pressed.splice(0, 4);
      return true;
    }
  }
  quadsPressed.push([...quadButtonIDs]);
  return false;
}

//animation jump
function animateButtonJump(button, index) {
  setTimeout(() => {
    button.style.animation = "jump 0.5s";
  }, index * 100);
}

//helpful stuff

function duplicate(arr) {
  arrCopy = [];
  for (i = 0; i < arr.length; i++) {
    arrCopy[i] = arr[i];
  }
  return arrCopy;
}

function removeItem(arr, value) {
  const index = arr.indexOf(value);
  const x = arr.splice(index, 1);
}

function returnopenpairs(list) {
  let openPairs = 0;
  for (p in list) {
    if (p.done == false) {
      openPairs++;
    }
  }
  return openPairs;
}

//creating pairs of buttons

function pairs(winarray, row) {
  newwin = duplicate(winarray);
  let pairA = {
    button1: null,
    button2: null,
    button1ID: null,
    button2ID: null,
    isSame: false,
    done: false,
  };
  let pairB = {
    button1: null,
    button2: null,
    button1ID: null,
    button2ID: null,
    isSame: false,
    done: false,
  };
  let pairC = {
    button1: null,
    button2: null,
    button1ID: null,
    button2ID: null,
    isSame: false,
    done: false,
  };
  let pairD = {
    button1: null,
    button2: null,
    button1ID: null,
    button2ID: null,
    isSame: false,
    done: false,
  };
  let Same = 0;
  pairlist = [pairA, pairB, pairC, pairD];
  pairIDlist = [];

  //creating similar pairs

  const buttonsToReplace = Array.from(
    document.querySelectorAll(`#row${row} .button`)
  );
  let matchingWinButton = "";
  const newreplace = duplicate(buttonsToReplace);
  for (const b of buttonsToReplace) {
    matchingWinButton = newwin.find((w) => b.id === w.id);
    if (matchingWinButton) {
      const availablePair = pairlist.find(
        (pair) => pair.isSame === false && pair.done === false
      );
      if (availablePair) {
        availablePair.button1 = matchingWinButton;
        availablePair.button2 = b;
        availablePair.button1ID = matchingWinButton.id;
        availablePair.button2ID = b.id;
        availablePair.isSame = true;
        availablePair.done = true;
        removeItem(newwin, matchingWinButton);
        removeItem(newreplace, b);
      }
    }
  }

  let openpairs = pairlist.filter((pair) => !pair.isSame).length;

  while (openpairs > 0) {
    const pair = pairlist.find((pair) => !pair.done);
    const numberA = Math.floor(Math.random() * newwin.length);
    const numberB = Math.floor(Math.random() * newreplace.length);
    pair.button1 = newwin[numberA];
    pair.button2 = newreplace[numberB];
    pair.button1ID = pair.button1.id;
    pair.button2ID = pair.button2.id;
    pair.done = true;
    removeItem(newwin, pair.button1);
    removeItem(newreplace, pair.button2);
    openpairs--;
  }
  console.log(pairlist);
  return pairlist;
}

//switch places

function retriveindex(string) {
  const letter = string.charAt(string.length - 1);
  const number = string.charAt(string.length - 2);
  return [parseInt(lettertonumber(letter)), parseInt(number)];
}

function lettertonumber(x) {
  if (x == "a") {
    return 1;
  } else if (x == "b") {
    return 2;
  } else if (x == "c") {
    return 3;
  } else if (x == "d") {
    return 4;
  }
}

function spacebetween(arr1, arr2) {
  letter1 = arr1[0];
  letter2 = arr2[0];
  number1 = arr1[1];
  number2 = arr2[1];
  xspace1 = letter2 - letter1;
  xspace2 = letter1 - letter2;
  yspace1 = number2 - number1;
  yspace2 = number1 - number2;
  return [xspace1, yspace1, xspace2, yspace2];
}

function addanimations(pair) {
  const a = retriveindex(pair.button1ID);
  const b = retriveindex(pair.button2ID);
  const button1div = document.getElementById(`${pair.button1ID}div`);
  const button2div = document.getElementById(`${pair.button2ID}div`);
  const arrspaces = spacebetween(a, b);
  const button1 = document.getElementById(pair.button1ID);
  const button2 = document.getElementById(pair.button2ID);
  button1div.classList.add("AnimateAll");
  button2div.classList.add("AnimateAll");
  button1div.style.animation = "AnimateAll 2s ease 1s";
  button2div.style.animation = "AnimateAll 2s ease 1s";
  button1div.style.setProperty("--x", arrspaces[1]);
  button1div.style.setProperty("--y", arrspaces[0]);
  button2div.style.setProperty("--x", arrspaces[3]);
  button2div.style.setProperty("--y", arrspaces[2]);
}

function switchPlaces(pair) {
  const button1div = document.getElementById(`${pair.button1ID}div`);
  const button2div = document.getElementById(`${pair.button2ID}div`);
  button1div.classList.remove("AnimateAll");
  button2div.classList.remove("AnimateAll");
  button1div.style.animation = "";
  button2div.style.animation = "";
  x = pair.button1.id;
  y = pair.button2.id;
  for (const a of series1buttons) {
    if (a.id == x) a.id = y;
    if (a.id == y) a.id = x;
  }
  for (const a of series2buttons) {
    if (a.id == x) a.id = y;
    if (a.id == y) a.id = x;
  }
  for (const a of series3buttons) {
    if (a.id == x) a.id = y;
    if (a.id == y) a.id = x;
  }
  for (const a of series4buttons) {
    if (a.id == x) a.id = y;
    if (a.id == y) a.id = x;
  }
  pair.button1.id = pair.button2.id;
  pair.button2.id = x;
  pair.button1.style = "";
  pair.button2.style = "";
  const content1 = button1div.innerHTML;
  const content2 = button2div.innerHTML;
  button1div.innerHTML = content2;
  button2div.innerHTML = content1;
}

// Get the modal
var modal = document.getElementById("dictionaryModal");

// Get the button that opens the modal
var btn = document.getElementById("dictionaryBtn");

// Get the <span> element that closes the modal
var closeDictionarySpan = document.getElementById("closeDictionary");

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
var dictionaryModal = document.getElementById("dictionaryModal");

closeDictionarySpan.onclick = function () {
  dictionaryModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function fillDictionaryContent() {
  const dictionaryEntries = {
    "Acceptance": "definition here.",
    "Reflection": "definition here.",
    "Resilience": "definition here.",
    "Growth Mindset": "definition here.",
    "Fidget": "definition here.",
    "Pacing": "definition here.",
    "Rapid Speech": "definition here.",
    "Avoiding Eye Contact": "definition here.",
    "Think Before Posting": "definition here.",
    "Respectful Compliments": "definition here.",
    "Positive Engagement": "definition here.",
    "Authenticity": "definition here.",
    "Active Listening": "definition here.",
    "Kind Words": "definition here.",
    "Non-Judgemental": "definition here.",
    "Validating Feelings": "definition here."
  };

  const dictionaryContentEl = document.getElementById("dictionaryContent");
  dictionaryContentEl.innerHTML = ''; // Clear any existing content

  for (const term in dictionaryEntries) {
    // Create the term element (could be a <p>, <div>, <dt>, etc.)
    const termEl = document.createElement('p');

    // Create a <strong> element to bold the term
    const strong = document.createElement('strong');
    strong.textContent = term + ': ';

    // Create text node for the definition
    const definition = document.createTextNode(dictionaryEntries[term]);

    // Append the strong element and definition text to the term element
    termEl.appendChild(strong);
    termEl.appendChild(definition);

    // Append the term element to the dictionary content
    dictionaryContentEl.appendChild(termEl);
  }
}

// Call this function when the dictionary button is clicked
document.getElementById("dictionaryBtn").addEventListener("click", fillDictionaryContent);

// Get the modal
var instructionsModal = document.getElementById("instructionsModal");

// Get the button that opens the modal
var instructionsBtn = document.getElementById("instructionsBtn");

// Get the <span> element that closes the modal
var closeInstructionsSpan = document.getElementById("closeInstructions");

// When the user clicks the button, open the modal and load the instructions.html content
instructionsBtn.onclick = function () {
  instructionsModal.style.display = "block";
  document.getElementById("instructionsContent").src = "instructions.html";
}

// When the user clicks on <span> (x), close the modal
var instructionsModal = document.getElementById("instructionsModal");

closeInstructionsSpan.onclick = function () {
  instructionsModal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == instructionsModal) {
    instructionsModal.style.display = "none";
  }
}
