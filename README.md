# Probot: Issue Commands

[![Travis](https://img.shields.io/travis/ahmed-taj/probot-issue-commands.svg)](https://travis-ci.org/ahmed-taj/probot-issue-commands)
[![npm](https://img.shields.io/npm/v/probot-issue-commands.svg)](https://www.npmjs.com/package/probot-issue-commands)

A Probot extension to make it easier to working with issue commands.

## Installation

```sh
$ npm add probot-issue-commands
```

## Usage

```javascript
const commands = require('probot-issue-commands)

// Type `closes #1, and owner/repo#2`
commands(robot, /clos(es|ing)/, (context, issues) => {
	console.log(issues)
	// ['#1','owner/repo#2', ...]
})
```

## Like it?

Give it a star(:star:) :point_up_2:

## License

MIT © [Ahmed T. Ali](https://github.com/ahmed-taj)
