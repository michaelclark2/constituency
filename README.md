# Constituency

## Description
Users can register an account to view the most recent bills on the congress floor.  The user can vote and comment on individual bills, as well as view more info on the bill and the congressman that sponsors it.  The user can compare their votes with the members that represent their congressional district, as well as see official statements on bills from said officials.  This project was created to reduce lobbyist influence and increase voter turnout so that members of congress can represent their constituents' interest.

Created as a Front-end Capstone project while attending Nashville Software School.

[View deployed site](https://my-project-1513728693887.firebaseapp.com)

## Features
- View bills on congress floor
- Vote on bills
- Comment on bills
- View most popular bills
- View congress' votes on bills and compare them to your own
- View the top contributors to a representative's campaign
- Representatives can make accounts, and leave official statements on bills


## View and Vote on Bills

![Vote](https://raw.githubusercontent.com/michaelclark2/constituency/master/screens/vote.gif)

## Change Votes and View Bill Info

![Bills](https://raw.githubusercontent.com/michaelclark2/constituency/master/screens/viewbill.gif)

## View Representative Info

![Reps](https://raw.githubusercontent.com/michaelclark2/constituency/master/screens/viewrep.gif)

## Future Features
- Account page
- View all your representatives and polling location
- Include Local government data and representatives
- Comment upvotes
- View upcoming elections

#### Technologies
- React.js
- Firebase (Authentication, Database, Hosting)
- amCharts
- Bootstrap 3.3
- APIs
  - [ProPublica Congress API](https://www.propublica.org/datastore/api/propublica-congress-api) for bill information
  - [Google Civic Info API](https://developers.google.com/civic-information/) to determine user's congressional district
  - [OpenSecrets.org API](https://www.opensecrets.org) for representatives' info

## How to Run
1. Clone repo
1. Obtain API keys from links above
1. Rename `src/constants.example.js` to `src/constants.js`
1. Add keys to `src/constants.js`
1. Run `npm install` to install dependencies
1. Run `npm start` to host locally
1. Run `npm run deploy` to deploy