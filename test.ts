// Native
import { EventEmitter } from 'events'

// Ours
import { addCommand } from '.'

describe('addCommand', () => {
	let callback: any
	let robot: any

	function payload(text: string) {
		return { payload: { comment: { body: text } } }
	}

	beforeEach(() => {
		callback = jest.fn()
		robot = new EventEmitter()
		addCommand(robot, /foo(ing)?/, callback)
	})

	it('invokes callback and passes issues list', () => {
		robot.emit('issue_comment.created', payload('hello world\n\nfoo #1'))

		expect(callback).toHaveBeenCalled()
		expect(callback.mock.calls[0][1]).toEqual(['#1'])
	})

	it('supports case-incensitive matching', () => {
		robot.emit('issue_comment.created', payload('FoO #1'))

		expect(callback).toHaveBeenCalled()
		expect(callback.mock.calls[0][1]).toEqual(['#1'])
	})

	it('supports complex issue patterns', () => {
		robot.emit('issue_comment.created', payload('fooing #1, #2 ,and a/b#3'))

		expect(callback).toHaveBeenCalled()
		expect(callback.mock.calls[0][1]).toEqual(['#1', '#2', 'a/b#3'])
	})

	it('does not call callback for other commands', () => {
		robot.emit(
			'issue_comment.created',
			payload('hello world\n\n/nope nothing to see')
		)
		expect(callback).not.toHaveBeenCalled()
	})

	it('invokes command on issue edit', () => {
		const event = payload('hello world\n\n/foo bar')
		robot.emit('issue_comment', event)
		robot.emit('issue_comment.updated', event)
		robot.emit('issue_comment.deleted', event)

		expect(callback).not.toHaveBeenCalled()
	})
})
