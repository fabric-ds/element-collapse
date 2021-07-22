import { expand, collapse } from '../index.js'

describe('transitions', () => {
  it('collapses', () => {
    cy.visit('http://localhost:5000')
    cy.get('#target-one').then(weirdElementList => {
      const el = weirdElementList[0]
      expect(el.style.height).to.not.equal('0px')
      collapse(el, () => {
        expect(el.style.height).to.equal('0px')
      })
    })
  })

  it('expands', () => {
    cy.visit('http://localhost:5000')
    cy.get('#target-two').then(weirdElementList => {
      const el = weirdElementList[0]
      el.style.height = '0px'
      expect(el.style.height).to.equal('0px')
      expand(el, () => {
        expect(el.style.height).to.not.equal('0px')
      })
    })
  })
})
