/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
    // Display json-server's built in homepage when json-server starts.
    static: 'node_modules/json-server/public',
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
    setTimeout(next, 0);
});

server.get('*/GetForCurrentUserBetweenDates', function (req, res, next) {
    res.redirect('/episodes');
});

server.put('*/AddEpisodeDownloaded', function (req, res, next) {
    res.status(200).send();
});

server.get('*/GetUserSubscriptionsForListing', function (req, res, next) {
    res.redirect('/users/1/subscriptions');
});

server.get('*/GetAllForListing', function (req, res, next) {
    res.redirect('/shows');
});

server.patch('/subscriptions/UnsubscribeFromShow', function (req, res, next) {
    res.status(200).send();
});

server.put('/subscriptions/SubscribeToShow', function (req, res, next) {
    res.status(200).send();
});

server.get('/users/getUserEpisodePreferences', function (req, res, next) {
    res.redirect('/preferences');
});

server.post('/users/setUserEpisodePreferences', function (req, res, next) {
    res.status(200).send();
});

server.get('/episodes/GetForShow', function (req, res, next) {
    res.redirect('/episodes');
});

server.post('/sync/SyncWithShowRss', function (req, res, next) {
    res.status(200).send();
});

server.get('/ParseHistory/GetParseHistoryBetweenDates', function (req, res, next) {
    res.redirect('/parseHistories');
});

server.get('/ParseHistory/GetParseHistoryDetails', function (req, res, next) {
    res.redirect('/parseHistoryDetails');
});

server.post('/sync/ForceSyncParseHistory', function (req, res, next) {
    res.status(200).send();
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
