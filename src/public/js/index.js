function changeBannerColor (el) {
    document.documentElement.style.setProperty('--banner-color', el.value);
}

function changeBorderColor (el) {
    document.documentElement.style.setProperty('--border-color', el.value);
}

function changeImage(event) {
   var image = document.getElementById('placeholder-img');
   image.src = URL.createObjectURL(event.target.files[0]);
}

function changeText() {
    let placeholderName = document.getElementById("img-banner");
    let athleteName = document.getElementById("athlete-name");
    let athleteName2 = document.getElementById("athlete-name-2");

    placeholderName.innerHTML = athleteName.value;
    athleteName2.innerHTML = athleteName.value;
}

function changeTextColor (el) {
    document.documentElement.style.setProperty('--banner-text-color', el.value);
}

function setMascotImage(select) {
    var image = document.getElementsByName("mascot-img") [0];
    image.src = select.options[select.selectedIndex].value;
}

function submitStats() {

    let year = Number(document.getElementById("year").value);
    let games = Number(document.getElementById("games").value);
    let atBats = Number(document.getElementById("at-bats").value);
    let runs = Number(document.getElementById("runs").value);
    let hits = Number(document.getElementById("hits").value);
    let bb = Number(document.getElementById("bb").value);
    let singles = Number(document.getElementById("singles").value);
    let doubles = Number(document.getElementById("2b").value);
    let triples = Number(document.getElementById("3b").value);
    let hr = Number(document.getElementById("hr").value);
    let rbi = Number(document.getElementById("rbi").value);
    let strikeouts = Number(document.getElementById("so").value);
    let stolenBases = Number(document.getElementById("sb").value);

    let averageText = (hits / atBats).toFixed(3);
    let obpText= ((hits + bb)/(atBats + bb)).toFixed(3);
    let slgText = ((singles + (doubles * 2) + (triples * 3) + (hr * 4)) / (atBats)).toFixed(3);

    //creates new row on stats table on back of card
    let table = document.getElementById("stats-tbody");

    let row = document.createElement("tr");

    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    let c3 = document.createElement("td");
    let c4 = document.createElement("td");
    let c5 = document.createElement("td");
    let c6 = document.createElement("td");
    let c7 = document.createElement("td");
    let c8 = document.createElement("td");
    let c9 = document.createElement("td");
    let c10 = document.createElement("td");
    let c11 = document.createElement("td");
    let c12 = document.createElement("td");
    let c13 = document.createElement("td");
    let c14 = document.createElement("td");
    let c15 = document.createElement("td");

    c1.innerText = year;
    c2.innerText = games;
    c3.innerText = atBats;
    c4.innerText = runs;
    c5.innerText = hits;
    c6.innerText = doubles;
    c7.innerText = triples;
    c8.innerText = hr;
    c9.innerText = rbi;
    c10.innerText = bb;
    c11.innerText = strikeouts;
    c12.innerText = stolenBases;
    c13.innerText = averageText;
    c14.innerText = obpText;
    c15.innerText = slgText;

    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);
    row.appendChild(c6);
    row.appendChild(c7);
    row.appendChild(c8);
    row.appendChild(c9);
    row.appendChild(c10);
    row.appendChild(c11);
    row.appendChild(c12);
    row.appendChild(c13);
    row.appendChild(c14);
    row.appendChild(c15);

    table.appendChild(row);
}

function renderStats(data) {

    let year = data.id
    let games = data.games
    let atBats = data.atBats
    let runs = data.runs
    let hits = data.hits
    let bb =  data.bb
    let singles = data.singles
    let doubles = data.doubles
    let triples = data.triples
    let hr = data.hr
    let rbi = data.rbi
    let strikeouts = data.so
    let stolenBases = data.sb

    let averageText = (hits / atBats).toFixed(3);
    let obpText= ((hits + bb)/(atBats + bb)).toFixed(3);
    let slgText = ((singles + (doubles * 2) + (triples * 3) + (hr * 4)) / (atBats)).toFixed(3);

    //creates new row on stats table on back of card
    let table = document.getElementById("stats-tbody");

    let row = document.createElement("tr");

    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    let c3 = document.createElement("td");
    let c4 = document.createElement("td");
    let c5 = document.createElement("td");
    let c6 = document.createElement("td");
    let c7 = document.createElement("td");
    let c8 = document.createElement("td");
    let c9 = document.createElement("td");
    let c10 = document.createElement("td");
    let c11 = document.createElement("td");
    let c12 = document.createElement("td");
    let c13 = document.createElement("td");
    let c14 = document.createElement("td");
    let c15 = document.createElement("td");

    c1.innerText = year;
    c2.innerText = games;
    c3.innerText = atBats;
    c4.innerText = runs;
    c5.innerText = hits;
    c6.innerText = doubles;
    c7.innerText = triples;
    c8.innerText = hr;
    c9.innerText = rbi;
    c10.innerText = bb;
    c11.innerText = strikeouts;
    c12.innerText = stolenBases;
    c13.innerText = averageText;
    c14.innerText = obpText;
    c15.innerText = slgText;

    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);
    row.appendChild(c6);
    row.appendChild(c7);
    row.appendChild(c8);
    row.appendChild(c9);
    row.appendChild(c10);
    row.appendChild(c11);
    row.appendChild(c12);
    row.appendChild(c13);
    row.appendChild(c14);
    row.appendChild(c15);

    table.appendChild(row);
}

function deleteRow() {
    document.getElementById('stats-tbody').deleteRow(0)
}

function clearForm() {
    document.getElementById("stats").reset();
    document.getElementById("fromDB-form").reset();
}

function submitTeam() {
    let placeholderName = document.getElementById("team-name-text");
    let teamName = document.getElementById("team-name");

    placeholderName.innerHTML = teamName.value;
}

function submitDescription() {
    let placeholderDescription = document.getElementById("player-description-display");
    let description = document.getElementById("player-description");

    placeholderDescription.innerHTML = description.value;
}

function changeBackgroundColor (el) {
    document.documentElement.style.setProperty('--back-background-color', el.value);
}

function changeBackTextColor (el) {
    document.documentElement.style.setProperty('--back-text-color', el.value);
}

function changeBackBorderColor (el) {
    document.documentElement.style.setProperty('--back-border-color', el.value);
}

const form = document.querySelector('#fromDB-form');
const tableBody = document.querySelector('#stats-tbody');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevents the form from submitting normally

  const year = document.querySelector('#findYear').value;

  try {
    const response = await fetch(`/get-stats/${year}`);
    const stats = await response.json();

    renderStats(stats);

  } catch (error) {
    console.error(error);
    alert('Something went wrong. Enter another year and try again.')
  }
});
