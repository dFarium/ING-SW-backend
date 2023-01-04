const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
dotenv.config();

const asistenciaRoutes = require('./routes/asistenciaRoutes');
const asambleaRoutes = require('./routes/asambleaRoutes');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const mailerRoutes = require('./routes/mailerRoutes');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.options('*', cors());

app.use(cookieParser());
app.use('/api', asistenciaRoutes);
app.use('/api', asambleaRoutes);
app.use('/api', userRoutes);
app.use('/api', fileRoutes);
app.use('/api', comentarioRoutes);
app.use('/api', mailerRoutes);


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to database");
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})