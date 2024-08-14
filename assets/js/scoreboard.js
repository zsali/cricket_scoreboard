document.addEventListener("DOMContentLoaded", function () {
  const team1 = {
    name: "Team 1",
    totalScore: "150/6",
    overs: "20",
    topBat: "Player 1 - 50(30)",
    topBowl: "Player 2 - 3/20",
    wonToss: true,
  };

  const team2 = {
    name: "Team 2",
    totalScore: "145/8",
    overs: "20",
    topBat: "Player 3 - 40(35)",
    topBowl: "Player 4 - 4/25",
    wonToss: false,
  };

  document.getElementById("team1-total").innerText = team1.totalScore;
  document.getElementById("team1-overs").innerText = team1.overs;
  document.getElementById("team1-top-bat").innerText = team1.topBat;
  document.getElementById("team1-top-bowl").innerText = team1.topBowl;
  if (team1.wonToss) {
    document.querySelector(".team:nth-child(1) .toss-winner").style.display =
      "flex";
  } else {
    document.querySelector(".team:nth-child(1) .toss-winner").style.display =
      "none";
  }

  document.getElementById("team2-total").innerText = team2.totalScore;
  document.getElementById("team2-overs").innerText = team2.overs;
  document.getElementById("team2-top-bat").innerText = team2.topBat;
  document.getElementById("team2-top-bowl").innerText = team2.topBowl;
  if (team2.wonToss) {
    document.querySelector(".team:nth-child(2) .toss-winner").style.display =
      "flex";
  } else {
    document.querySelector(".team:nth-child(2) .toss-winner").style.display =
      "none";
  }
});
