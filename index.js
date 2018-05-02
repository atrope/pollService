var poll = require("./poll.js");
let ans = ["Answer #1","Answer #2","Answer #3"];
const myPoll = new poll("Question",ans);
for (var i = 0; i < 100; i++) myPoll.vote(ans[Math.floor(Math.random() * 100) % 3]);
myPoll.print();
console.log("FIM");

/*app.get('/',function(req,res) {
});
http.createServer(app).listen(3000);
console.log("listening 3000");*/
