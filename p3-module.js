/*
    CIT 281 Project 3
    Name: Hunter Sacrey
*/

//Checks to see if coin value is [1, 5, 10, 25, 50, 100]. If it doesn't match any of those then it's invalid. COMPLETE
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