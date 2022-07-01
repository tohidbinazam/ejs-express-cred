const dotenv = require('dotenv')
const express = require('express')
const app = express();
const colors = require('colors');
const mongoDB = require('./config/db');
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');


// Dotenv init
dotenv.config()

// MongoDB connect
mongoDB()

// Body init
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Dotenv variables
app_name = process.env.APP_NAME
server_port = process.env.SERVER_PORT || 5051

// EJS setup
app.set('view engine', 'ejs')
// All ready ejs go into the view folder that's way you don't call again with root file chine for set layout.
// EJS layouts setup
app.set('layout',  'layouts/app.ejs')
app.use(expressEjsLayouts)

// Static folders
app.use('/assets', express.static(path.join(__dirname, './assets')))

// Student route
app.use('/student', require('./routes/studentRoute'))


// Server listen
app.listen(server_port, () => console.log(`${app_name} running on http://localhost:${server_port}`.bgMagenta))