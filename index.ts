class Command {
	private pattern = /CMD +((([\w-.]+\/[\w-.]+)?#\d+) *((, *)? *and +|, *)?)+/i

	constructor(
		private cmd: RegExp,
		private callback: (context: any, issues: RegExpMatchArray) => void
	) {}

	get command() {
		const raw = this.pattern.source
		// Warning: We ignore this.cmd flags
		return new RegExp(raw.replace(/CMD/, this.cmd.source), this.pattern.flags)
	}

	issues(str: string) {
		return str.match(/(?:[\w-.]+\/[\w-.]+)?#\d+/g)
	}

	listener(context: any) {
		const match = (context.payload.comment.body as string).match(this.command)
		if (match) {
			this.callback(context, this.issues(match[0]) as RegExpMatchArray)
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
export const addCommand = (
	robot: any,
	name: RegExp,
	callback: (context: any, issues: RegExpMatchArray) => void
) => {
	const command = new Command(name, callback)
	robot.on('issue_comment.created', command.listener.bind(command))
}
