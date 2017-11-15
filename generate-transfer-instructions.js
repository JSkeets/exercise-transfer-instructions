const _ = require('lodash') // Feel free to use
const BigNumber = require('bignumber.js') // Feel free to use

/**
  * Given a set of users, a pool of funds, and a target distribution for those funds, this produces a set of instructions that sends funds between users so that the target distribution is met.
  * For example, if "Seth" has a balance of 10, "Amy" a balance of 3, and "John" a balance of "1", if the ideal ratio between them is to have 1/3 each of the total (12), Seth will have to give Amy 2 and Seth will have to give John 3 so that each of them has 4, or 33% of the total.
  *
  * @param {Object} distribution - The ideal distribution. Keys are names, values are the fraction of the total distributed to that person.
  *   @param {number} distribution.{name} - the distribution of the total that the person specified by 'name' should posess.
  * @param {Object} balances - The current balance of each person. Keys are names, values are the current balance.
  *   @param {string} balances.{name} - The current balance of the person specified by 'name.'
  * @return {Array} - an array of `instruction` Objects
  *   @return {Object} instruction
  *     @return {string} instruction.from - the name of the person giving the amount
  *     @return {string} instruction.to - the name of the person receiving the amount
  *     @return {number} instruction.amount - the amount necessary so that ratios match
  *
  * @example:
  */
    // const distribution = {
    //   seth: "1/3",
    //   amy: "1/3",
    //   john: "1/3"
    // };
    // const balances = {
    //   seth: 9,
    //   amy: 2,
    //   john: 1
    // };
    // generateTransferInstructions(distribution, balances)
    // # => [{
    //   from: "seth",
    //   to: "amy",
    //   amount: 2
    // },{
    //   from: "seth",
    //   to: "john",
    //   amount: 3
    // }]

function generateTransferInstructions(distribution, balances)
{
  //  Compute sum
   let values = Object.keys(balances).map(function(key) {
     return balances[key];
   });
  let sum = values.reduce(function(acc, currVal) {
    return (acc + currVal);
  });
  //  Compute object with target values
  let users = Object.keys(distribution);
  let targets = {};
  let differences = {};

  users.forEach((el) => {
    targets[el] = eval(distribution[el]) * sum;
  });
  //  Difference between current balance and target
  users.forEach((el) => {
    targets[el] = eval(distribution[el]) * sum;
    differences[el] = (balances[el] - targets[el]);
  });
  // Sort needed values in ascending order
  let needed = Object.keys(differences).map(function(key) {
    return differences[key];
  });
  let neededInt = needed.map(Number);
  let neededSorted = neededInt.sort(function(a,b) { return a - b; });

// Create a nested array with users name, and their needed balance sorted
  let usersSorted = [];
  users.forEach(el => {
    usersSorted.push([el, differences[el]]);
  });

  usersSorted.sort((function(index){
    return function(a, b){
        return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
    };
  })(1));

  let ans = [];
  let suba = {};
  let i = 0 ;
  let j = neededSorted.length - 1;
  let original = neededSorted.slice();

  // Logic operation starts at largest surplus and subtracts lowest value from highest surplus
  let completed = false;
  while (completed === false) {
    if (neededSorted[j] >= 0) {
      let el = neededSorted[i];
      if (( (neededSorted[j] - (Math.abs(el))) >= 0)) {
        suba["from"] = usersSorted[j][0]; // Transfered from index
        suba["to"]= usersSorted[i][0]; // Transfered to index
        suba["amount"]=Math.abs(neededSorted[i]); // Amount transfered
        ans.push(suba);
        suba = {};
        neededSorted[j] = neededSorted[j] - (el * -1);
        neededSorted[i] = 0;
        i += 1;
        if (neededSorted.every( (val, ii, arr) => val == arr[0] )){
          completed = true;
        }

      }else if (((neededSorted[j] - (Math.abs(el)) < 0))) {
        suba["from"] = usersSorted[j][0]; // Transfered from index
        suba["to"]= usersSorted[i][0]; // Transfered to index
        suba["amount"]=neededSorted[j]; // Amount transfered
        ans.push(suba);
        suba = {};
        neededSorted[i] = neededSorted[i] + neededSorted[j];
        neededSorted[j] = 0;
        j -= 1;
        if (neededSorted.every( (val, ii, arr) => val == arr[0] )){
          completed = true;
        }
      }
    } else {
      completed = true;
      return "Unable to balance";
    }
  }
  return ans;
}

module.exports = generateTransferInstructions;


