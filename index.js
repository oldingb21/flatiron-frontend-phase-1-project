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


// Callback Functions

const displayActiveTeams = (teams) => {
    teams.forEach(team => {
        //create elemts to display team details
        const listElement = document.createElement('li')
        const teamName = document.createElement('h4');
        teamName.classList = 'team_name'
        teamName.textContent = team.teamName;
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
        teamElements.append(teamVenue, teamCity, firstSeason, teamWebsite);

    })
}