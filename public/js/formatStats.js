function formatStats(sentStats) {
    var formattedStats = {
      id: sentStats._id,
      email: sentStats.email,
      games: parseInt(sentStats.games),
      atBats: parseInt(sentStats.atBats),
      runs: parseInt(sentStats.runs),
      hits: parseInt(sentStats.hits),
      singles: parseInt(sentStats.singles),
      doubles: parseInt(sentStats.doubles),
      triples: parseInt(sentStats.triples),
      hr: parseInt(sentStats.hr),
      rbi: parseInt(sentStats.rbi),
      bb: parseInt(sentStats.bb),
      so: parseInt(sentStats.so),
      sb: parseInt(sentStats.sb),
      createdAt: new Date(sentStats.createdAt),
      updatedAt: new Date(sentStats.updatedAt),
    };
    return formattedStats;
  }
  
  async function fetchData () {
    fetch('/get-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ findYear: document.getElementById('findYear') })
      })
      .then(response => { 
        if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch stats');
      }})
      .then(data => {
        const tableBody = document.querySelector('#stats-table');
  
      tableBody.innerHTML = '';
  
      for (const [statistic, value] of Object.entries(formattedStats)) {
        const row = document.createElement('tr');
        const statisticCell = document.createElement('td');
        const valueCell = document.createElement('td');
  
        statisticCell.textContent = statistic;
        valueCell.textContent = value;
  
        row.appendChild(statisticCell);
        row.appendChild(valueCell);
        tableBody.appendChild(row);
      }

        console.log(data.sentStats);
        var stats = data.sentStats;
        var formattedStats = formatStats(stats); 
        
        console.log(formattedStats);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

  module.exports = { formatStats, fetchData };