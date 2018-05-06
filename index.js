var express = require('express'),
    http = require('http'),
    app = express();
poll = require("./poll.js");
polls = [];
const CONFIG = require("./config.js");
polls.push(new poll("Which one is the best Fish?", ["Dog", "Cat", "Fish"], CONFIG.GLOBAL.MAXVOTES));
polls.push(new poll("Which one is the best Star Wars Pilot?", ["Luke Skywalker", "Boba Fett", "Han Solo", "Anakin Skywalker"], CONFIG.GLOBAL.MAXVOTES));
for (var i = 0; i < polls.length; i++) { // Loop all existing polls
    for (var j = 0; j < 20; j++) {
        let tmpANS = polls[i].getAnswers();
        let rndVote = tmpANS[Math.floor(Math.random() * 100) % tmpANS.length];
        polls[i].vote(rndVote); //Random 20 votes
    }
    polls[i].print(); //Get final stats
}
app.get('/', function(req, res) {
    res.send(CONFIG.GLOBAL.RESPONSE.map(i => `<p>${i}</p>`).join(""));
});
app.get('/stats', function(req, res) {
    let options = ["<h1>GET STATS FOR POLLS</h1>", "<ul>"];
    for (var i = 0; i < polls.length; i++)
        options.push(`<li><a href ="/stats/${i}">${polls[i].getSubject()}</a></li>`);
    options.push("</ul>")
    res.send(options.join(""));
    console.log(options);
});
app.get('/stats/:pollId', function(req, res) {
    if (req.params.pollId <= polls.length) {
        let options = [`<h1> ${polls[req.params.pollId].getSubject()}</h1>`, "<ul>"];
        let tmpANS = polls[req.params.pollId].getResults();
        Object.keys(tmpANS).forEach((key) => options.push(`<li>${key} - <b>${tmpANS[key]}</b></li>`));
        options.push("</ul>")
        res.send(options.join(""));
        console.log(options);
    } else res.send("This Poll id does not exists");
});
http.createServer(app).listen(8080);
console.log("listening 8080");
