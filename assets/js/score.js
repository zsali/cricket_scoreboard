let batsman1 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
let batsman2 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
let bowler = { name: "", maiden: 0, wickets: 0, overs: 0, balls: 0, runs: 0 };
let total = { runs: 0, wickets: 0, balls: 0, extras: 0 };
let currentBatsman = batsman1;
let ballsThisOver = 0; // Track balls bowled in current over
let newOver = false; // Flag to check if it's a new over

let matchEnd = 0;

let end = false;

const maxOvers = 8;

let batsmanVal;

let selectContainer;

let selectedTeam = document.getElementById("selectedTeamName");

function updateScore(run) {
  if (run === "wide" || run === "no-ball") {
    total.extras += 1;
    total.runs += 1;
    bowler.runs += 1; // Increment bowler runs for wides and no-balls
  } else if (run === "wicket") {
    bowler.wickets += 1;
    total.wickets += 1;
  } else {
    currentBatsman.score += run;
    currentBatsman.balls += 1;
    total.runs += run;
    bowler.runs += run; // Increment bowler runs for normal runs
    if (run === 4) currentBatsman.fours += 1;
    if (run === 6) currentBatsman.sixes += 1;
    // Removed the line that switches the strike on odd runs
  }

  if (run !== "wide" && run !== "no-ball") {
    ballsThisOver += 1;
    bowler.balls += 1;
    total.balls += 1;

    if (ballsThisOver === 6) {
      if (currentBatsman.score === 0) {
        bowler.maiden += 1; // Increment maiden if all balls in the over are dots
      }
      bowler.overs += 1; // Increment overs bowled by the bowler
      ballsThisOver = 0; // Reset balls bowled counter for new over
      switchStrike(); // Ensure the strike is switched at the end of the over
      resetBowlerStats(); // Reset bowler stats for new over
      newOver = true; // Set flag for new over

      // Prompt for bowler change

      alert("Please change the bowler.");
      document.getElementById("bowler_info").value = "";

      checkSelections();
      disableButtons();

      // Check if 8 overs have been bowled
      if (total.balls >= maxOvers * 6) {
        alert("Maximum overs reached. Innings complete.");
        resetAllStats();
        disableButtons();
      }
    } else if (run % 2 === 1) {
      switchStrike(); // Switch strike on odd runs
    }
  }

  updateDisplay();
  if (run === "wicket") {
    handleWicket();
    switchStrike();
  }
  if (newOver) newOver = false; // Reset flag after processing new over
}

function resetAllStats() {
  batsman1 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
  batsman2 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
  bowler = { name: "", maiden: 0, wickets: 0, overs: 0, balls: 0, runs: 0 };
  total = { runs: 0, wickets: 0, balls: 0, extras: 0 };
  currentBatsman = currentBatsman === batsman1 ? batsman2 : batsman1;

  document.getElementById("bowler_info").value = "";
  document.getElementById("first_batsman").value = "";
  document.getElementById("second_batsman").value = "";

  ballsThisOver = 0;
  newOver = false;

  updateDisplay();
  selectAllValue();
  switchStrike();
}

function batsmanValue() {
  if (currentBatsman == batsman1) {
    batsmanVal = $("#first_batsman").val();
  } else {
    batsmanVal = $("#second_batsman").val();
  }
  console.log(batsmanVal);
}

function switchStrike() {
  currentBatsman = currentBatsman === batsman1 ? batsman2 : batsman1;
  document.querySelector("#batsman1-info .form-label").textContent =
    currentBatsman === batsman1 ? "(on strike)" : "";
  document.querySelector("#batsman2-info .form-label").textContent =
    currentBatsman === batsman2 ? "(on strike)" : "";
  batsmanValue();
}

function handleWicket() {
  if (total.wickets < 10) {
    // Logic to handle new batsman selection can be added here
    currentBatsman = currentBatsman === batsman1 ? batsman2 : batsman1;
    currentBatsman.score = 0;
    currentBatsman.balls = 0;
    currentBatsman.fours = 0;
    currentBatsman.sixes = 0;
  } else {
    alert("All out!");
    resetAllStats();
    // Reset or end the game logic can be added here
  }
}

function resetBowlerStats() {
  // Reset bowler's balls count for a new over
  bowler.balls = 0;
}

function updateDisplay() {
  document.getElementById("total_score").textContent = total.runs;
  document.getElementById("wicket").textContent = total.wickets;
  document.getElementById("overShow").textContent =
    Math.floor(total.balls / 6) + "." + (total.balls % 6);
  document.getElementById("currentRunRate").textContent = (
    total.runs /
    (total.balls / 6)
  ).toFixed(2);

  document.getElementById("batsman1-score").textContent = batsman1.score;
  document.getElementById("batsman1-balls").textContent = batsman1.balls;
  document.getElementById("batsman1-4s").textContent = batsman1.fours;
  document.getElementById("batsman1-6s").textContent = batsman1.sixes;
  document.getElementById("batsman1-sr").textContent = (
    batsman1.balls > 0 ? (batsman1.score / batsman1.balls) * 100 : 0
  ).toFixed(2);

  document.getElementById("batsman2-score").textContent = batsman2.score;
  document.getElementById("batsman2-balls").textContent = batsman2.balls;
  document.getElementById("batsman2-4s").textContent = batsman2.fours;
  document.getElementById("batsman2-6s").textContent = batsman2.sixes;
  document.getElementById("batsman2-sr").textContent = (
    batsman2.balls > 0 ? (batsman2.score / batsman2.balls) * 100 : 0
  ).toFixed(2);

  document.getElementById("bowler-overs").textContent = bowler.overs;
  document.getElementById("bowler-maiden").textContent = bowler.maiden; // Update maiden overs
  document.getElementById("bowler-runs").textContent = bowler.runs; // Update runs conceded
  document.getElementById("bowler-wickets").textContent = bowler.wickets;
  document.getElementById("extras").textContent = total.extras;
}

function sendUpdateToBackend() {
  fetch("/api/update-score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      batsman1,
      batsman2,
      bowler,
      total,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

function checkSelections() {
  const firstBatsman = document.getElementById("first_batsman").value;
  const secondBatsman = document.getElementById("second_batsman").value;
  const bowlerInfo = document.getElementById("bowler_info").value;
  batsmanSelect = document.getElementById("teamSelect").value;
  selectedTeam.innerText = transformString(batsmanSelect) + ":";

  const secondBatsmanOptions =
    document.getElementById("second_batsman").options;
  for (let i = 0; i < secondBatsmanOptions.length; i++) {
    if (secondBatsmanOptions[i].value === firstBatsman) {
      secondBatsmanOptions[i].disabled = true;
    } else {
      secondBatsmanOptions[i].disabled = false;
    }
  }

  const buttons = document.querySelectorAll("button.btn-primary");
  if (firstBatsman && secondBatsman && bowlerInfo) {
    buttons.forEach((button) => (button.disabled = false));
  } else {
    buttons.forEach((button) => (button.disabled = true));
  }
}

function disableButtons() {
  const buttons = document.querySelectorAll("button.btn-primary");
  buttons.forEach((button) => (button.disabled = true));
}

function selectAllValue() {
  if (matchEnd < 1) {
    var selectElement = document.getElementById("teamSelect");
    var allValues = "";

    for (var i = 0; i < selectElement.options.length; i++) {
      var optionValue = selectElement.options[i].value;

      if (optionValue !== batsmanSelect) {
        allValues = optionValue;
      }
    }

    selectElement.value = allValues;
    selectedTeam.innerText = transformString(allValues) + ":";
    matchEnd += 1;
    if (matchEnd == 1) {
      let targettoChase = document.getElementById("targetToChase");
      targettoChase.style.display = "block";
    }
  } else {
    $("#matchEnd").modal("show");
  }
}

function matchIsEnd() {
  $("#matchEnd").modal("show");
}

// Initialize select elements
document
  .getElementById("first_batsman")
  .addEventListener("change", function () {
    batsman1.name = this.value;
    checkSelections();
    updateDisplay();
    batsmanValue();
  });

document
  .getElementById("second_batsman")
  .addEventListener("change", function () {
    batsman2.name = this.value;
    checkSelections();
    updateDisplay();
    batsmanValue();
  });

document.getElementById("bowler_info").addEventListener("change", function () {
  bowler.name = this.value;
  checkSelections();
  updateDisplay();
  batsmanValue();
});

// Initial display update
updateDisplay();
checkSelections();
batsmanValue();

function transformString(str) {
  let stringWithSpaces = str.replace(/_/g, " ");

  let words = stringWithSpaces.split(" ");

  let transformedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  let transformedString = transformedWords.join(" ");

  return transformedString;
}

function addWideExtra(extraRuns, option) {
  selectContainer = document.getElementById("selectContainer");
  total.extras += extraRuns;
  total.runs += extraRuns;
  bowler.runs += extraRuns; // Increment bowler runs for wide extras

  if (option == "wickets") {
    // bowler.wickets += 1;
    total.wickets += 1;

    selectContainer.style.display = "block";
    populateWideWicketModal();
  } else {
    $("#wideModal").modal("hide");
    selectContainer.style.display = "none";
    updateDisplay();
  }
}

function populateWideWicketModal() {
  const batsmanOutSelect = document.getElementById("wideBatsmanOut");
  batsmanOutSelect.innerHTML = "";

  const option1 = document.createElement("option");
  option1.value = "batsman1";
  option1.textContent = batsman1.name || "Batsman 1";
  batsmanOutSelect.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = "batsman2";
  option2.textContent = batsman2.name || "Batsman 2";
  batsmanOutSelect.appendChild(option2);
}

function confirmWideWicket() {
  const batsmanOut = document.getElementById("wideBatsmanOut").value;

  if (batsmanOut === "batsman1") {
    batsman1 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
    document.getElementById("first_batsman").value = "";
  } else {
    batsman2 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
    document.getElementById("second_batsman").value = "";
  }

  disableButtons();

  selectContainer.style.display = "none";
  $("#wideModal").modal("hide");
  updateDisplay();
  // if (total.wickets > 1) {
  //   alert("All out!");
  //   resetAllStats();
  // }
  handleWicket();
  switchStrike();
}
let selectNoBallContainer = document.getElementById("selectNoBallContainer");
function addNoBallExtra(extraRuns, options) {
  currentBatsman.score += extraRuns;
  // currentBatsman.balls += 1; // Increment balls faced by the batsman for no-ball
  total.runs += extraRuns + 1; // Increment total runs by the runs scored plus the no-ball extra
  total.extras += 1; // Increment extras for the no-ball
  bowler.runs += extraRuns + 1; // Increment bowler runs for no-ball extras

  if (options == "wicket") {
    total.wickets += 1;
    selectNoBallContainer.style.display = "block";
    populateNoBallWicketModal();
  } else {
    // Close the modal
    $("#noBallModal").modal("hide");
    selectNoBallContainer.style.display = "none";
    updateDisplay();
  }
}

function populateNoBallWicketModal() {
  const batsmanOutSelect = document.getElementById("noBallBatsmanOut");
  batsmanOutSelect.innerHTML = "";

  const option1 = document.createElement("option");
  option1.value = "batsman1";
  option1.textContent = batsman1.name || "Batsman 1";
  batsmanOutSelect.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = "batsman2";
  option2.textContent = batsman2.name || "Batsman 2";
  batsmanOutSelect.appendChild(option2);
}

function confirmNoBallWicket() {
  const batsmanOut = document.getElementById("noBallBatsmanOut").value;

  if (batsmanOut === "batsman1") {
    batsman1 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
    document.getElementById("first_batsman").value = "";
  } else {
    batsman2 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
    document.getElementById("second_batsman").value = "";
  }

  disableButtons();

  selectNoBallContainer.style.display = "none";
  $("#noBallModal").modal("hide");
  updateDisplay();
  handleWicket();
  switchStrike();
}

function reset() {
  window.location.href = "index.html";
}

function displayWicket() {
  populateWicketModal();
  $("#wicketModal").modal("show");
}

function populateWicketModal() {
  const batsmanOutSelect = document.getElementById("batsmanOut");
  batsmanOutSelect.innerHTML = "";

  const option1 = document.createElement("option");
  option1.value = "batsman1";
  option1.textContent = batsman1.name || "Batsman 1";
  batsmanOutSelect.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = "batsman2";
  option2.textContent = batsman2.name || "Batsman 2";
  batsmanOutSelect.appendChild(option2);
}

function confirmWicket() {
  const wicketType = document.getElementById("wicketType").value;
  const batsmanOut = document.getElementById("batsmanOut").value;
  // bowler.wickets += 1;
  // total.wickets += 1;

  updateScore("wicket");

  if (batsmanOut === "batsman1") {
    batsman1 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
    document.getElementById("first_batsman").value = "";
  } else {
    batsman2 = { name: "", score: 0, balls: 0, fours: 0, sixes: 0 };
    document.getElementById("second_batsman").value = "";
  }

  // currentBatsman = currentBatsman === batsman1 ? batsman2 : batsman1;
  switchStrike();

  disableButtons();
  // updateDisplay();

  $("#wicketModal").modal("hide");
}

document.getElementById("wicketType").addEventListener("change", function () {
  var wicketType = this.value;
  var caughtDetails = document.getElementById("caughtDetails");
  var RunDetails = document.getElementById("RunDetails");

  if (wicketType === "caught") {
    caughtDetails.style.display = "block";
  } else {
    caughtDetails.style.display = "none";
  }

  if (wicketType === "runout") {
    RunDetails.style.display = "block";
  } else {
    RunDetails.style.display = "none";
  }
});

// don't refresh the page
// window.addEventListener("beforeunload", function (e) {
//   // Cancel the event
//   e.preventDefault();
//   // Chrome requires returnValue to be set
//   e.returnValue = "";
// });
