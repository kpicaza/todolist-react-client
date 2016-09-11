import express from 'express';
import path from 'path';
import compression from 'compression';
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'
import vhost from 'vhost';


var app = express();
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
    match({ routes: routes, location: req.url }, (err, redirect, props) => {
        // in here we can make some decisions all at once
        if (err) {
            // there was an error somewhere during route matching
            res.status(500).send(err.message);
        } else if (redirect) {
            // we haven't talked about `onEnter` hooks on routes, but before a
            // route is entered, it can redirect. Here we handle on the server.
            res.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            // if we got props then we matched a route and can render
            const appHtml = renderToString(<RouterContext {...props}/>);
            res.send(renderPage(appHtml));
        } else {
            // no errors, no redirect, we just didn't match anything
            res.status(404).send('Not Found');
        }
    })
});

function renderPage(appHtml) {
    return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app><div>${appHtml}</div></div>
    <script src="/bundle.js"></script>
   `;
}

app.use(function(req, res){
    if (!module.parent) console.log(req.vhost);
    res.redirect('http://api.todolist.com/' + req.vhost[0]);
});

// Vhost app

app.use(vhost('api.todolist.com', app)); // Serves all subdomains via Redirect app

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT);
});
