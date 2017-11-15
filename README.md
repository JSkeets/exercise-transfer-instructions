# Transfer Instructions Exercise

## Intro
Write code that produces an array of 'transfer instruction' objects that equalize balances between people.

For example, imagine Seth has a balance of 10, Amy a balance of 3, and John a balance of 1. If the ideal distribution between them is 1/3 each of the total, Seth will have to give Amy 2 and Seth will have to give John 3 so that each of them has 4, or 33% of the total 12.

The function exported by `generate-transfer-instructions.js` should accomplish this. Given a set of users, a pool of funds, and a target distribution for those funds, the function should produce a set of instructions that sends funds between users so that the target distribution is met. The parameters and return values are described in `generate-transfer-instructions.js` which also contains the above example in code.

## Task
There are series of tests in `test/test.js` that should pass when `generateTransferInstructions` is coded correctly. To run these tests while you develop see the instructions for either the Docker or Node.js below.

## Timeline
Use only 2-4 hours to get as far as you can. Completion is not the goal.

## Resources
`lodash` is pre-installed as well as `big-number.js` should you need them.


## Files
- `generate-transfer-instructions.js`: This file contains the exported function that should do the work of generating transfer instructions. This is where you should write your code.
- `test/test.js`: This file is run by `npm test` or `docker-compose run --rm test` and tests the expected output of `generate-transfer-instructions.js`

## Installation
There are two routes to take. Docker or Node.js. They both use the same files but one route might be easier than another for you to setup (for example you have one or the other already installed)

### Docker Instructions
- Install Docker
- Build the base image:
    - `docker-compose --project-name transfer-instructions-exercise build base`
- Run tests once:
    - `docker-compose run --rm test`
- Run a test watcher that re-runs tests after a change
    - - `docker-compose run --rm testwatch`
- To start a Node.js console
    -   run `docker-compose run --rm console`
- Installing a new dependencies:
    -   Run `docker-compose run --rm bash npm install {dependency} --save` 
    -   Rebuild the image:  `docker-compose --project-name transfer-rules-exercise build base`

### Node.js Instructions
- Install Node
- Install dependencies
    - run `npm install`
- Run tests once:
    - `npm run test`
- Run a test watcher that re-runs tests after a change
    - `npm run testwatch`
- To start a Node.js console
    -   run `node`