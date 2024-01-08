// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
// this is terrible code i just want my certs
app.get("/api/:date?", function(req, res) {
    const { date } = req.params;

    if (!date) {
        const now = Date.now();

        res.json({
            unix: now,
            utc: new Date(now).toUTCString(),
        });
        return;
    }

    let dateObj = undefined;

    if (isNaN(date)) {
        dateObj = new Date(date)
    } else {
        dateObj = new Date(parseInt(date))
    }

    if (dateObj.toString() === "Invalid Date") {
        res.json({
            error: "Invalid Date",
        });
        return;
    }

    res.json({
        unix: dateObj.getTime() / 1000,
        utc: dateObj.toUTCString(),
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
});
