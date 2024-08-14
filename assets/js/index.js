let teamToggle = document.querySelector(".team-toggle");
let teamNameElement = document.getElementById("team-name");
let team_logo = document.getElementById("team_logo");

let overs = 10;
let extras = 5;
let total = 112;
let wickets = 3;

let players = [];

function showTeam(selectedTeam) {
  if (selectedTeam === "team-a") {
    teamNameElement.textContent = "Team A";
    players = [
      {
        name: "Player 1",
        out: "b McMullen",
        score: 34,
        ball: 10,
        strikeRate: (34 / 10) * 100,
      },
      {
        name: "Player 2",
        out: "c Munsey b Jarvis",
        score: 45,
        ball: 10,
        strikeRate: (45 / 10) * 100,
      },
      {
        name: "Player 3",
        out: "not out",
        score: 10,
        ball: 10,
        strikeRate: (10 / 10) * 100,
      },
      {
        name: "Player 4",
        out: "run out (Berrington/McMullen)",
        score: 23,
        ball: 24,
        strikeRate: (23 / 24) * 100,
      },
      { name: "Player 5" },
      { name: "Player 6" },
      { name: "Player 7" },
      { name: "Player 8" },
      { name: "Player 9" },
      { name: "Player 10" },
      { name: "Player 11" },
    ];
    overs = 10;
    extras = 5;
    total = 112;
    wickets = 3;
    team_logo.setAttribute("src", "./assets/images/quetta-gladitor.png");
    showData();
  } else if (selectedTeam === "team-b") {
    teamNameElement.textContent = "Team B";
    players = [
      {
        name: "Player 1",
        out: "b McMullen",
        score: 34,
        ball: 10,
        strikeRate: (34 / 10) * 100,
      },
      {
        name: "Player 2",
        out: "c Munsey b Jarvis",
        score: 45,
        ball: 10,
        strikeRate: (45 / 10) * 100,
      },
      {
        name: "Player 3",
        out: "not out",
        score: 10,
        ball: 10,
        strikeRate: (10 / 10) * 100,
      },
      {
        name: "Player 4",
        out: "run out (Berrington/McMullen)",
        score: 23,
        ball: 24,
        strikeRate: (23 / 24) * 100,
      },
      {
        name: "Player 5",
        out: "run out (McMullen)",
        score: 23,
        ball: 25,
        strikeRate: (23 / 25) * 100,
      },
      {
        name: "Player 6",
        out: "not out",
        score: 40,
        ball: 10,
        strikeRate: (40 / 10) * 100,
      },
      { name: "Player 7" },
      { name: "Player 8" },
      { name: "Player 9" },
      { name: "Player 10" },
      { name: "Player 11" },
    ];
    overs = 10;
    extras = 15;
    total = 130;
    wickets = 8;
    team_logo.setAttribute("src", "./assets/images/multansultan.png");
    showData();
  }
}

function showData() {
  // Populate players list
  const playersTable = document.getElementById("players");
  playersTable.innerHTML = "";
  players.forEach((player) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.innerText = player.name;
    const outCell = document.createElement("td");
    if (player.out) {
      outCell.innerText = player.out;
    } else {
      outCell.innerText = "";
    }
    const scoreCell = document.createElement("td");
    if (player.score && player.ball) {
      scoreCell.innerText = player.score + "(" + player.ball + ")";
    } else {
      scoreCell.innerText = "";
    }

    const StrikeRateCell = document.createElement("td");
    if (player.strikeRate) {
      if (player.strikeRate % 1 !== 0) {
        StrikeRateCell.innerText = player.strikeRate.toFixed(2);
      } else {
        StrikeRateCell.innerText = player.strikeRate.toFixed(0);
      }
    } else {
      StrikeRateCell.innerText = "";
    }

    row.appendChild(nameCell);
    row.appendChild(outCell);
    row.appendChild(scoreCell);
    row.appendChild(StrikeRateCell);
    playersTable.appendChild(row);
  });

  // Set footer stats
  document.getElementById("overs").innerText = overs;
  document.getElementById("extras").innerText = extras;
  document.getElementById("total").innerText = total;
  document.getElementById("wickets").innerText = wickets;
}

teamToggle.addEventListener("change", function (event) {
  const selectedTeam = event.target.value;
  showTeam(selectedTeam);
});

showTeam("team-a");
