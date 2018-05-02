const EventEmitter = require('events');
class Poll extends EventEmitter {
  constructor(subject,answers,maxVotes=10) {
    super();
    this.subject = subject;
    this.answers = answers;
    this.objVotes = {}
    this.maxVotes = maxVotes;
    this.votes = 0;
    this.on('vote', (val) => {
      if (this.votes<this.maxVotes) this.emit('countVote', val);
      else this.emit('limitVote', val);
    });
    this.on('countVote', (val) => {
      this.votes++;
      this.objVotes[val]++;
      this.emit("print",`Voted in ${val}`);
    });
    this.on('limitVote', (val) => this.emit("print",`Vote in ${val} not counted because reached maximum :( `));

    this.on('reset', () => {
      this.emit("print","Reseting poll");
      this.objVotes = {}
      answers.forEach((val,index) => this.objVotes[val] = 0);
      this.emit("stats");
    });
    this.on('stats', () => {
      this.emit("print","STATS FOR POLL:");
      this.emit("print",`Subject: "${this.subject}"`);
      this.emit("print",`Votes given: "${this.votes}"`);
      Object.keys(this.objVotes).forEach((key) => this.emit("print",`${key} : Votes given: "${this.objVotes[key]}"`));
    });
    this.on('print', (msg) => {
      console.log(msg);
    });
    this.emit("reset");
    }
    reset(){ this.emit('reset'); }
    vote(id) { this.emit('vote', id); }
    print() { this.emit('stats'); }
}
module.exports = Poll;
