import { Blockchain } from './Blockchain'

describe('Blockchain', () => {
  const blockchain = new Blockchain()

  it('contains a chain array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true)
  })
  it('adds a new block to the chain', () => {
    const newData = 'foo bar'
    blockchain.addBlock({ data: newData })

    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
  })
  describe('isValidChain()', () => {
    describe('when the chain does not start with the genesis block', () => {
      it('returns false', () => { })
    })
    describe('when the chain starts with the genesis block and has multiple blocks', () => {
      describe('and a lastHash reference has changed', () => {
        it('returns false', () => { })
      })
      describe('and the chain contains a block with an invalid field', () => {
        it('returns false', () => {})
      })
    })
  })
})