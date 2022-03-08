// <reference types="cypress" />
import selectors from '../../support/selectors.js';

describe("Web Portal Test", () => {
    before(() => {
        cy.visit("https://crypto.com/nft")
        cy.get(selectors.nav_marketplace).click()
    })

    it("Marketplace default load 6 cards", () =>{
        cy.get(selectors.nftCard_image)
        .should('have.length', 6)
    })

    it("Marketplace mostview will sort by like desc", () =>{
        cy.get(selectors.marketplace_sort_button)
        .click()
        cy.get(selectors.marketplace_sort_likes)
        .click()
  
        var number_of_likes=[]
        var i = 0
        cy.get(selectors.nftCard_likes_count).each(($value) => {
          number_of_likes.push($value.text())
          if(number_of_likes.length>1){
            cy.log(number_of_likes[i-1])
            cy.log(number_of_likes[i])
            expect(number_of_likes[i-1] >= number_of_likes[i])
          }
          i= i+1
        })
    })


    it("Marketplace search one card and compare its' price", function() {
        cy.get(selectors.nav_search_box_input).type('AlphaBot #9867{enter}')
        cy.get(selectors.nftCard_image).click()
        cy.get(selectors.listing_asset_name)
        .should(($card_name) => {
        expect($card_name).to.have.text('AlphaBot #9867')
        })
        cy.get(selectors.nftDetail_price)
        .should(($price) => {
        expect($price).to.have.text('500')
        })
    })
})