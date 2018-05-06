const EventEmitter = require('events');
const CONFIG = require("./config.js");
class Poll extends EventEmitter {
    constructor(subject, answers, maxVotes = 10) {
        super();
        this.subject = subject;
        this.answers = answers;
        this.objVotes = {}
        this.maxVotes = maxVotes;
        this.votes = 0;
        this.on(CONFIG.EVENTS.VOTE, (val) => {
            if (this.votes < this.maxVotes) this.emit(CONFIG.EVENTS.COUNT, val);
            else this.emit(CONFIG.EVENTS.LIMIT, val);
        });
        this.on(CONFIG.EVENTS.COUNT, (val) => {
            this.votes++;
            this.objVotes[val]++;
            this.emit(CONFIG.EVENTS.PRINT, `Voted in ${val}`);
        });
        this.on(CONFIG.EVENTS.LIMIT, (val) => this.emit(CONFIG.EVENTS.PRINT, `Vote in ${val} not counted because reached maximum :( `));

        this.on(CONFIG.EVENTS.RESET, () => {
            this.emit(CONFIG.EVENTS.PRINT, "Reseting poll");
            this.objVotes = {}
            this.votes = 0;
            answers.forEach((val, index) => this.objVotes[val] = 0);
            this.emit(CONFIG.EVENTS.STATS);
        });
        this.on(CONFIG.EVENTS.STATS, () => {
            this.emit(CONFIG.EVENTS.PRINT, `STATS FOR POLL SUBJECT: "${this.subject}"`);
            this.emit(CONFIG.EVENTS.PRINT, `Votes given: "${this.votes}"`);
            Object.keys(this.objVotes).forEach((key) => this.emit(CONFIG.EVENTS.PRINT, `${key} : Votes given: "${this.objVotes[key]}"`));
        });
        this.on(CONFIG.EVENTS.PRINT, (msg) => {
            console.log(msg);
            CONFIG.GLOBAL.RESPONSE.push(msg);
        });
        this.emit(CONFIG.EVENTS.RESET);
    }
    reset() {
        this.emit(CONFIG.EVENTS.RESET);
    }
    vote(ans) {
        this.emit(CONFIG.EVENTS.VOTE, ans);
    }
    print() {
        this.emit('stats');
    }
    getSubject() {
        return this.subject;
    }
    getAnswers() {
        return this.answers;
    }
    getResults() {
        return this.objVotes;
    }

}
module.exports = Poll;
