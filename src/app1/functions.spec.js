var { function4 } = require('./functions')

describe('functions', () => {
    it('todo', async () => {
        expect(await function4()).toMatchObject({
            statusCode: 501,
            body: 'Not Implemented',
        })
    })

    it('matches snapshot', async () => {
        expect(await function4()).toMatchSnapshot()
    })
})
