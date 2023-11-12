require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/usersRoutes')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    next();
});

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.APP_PORT, () => {
            console.log('Listening on port 4000...')
        });
    }).catch((error) => {
        console.log(error);
    });

