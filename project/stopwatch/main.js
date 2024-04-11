//* Constants
//startBtn, stopBtn and resetBtn are buttons used to control the stopwatch.
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

// textMessage, stopwatch, title and textFooter are elements where dynamic content will be displayed.
const textMessage = document.getElementById("textMessage");
const stopwatch = document.getElementById("stopwatch"); 
const title = document.getElementById("title");
const textFooter = document.getElementById("textFooter");

// messages related to JavaScript and the program.
const messages = {
  message1: "<span>JavaScript</span> es un lenguaje de programación versátil.",
  message2: "Cuando una página web hace algo más que mostrar información estática, <span>JavaScript</span> entra en juego.",
  message3: "<span>JavaScript</span> permite actualizaciones de contenido oportunas, mapas interactivos, animaciones gráficas 2D/3D y mucho más.",
  message4: "Fin del programa. Estoy cansado! 😩",
  message5: "¡Sigue mis redes sociales! <br> ►  #LuisF3_JS 👽",
  stop: "Parar",
  reset: "Reiniciar"
};  

// color codes (hexadecimal values) for different user interface (UI) elements.  
const colors = {
  orange: "#f97316",
  purple: "#a855f7",
  green: "#22c55e",
  pink: "#ec4899",
  blue: "#06b6d4",
  red: "#ef4444",
  yellow: "#eab308"
};

//* Variables
// milliseconds, seconds, minutes and hours represent the time components of the stopwatch.
// timer is a derived value (total time in tenths of a second).
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = 0;

// runIt is a boolean flag that indicates whether the stopwatch is running.
// timeKeeper keeps track of the total elapsed time.
// intervalId stores the ID of the interval used to update the stopwatch.
let runIt = false;
let timeKeeper = 0;
let intervalId = null;

// Associate click events to the `startBtn`, `stopBtn` and `resetBtn` buttons with the corresponding functions.
const initializeApp = () => {
  startBtn.addEventListener("click", startStopwatch);
  stopBtn.addEventListener("click", stopStopwatch);
  resetBtn.addEventListener("click", resetStopwatch);
};


// Starts an interval that calls the `updateStopwatch` function every 10 milliseconds.
const startStopwatch = () => {
  runIt = true; 
  dynamicUI(colors.orange, messages.message5); 
  intervalId = setInterval(updateStopwatch, 10); 
};

//  This function is executed when the "Stop" button is clicked.
const stopStopwatch = () => {
  runIt = false; 
  clearInterval(intervalId); 
  dynamicUI(colors.red, messages.stop); 
};

// This function is activated when the "Reset" button is clicked.
const resetStopwatch = () => {
  timeKeeper = 0; 
  updateStopwatchDisplay();
  dynamicUI(colors.blue, messages.reset);
};

// This function updates the stopwatch display by calling `updateStopwatchDisplay()`.
const updateStopwatch = () => {
  if (runIt) {
    timeKeeper += 1;
    updateStopwatchDisplay();
  }
};

// Calculates hours, minutes, seconds, and milliseconds from `timeKeeper`.
const updateStopwatchDisplay = () => {
  milliseconds = timeKeeper % 100;
  timer = Math.floor((timeKeeper - milliseconds) / 100);
  seconds = timer % 60;
  minutes = Math.floor((timer / 60) % 60);
  hours = Math.floor(timer / 60 / 60);
  fillStopwatch();
};

// Creates a formatted time string and displays it in the HTML element with the id `stopwatch`.
const fillStopwatch = () => {
  const displayTime = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)} : ${pad(milliseconds, true)}`;
  stopwatch.innerText = displayTime;
  setColor();
};

// This function is used to add zeros to time values so that they always have two digits.
const pad = (value, isMilliseconds = false) => {
  if (isMilliseconds) {
    return value < 100 ? (value < 10 ? `0${value}` : `${value}`) : value;
  }
  return value < 10 ? `0${value}` : value;
};

// Based on the seconds value, it changes the interface color by calling `dynamicUI` with different colors and messages.
const setColor = () => {
  if (seconds == 0) dynamicUI(colors.orange, messages.message5);
  else if (seconds == 1) dynamicUI(colors.yellow, messages.message1);
  else if (seconds == 15) dynamicUI(colors.purple, messages.message2);
  else if (seconds == 30) dynamicUI(colors.green, messages.message3);
  else if (seconds == 45) dynamicUI(colors.pink, messages.message5);
  else if (hours === 48) stopStopwatch();
};

// This function is responsible for dynamically updating user interface (UI) elements.
const dynamicUI = (color, msg) => {
  title.style.color = color;
  stopwatch.style.color = color;
  textFooter.style.color = color;
  textMessage.style.color = color;
  startBtn.style.backgroundColor = color;
  stopBtn.style.backgroundColor = color;
  resetBtn.style.backgroundColor = color;
  fillMessage(msg);
};

// This function is used to fill the content of the message.
const fillMessage = (msg) => {
  textMessage.innerHTML = `${msg}`;
};

// Function to Execute: When the load event occurs, the initializeApp function will be executed.
window.addEventListener(`load`, initializeApp, false);
