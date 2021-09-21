context('index', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('should load the first page', () => {
		cy.get('nav').find('a.highlight').contains('01')
	})

	it('should navigate to next page', () => {
		cy.get('nav').find('a.highlight').parent().next().click()
		cy.location().should(({ search }) => {
			expect(search).to.eq('?page=2')
		})
	})
})

export {}
