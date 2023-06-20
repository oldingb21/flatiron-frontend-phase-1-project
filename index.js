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
const inactiveBtn = document.querySelector('#inactive_btn')



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
    const teamWebsite = document.createElement('link');
    teamWebsite.href = team.officialSiteUrl;
    teamWebsite.textContent = team.officialSiteUrl;
    listElement.append(teamName, teamElements);
    teamElements.append(teamCity, teamVenue, firstSeason, teamWebsite);
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

const displayActiveTeams = teams => {
    return teams.forEach(team => createActiveTeam(team))
}

const activeTeamFetch = e => {
    fetch('https://statsapi.web.nhl.com/api/v1/teams')
    .then(res => res.json())
    .then(teamsData => {
        // I have to use dot notation in the callback below
        // because there are 2 parent objects in the returned json
        // response. One has a copyright disclaimer and the teams below it.
        //teamsData.teams returns an Array of teams
        return displayActiveTeams(teamsData.teams);
    })
    // remove event listener to prevent the event from populating
    // the DOM with duplicate elements
    activeBtn.removeEventListener('click', activeTeamFetch, true);
}

const createPastTeam = team => {

}

// Events

activeBtn.addEventListener('click', activeTeamFetch, true);
//activeBtn.removeEventListener('click', activeTeamFetch, true);

inactiveBtn.addEventListener('click', e => {
    console.log('inactive btn event also works!')
})