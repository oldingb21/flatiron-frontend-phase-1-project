// Important Variables

const eastern = document.querySelector('#eastern');
const western = document.querySelector('#western');
const atlantic = document.querySelector('#atlantic_list');
const metro = document.querySelector('#metropolitan_list');
const central = document.querySelector('#central_list');
const pacific = document.querySelector('#pacific_list');
const pastTeams = document.querySelector('#past_list');
const current = document.querySelector('#current')
const past = document.querySelector('#past')
const divisions = document.querySelectorAll('.division');
const activeBtn = document.querySelector('#active_btn');
const inactiveBtn = document.querySelector('#inactive_btn');
const commentForm = document.querySelector('#comment_form');
const favTeamSelect = document.querySelector('#fav_team_select');



// Callback Functions

// I have to create multiple callbacks to do similar things, because
// I have to use 2 APIs in order to get all the data I want, and the paths
// are not the same in each API

const createActiveTeam = team => {
    //create elements to display team details
    const listElement = document.createElement('li')
    
    const teamName = document.createElement('h4');
    teamName.classList = 'team_name'
    teamName.textContent = team.name;
    
    const teamElements = document.createElement('ul');
    
    const teamVenue = document.createElement('li');
    teamVenue.textContent = `Venue: ${team.venue.name}`;
    
    const teamCity = document.createElement('li');
    teamCity.textContent = `City: ${team.venue.city}`;
    
    const firstSeason = document.createElement('li');
    firstSeason.textContent = `First Season: ${team.firstYearOfPlay}`;
    
    const teamWebsite = document.createElement('a');
    teamWebsite.href = team.officialSiteUrl;
    teamWebsite.textContent = team.officialSiteUrl;
    
    listElement.append(teamName, teamElements);
    teamElements.append(teamCity, teamVenue, firstSeason, teamWebsite);
    
    //I want to split this switch into a spearate function
    
    switch (team.division.name) {
        case 'Atlantic': 
            atlantic.append(listElement);
            break;
        case 'Metropolitan':
            metro.append(listElement);
            break;
        case 'Central':
            central.append(listElement);
            break;
        case 'Pacific':
            pacific.append(listElement);
    }
}

const loopAndDisplayActiveTeams = teams => {
    teams.forEach(team => createActiveTeam(team))
}

const activeTeamFetch = e => {
    fetch('https://statsapi.web.nhl.com/api/v1/teams')
    .then(res => res.json())
    .then(teamsData => {
        // I have to use dot notation in the callback below
        // because there are 2 parent arrays in the returned json
        // response. One has a copyright disclaimer and the teams below it.
        //teamsData.teams returns an Array of teams
        loopAndDisplayActiveTeams(teamsData.teams);
    })
    // remove event listener to prevent the event from populating
    // the DOM with duplicate elements
    activeBtn.removeEventListener('click', activeTeamFetch, true);
}

//I am using a separate API to get the data for former teams,
//so I have to create a new function to handle creating these elements.
//The paths are different in this API.

const createInactiveTeam = team => {
    //I am only fetching inactive teams here, so this if statement should separate
    //inactive teams from active teams.
    if (team.lastSeasonId !== 'null') {
        const listElement = document.createElement('li');
        const teamName = document.createElement('h4');
        teamName.textContent = team.fullName;
        const teamElements = document.createElement('ul');
        const teamCity = document.createElement('li');
        teamCity.textContent = team.teamPlaceName;
        const firstSeasonString = team.firstSeasonId.toString() 
        const firstSeason = document.createElement('li');
        firstSeason.textContent = `First Season: ${firstSeasonString.substring(0,3)}-${firstSeasonString.substring(4,7)}`;
        const lastSeasonString = team.lastSeasonId.toString();
        const lastSeason = document.createElement('li');
        lastSeason.textContent = `Last Season: ${lastSeasonString.substring(0,3)}-${lastSeasonString.substring(4,7)}`;
        listElement.append(teamName, teamElements);
        teamElements.append(teamCity, firstSeason, lastSeason);
    }
}

const displayInactiveTeams = teams => teams.forEach(team => createInactiveTeam(team));

const inactiveTeamFetch = e => {
    fetch('https://records.nhl.com/site/api/franchise', {mode: "no-cors"})
    .then(res => console.log(res))
    .then(teamsData => {
        //similarly to the other fetch, the data we need is nested inside a parent
        //array (data), so we need dot notation to access that array.
        displayInactiveTeams(teamsData.data);
    })
    inactiveBtn.removeEventListener('click', inactiveTeamFetch, true);
}

//callbacks to fill my select element with options

const createActiveTeamOptions = team => {
    const teamOption = document.createElement('option');
    teamOption.textContent = team.name;
    favTeamSelect.appendChild(teamOption);
}

const loopAndDisplayActiveTeamOptions = teams => teams.forEach(team => createActiveTeamOptions(team));


// Events

activeBtn.addEventListener('click', activeTeamFetch, true);

//I have to write some backend code to get this fetch to work below

//inactiveBtn.addEventListener('click', inactiveTeamFetch, true);

//commentForm.addEventListener('submit',)