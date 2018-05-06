var express = require('express'),
    http = require('http'),
    app = express();
    poll = require("./poll.js");
const CONFIG = require("./config.js");
app.get('/',function(req,res) {
  let ans = ["Dog","Cat","Fish"];
  let question = "Which one is the best Fish?";
  let myPoll = new poll(question,ans,CONFIG.GLOBAL.MAXVOTES);
  for (var i = 0; i < 20; i++) myPoll.vote(ans[Math.floor(Math.random() * 100) % ans.length]);
  myPoll.print();
  res.send(CONFIG.GLOBAL.RESPONSE);
});
http.createServer(app).listen(3000);
console.log("listening 3000");
