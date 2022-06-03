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

//here is coins because option 2 couldnt find em lol
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];