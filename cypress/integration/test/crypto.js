// <reference types="cypress" />
describe("Web Portal Test", () => {
    beforeEach(() => {
      cy.visit("https://crypto.com/nft");
      cy.get('a[data-test-id="nav-marketplace"').click()
    })

    it("Marketplace default load 6 cards", () =>{
      cy.get('div[data-test-id="nftCard-image"]')
      .should('have.length', 6)
    })

    it("Marketplace mostview will sort by like desc", () =>{
        cy.get('button[data-test-id="marketplace-sort-button"]')
        .click()
        cy.get('button[data-test-id="marketplace-sort-likes"]')
        .click()
  
        var number_of_likes=[]
        var i = 0
        cy.get('div[data-test-id="nftCard-likes-count"]').each(($value) => {
          number_of_likes.push($value.text())
          if(number_of_likes.length>1){
            cy.log(number_of_likes[i-1])
            cy.log(number_of_likes[i])
            expect(number_of_likes[i-1] >= number_of_likes[i])
          }
          i= i+1
        })
    })


    it("Marketplace search one card and compare its' price", () => {
      cy.get('input[data-test-id="nav-search-box-input"]').type('AlphaBot #9867{enter}')
      cy.get('div[data-test-id="nftCard-image"]').click()
      cy.get('div[data-test-id="listing-asset-name"]')
      .should(($card_name) => {
        expect($card_name).to.have.text('AlphaBot #9867')
      })
      cy.get('div[data-test-id="nftDetail-price"]')
      .should(($price) => {
        expect($price).to.have.text('500')
      })
    })
})