const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const comicRoutes = require('./routes/comics');
const cors = require('cors'); 
const app = express();
app.use(morgan("dev"));
app.use(cors({
    origin: '*', // Permite todas las peticiones; ajusta según sea necesario
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
  }));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/comics', comicRoutes);

module.exports = app;
