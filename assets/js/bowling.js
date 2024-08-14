let bowlers = [];
let overs = 0;
let extras = 0;
let total = 0;
let wickets = 0;

let teamToggle = document.querySelector(".team-toggle");
let teamNameElement = document.getElementById("team-name");
let team_logo = document.getElementById("team_logo");

function showTeam(selectedTeam) {
  if (selectedTeam === "team-a") {
    teamNameElement.textContent = "Team A";
    bowlers = [
      { name: "Bowler 1", overs: 2, maidens: 1, runs: 20, wickets: 2 },
      { name: "Bowler 2", overs: 2, maidens: 0, runs: 30, wickets: 1 },
      { name: "Bowler 3", overs: 2, maidens: 0, runs: 15, wickets: 0 },
      { name: "Bowler 4", overs: 2, maidens: 0, runs: 15, wickets: 0 },
      { name: "Bowler 5", overs: 2, maidens: 0, runs: 15, wickets: 0 },
    ];
    overs = 10;
    extras = 5;
    total = 112;
    wickets = 3;
    team_logo.setAttribute("src", "./assets/images/quetta-gladitor.png");
    showData();
  } else if (selectedTeam === "team-b") {
    teamNameElement.textContent = "Team B";
    bowlers = [
      { name: "Bowler 1", overs: 2, maidens: 1, runs: 20, wickets: 2 },
      { name: "Bowler 2", overs: 2, maidens: 0, runs: 30, wickets: 1 },
      { name: "Bowler 3", overs: 2, maidens: 0, runs: 15, wickets: 0 },
      { name: "Bowler 4", overs: 2, maidens: 0, runs: 15, wickets: 0 },
    ];
    overs = 10;
    extras = 15;
    total = 130;
    wickets = 8;
    team_logo.setAttribute("src", "./assets/images/multansultan.png");
    showData();
  }
}

teamToggle.addEventListener("change", function (event) {
  const selectedTeam = event.target.value;
  showTeam(selectedTeam);
});

function showData() {
  const bowlersTable = document.getElementById("bowlers");
  bowlersTable.innerHTML = "";
  bowlers.forEach((bowler) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.innerText = bowler.name;
    const oversCell = document.createElement("td");
    oversCell.innerText = bowler.overs;
    oversCell.classList.add("text-right");
    const maidensCell = document.createElement("td");
    maidensCell.innerText = bowler.maidens;
    maidensCell.classList.add("text-right");
    const runsCell = document.createElement("td");
    runsCell.innerText = bowler.runs;
    runsCell.classList.add("text-right");
    const wicketsCell = document.createElement("td");
    wicketsCell.innerText = bowler.wickets;
    wicketsCell.classList.add("text-right");
    row.appendChild(nameCell);
    row.appendChild(oversCell);
    row.appendChild(maidensCell);
    row.appendChild(runsCell);
    row.appendChild(wicketsCell);
    bowlersTable.appendChild(row);
  });

  // Set footer stats
  document.getElementById("overs").innerText = overs;
  document.getElementById("extras").innerText = extras;
  document.getElementById("total").innerText = total;
  document.getElementById("wickets").innerText = wickets;
}

showTeam("team-a");
