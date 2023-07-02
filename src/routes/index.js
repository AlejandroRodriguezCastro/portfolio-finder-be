const express = require('express');
const userRoute = require('./user.route');
const contactRoute = require('./contact.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/contacts',
        route: contactRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
