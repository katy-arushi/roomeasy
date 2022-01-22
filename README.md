# RoomEasy 🏠
**RoomEasy** is a app made for making roommate matches for college dorms. 

By filling out profile surveys and quizzes to assess personality and lifestyle, students will match with potential roommates and minimize conflict before it begins.

RoomEasy was made as part of [McHacks 9](https://www.mchacks.ca/) and built in 36 hours by [Arushi Katyal](https://github.com/katy-arushi), [Priscilia Momo](https://github.com/pripri99), [Jarvis He](https://github.com/Ilikedietpepsi), and [Ravish Mahajan](https://github.com/ravishmahajan08).

## Getting Started
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
     - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm start`
     - Note: nodemon is used, so you should not have to restart your server
6. Visit `http://localhost:3001/`

## Dependencies
- Node 10.x or above
- NPM 5.x or above
