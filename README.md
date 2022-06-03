## Project 3

I created a "coinage" code module that is capable of calculating the total value of coin objects. After completing the "coinage" code module functionality, I updated the "server" code file as a true Node.js web server using the Fastify package. 

I displayed the updated "server" file on initial web page with web links to to test the "coinage" code. 

I loaded the initial web page from a file.

### Primary concepts: breaking a project into manageable components, creating and using code modules, refactoring using modern JavaScript syntax, web server Node.js JavaScript code using VSCode, Fastify with the GET verb, routes, and query parameters, loading a file and using it as a web page

#### index.html:
```markdown
<head>
  <meta charset="utf-8">
  <title>Coinage</title>

  <style>
  </style>
</head>

<body>
    <h1>Welcome to Coinage!</h1>
    <ul>
        <li><a href="/coin?denom=25&count=3">3 x 25 coin = 75</a></li>
        <li><a href="/coins?option=1">Option 1 = 35</a></li>
        <li><a href="/coins?option=2">Option 2 = 57</a></li>
        <li><a href="/coins?option=3">Option 3 = 57 (Extra Credit)</a></li>
    </ul>
</body>
```
#### p3-module.js:
```javascript
/*
    CIT 281 Project 3
    Name: Hunter Sacrey
*/

//Checks to see if coin value is [1, 5, 10, 25, 50, 100]. If it doesn't match any of those then it's invalid.
function validDenomination(coin){
    return ([1, 5, 10, 25, 50, 100].indexOf(coin) !== -1) ? true : false;
}
//Calculate the value of a coin object w/ (denomination)*(# of coins) COMPLETE
function valueFromCoinObject(obj){
    const {denom = 0, count = 0} = obj;
    return denom*count;
}
//Calculates the total value of an array of coin objects (INCOMPLETE: Also includes arrays of arrays)
function valueFromArray(arr){
    //reduce the value of each 'coin' in the array of coins to one 'result'
    const result = arr.reduce((total, coin) => { 
        total += valueFromCoinObject(coin);
        return total;
    },
    //intial value of 'total'
    0);
    return result;
}
//Export function: Calls and returns valueFromArray
function coinCount(...coinage){
    return valueFromArray(coinage);
}

module.exports = {
    coinCount
};

// console.log("{}", coinCount({denom: 5, count: 3}));
// console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
// console.log("...[{}]", coinCount(...coins));
// console.log("[{}]", coinCount(coins));  // Extra credit
```
#### p3-server.js:
```javascript
/*
    CIT 281 Project 3
    Name: Hunter Sacrey
*/
//REQUIRE statements
const fs = require("fs");
const fastify = require("fastify")();

const {coinCount} = require('./p3-module.js');
//DEFAULT: Displays default webpage reading "index.html"
fastify.get("/", (request, reply) => {
    fs.readFile(__dirname + "\\index.html", (err, data) => {
        if(err) {
            console.log(err);
            reply
            .code(500)
            .header("Content-Type", "text/html; charset=utf-8");
            return;
        }
        return reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(data);

    });
});
//COIN: get denom and count from reuqest.query, parseInt, and display their output from coinCount()
fastify.get("/coin", (request, reply) => {
    const {denom = 0, count = 0} = request.query;
    parseInt(denom); parseInt(count);
    const coinValue = coinCount({denom, count});
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);

});
//COINS, recieve an option from request.query and use switch statement to interpret it
fastify.get("/coins", (request, reply) => {
    const {option} = request.query;
    let coinValue = 0;
    switch(parseInt(option)){
        case 1:
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }); // option = 1
            break;
        case 2:
            coinValue = coinCount(...coins);    // option = 2
            break;
        case 3:
            coinValue = coinCount(coins);    // Extra credit: option = 3
            break;
        default:
            coinValue = 0;          //invalid option
    }
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

//Listener for the server
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});

const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
```
