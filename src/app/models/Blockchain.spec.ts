import { Blockchain } from './Blockchain'
import { Block } from './Block'
import { GenesisBlock } from './GenesisBlock'

describe('Blockchain', () => {
  const blockchain = new Blockchain()

  it('contains a chain array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true)
  })
  // it('starts with genesis block', () => {
  //   expect(blockchain.chain[0]).toEqual(GenesisBlock.create())
  // })
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
      describe('the chain contains a block with an invalid field', () => {
        it('returns false', () => {})
      })
    })
  })
})