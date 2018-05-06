# Poll Manager

ES6 Node.js Project.

## Getting Started


### Prerequisites

What things you need to install the software and how to install them

```
npm

node.js
```

### Installing

Clone this repository and run

```
npm install
```

And then

```
node index.js
```

You should now be able to access it on localhost:8080

## Module Methods

```
reset() - Reset the votes in the poll
vote(ans)  - Vote in determined answer
print()  - print to global Array and console stats
getSubject() - Return Subject of the poll
getAnswers() - Return array with the answers
getResults() - Return object with answers as the key and votes as the values
constructor(subject,answers,maxVotes) - Send Subject, array of answers and maxVotes(default is 10)

```

## Endpoints

```
/ - Print all the information in the Global array
/stats - lists the existing polls with the link to the single stats page
/stats/:pollId -  Print the stats for a single poll

```
