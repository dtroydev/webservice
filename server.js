'use strict';

const express = require('express');

const app = express();
const hbs = require('hbs');
const logger = require('./utils/logger');

const maintenance = false;

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('caps', text => text.toUpperCase());

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  logger(maintenance, req);
  next();
});

app.use((req, res, next) => {
  if (maintenance) {
    res.render('maintenance.hbs', {
      headTitle: 'Maintenance Page',
      bodyHeading: 'This is the maintenance page',
      bodyMessage: 'We are working on the website, we\'ll be back...',
    });
  } else {
    next();
  }
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    headTitle: 'Home Page',
    bodyHeading: 'This is the home page',
    bodyMessage: 'Welcome to My Page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    headTitle: 'About Page',
    bodyHeading: 'This is the about page',
    bodyMessage: 'Company was founded a long time ago...',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfil this request',
  });
});

app.use((req, res, next) => {
  res.send('Could not find your page - It\'s 404 Time');
  next();
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
