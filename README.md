# Workout Buddy
App that let's you track your gym progress.

# Details
The app is build with [![My Skills](https://skillicons.dev/icons?i=mongo,express,react,nodejs)](https://skillicons.dev) stack.
## Used libraries
* server-side - `jwt, cors, bcrypt, mongoose, dotenv, express`
* client-side - `react, react-router-dom, date-fns`
# Installation and usage
* git clone
  * `cd backend npm run dev`
  * `cd frontend npm run dev`
# APIs
* Workouts APIs
    * GET: `/api/workouts/` retrieves data for all workouts
    * GET: `/api/workouts/:id` retrieves data for a single workout
    * POST: `/api/workouts` adds a new workout record to the db and automatically loads it in the homepage via context
    * PUT: `/api/workouts/:id` modifies existing record with the given id
    * DELETE: `/api/workouts/:id` deletes existing record with the given id
* User APIs
    * POST: `/api/user/register` adds a new user record to the db
    * POST: `/api/user/login` signs in user after successful authentication
