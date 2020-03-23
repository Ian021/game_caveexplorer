
/* ------------------------------------- VARIABLES -------------------------------------*/

const PORT = process.env.PORT || 3000;
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL

/* ------------------------------------- LIBS -------------------------------------*/
const mongoose        = require('mongoose');
const express         = require('express'),
      hbs             = require('express-handlebars'),
      bodyParser      = require('body-parser');

/* ------------------------------------- LOCAL FILES -------------------------------------*/
const mainRoutes      = require('./routes'),

/* ------------------------------------- EXPRESS -------------------------------------*/
app = express()
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* ------------------------------------- HANDLEBARS -------------------------------------*/
app.engine('hbs',hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');

/* ------------------------------------- MONGOOSE -------------------------------------*/
mongoose.connect(DB_CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

/* ------------------------------------- ROUTES -------------------------------------*/
app.use(mainRoutes);

/* ------------------------------------- LISTEN -------------------------------------*/

app.listen(PORT, () => console.log(`App Listening on ${ PORT }`));