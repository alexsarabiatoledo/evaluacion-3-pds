describe("Verification E2E", () => {
	it("Successful verification", () => {
		cy.visit("/login");
		cy.get('input[type="email"]').type("a.vera07@ufromail.cl");
		cy.get('input[type="password"]').type("1Qaz2wsx#");
		cy.get('button[type="submit"]').click();

		cy.visit("/verify");
		cy.get('input[type="text"]').type("asd123");
		cy.get('button[type="submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Verification successful");

		cy.url().should("eq", `${Cypress.config().baseUrl}/`);
	});

	it("Failed verification - Invalid code for unverified user", () => {
		cy.login("a.vera07@ufromail.cl", "1Qaz2wsx#");
	  
		cy.visit("/verify");
		cy.get('input[type="text"]').type("asss123");
		cy.get('button[type="submit"]').click();
	  
		cy.get("div")
		  .find(".q-notification")
		  .should("be.visible")
		  .and("contain.text", "the code is not valid");
	  
	});
	  
});