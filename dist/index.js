"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(cmd, callback) {
        this.cmd = cmd;
        this.callback = callback;
        this.pattern = /CMD +((([\w-.]+\/[\w-.]+)?#\d+) *((, *)? *and +|, *)?)+/i;
    }
    get command() {
        const raw = this.pattern.source;
        // Warning: We ignore this.cmd flags
        return new RegExp(raw.replace(/CMD/, this.cmd.source), this.pattern.flags);
    }
    issues(str) {
        return str.match(/(?:[\w-.]+\/[\w-.]+)?#\d+/g);
    }
    listener(context) {
        const match = context.payload.comment.body.match(this.command);
        if (match) {
            this.callback(context, this.issues(match[0]));
        }
    }
}
/**
 * A Probot extension to make it easier to working with issue commands.
 *
 * @example
 *
 * // Type `closes #1, and owner/repo#2`
 * commands(robot, /clos(es|ing)/, (context, issues) => {
 * 	console.log(issues)
 * 	// ['#1','owner/repo#2', ...]
 * })
 */
exports.default = (robot, name, callback) => {
    const command = new Command(name, callback);
    robot.on('issue_comment.created', command.listener.bind(command));
};
