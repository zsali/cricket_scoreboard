const teams = [
  { name: "Prime1 Thunder Strikers", matchesPlayed: 3, wins: 3, losses: 0 },
  { name: "Prime2 Power Hitters", matchesPlayed: 3, wins: 2, losses: 1 },
  { name: "Prime3 Royal Warriors", matchesPlayed: 3, wins: 1, losses: 2 },
  { name: "Mindstorm Gladiators", matchesPlayed: 3, wins: 0, losses: 3 },
];

teams.forEach((team) => {
  team.points = team.wins * 2;
  team.netRunRate = calculateNetRunRate(team.wins, team.losses);
});

const tableBody = document.getElementById("points-table-body");
teams.forEach((team, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
            <td>${index + 1}</td>
            <td class="text-primary fw-bold">${team.name}</td>
            <td>${team.matchesPlayed}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.points}</td>
            <td>${team.netRunRate.toFixed(2)}</td>
        `;
  tableBody.appendChild(row);
});

function calculateNetRunRate(wins, losses) {
  // Simple NRR calculation based on wins and losses
  const baseRunRate = 1.5;
  return (wins - losses) * baseRunRate;
}
