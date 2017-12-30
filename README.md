# Probot: Issue Commands

[![Travis](https://img.shields.io/travis/ahmed-taj/probot-issue-commands.svg)](https://travis-ci.org/ahmed-taj/probot-issue-commands)
[![npm](https://img.shields.io/npm/v/probot-issue-commands.svg)](https://www.npmjs.com/package/probot-issue-commands)

A Probot extension to make it easier to work with issue commands. It was primarily written to help support GitHub [closing issue pattern](https://help.github.com/articles/closing-issues-using-keywords/) like custom syntax for [DEP](https://github.com/apps/dep)

## Installation

```sh
$ npm add probot-issue-commands
```

## How it works

The extension works by matching new issue comments against the following pattern:

```javascript
/CMD +((([\w-.]+\/[\w-.]+)?#\d+) *((, *)? *and +|, *)?)+/i
```

Which should match e.g:

* CMD #1
* CMD #1, #2
* CMD #1, #2, and #3
* CMD #1 #2
* CMD #1 and #2

It also supports `owner/repo#ID` syntax to reference issues in different repositories.

Internally the extension replaces `CMD` with your command regex's source (without any options i.e. `g`) and then execute result against comment body.

## Usage

```javascript
const { addCommand } = require('probot-issue-commands')

// Type `closes #1, and owner/repo#2`
addCommand(robot, /clos(es|ing)/, (context, issues) => {
	console.log(issues)
	// ['#1','owner/repo#2', ...]
})
```

## Like it?

Give it a star(:star:) :point_up_2:

## License

MIT © [Ahmed T. Ali](https://github.com/ahmed-taj)
