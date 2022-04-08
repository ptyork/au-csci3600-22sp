// TO USE ES6-STYLE IMPORTS
//   - add "type": "module" to package.json
//   - replace require calls with import directives
//   - that's it
// const express = require('express');
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

app.use(cookieParser());

app.get('/', (req, res) => {
    let cookieText = "";
    for (let cookieName in req.cookies) {
        let cookieValue = req.cookies[cookieName];
        cookieText += `<li>${cookieName} : ${cookieValue}`;
    }

    let htmlText = `
<html>
<head>
    <title>TEST PAGE</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>You have the following cookies in your request</p>
    <ul>
        ${cookieText}
    </ul>

    <p>The browswer shows your "document.cookie" value as:<p>
    <pre id="cookieText"></pre>

    <a href="/setcookie">Set the Cookie (increment it)</a> |
    <a href="/clearcookie">Clear the Cookie</a>

    <script>
        // THIS SCRIPT IS RUN IN THE BROWSWER, NOT IN EXPRESSJS
        document.querySelector("#cookieText").innerText = document.cookie;
    </script>
</body>
</html>
`;

    res.contentType("text/html");
    res.send(htmlText);
});

// Simple demo endpoint to show how to SET a cookie
app.get('/setcookie', (req, res) => {
    // Create variables just for clarity
    // Cookeis are eventually stored as strings, but here I'm demonstrating
    // how they can be converted easily to and from.
    let cookieName = 'c_is_for_cookie';
    let cookieValue = 0;

    // This checks to see if the cookie is in the request. It uses "truthy"
    // comparison to see if it is null or not. Null is equivalent to False.
    if (req.cookies[cookieName]) {
        // Convert and increment
        cookieValue = parseInt(req.cookies[cookieName]);
        cookieValue++;
    }

    // Actually put the cookie itself in the response
    res.cookie(cookieName, cookieValue, {});
    // Additional examples with cookie attributes
    let seconds = 5 * 24 * 60 * 60;  // 5 days
    // res.cookie(cookieName, cookieValue, { expire: seconds + Date.now() });
    res.cookie(cookieName, cookieValue, {maxAge: seconds, httpOnly: true});

    // Cookes are append to a response. As long as the response gets to the browser,
    // it will store the value. So redirecting here back to the home page is
    // just fine. The cookie value is preserved.
    res.redirect('./');
});

app.get('/clearcookie', (req, res) => {
    let cookieName = 'c_is_for_cookie';
    res.clearCookie(cookieName);
    res.redirect('./');
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

