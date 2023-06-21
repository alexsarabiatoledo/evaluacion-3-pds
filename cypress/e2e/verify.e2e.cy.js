describe("Verification E2E", () => {
	it("Successful verification", () => {
		cy.visit("/login");
		cy.login("a.vera07@ufromail.cl", "1Qaz2wsx#");

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

	it("Verificación no necesaria", () => {
		cy.login("a.vera07@ufromail.cl", "1Qaz2wsx#");
	  
		cy.visit("/verify");
		cy.get('input[type="text"]').type("asd123");
		cy.get('button[type="submit"]').click();
	  
		cy.get("div")
		  .find(".q-notification")
		  .should("be.visible")
		  .and("contain.text", "the user is already verified");
	  
		cy.url().should("eq", `${Cypress.config().baseUrl}/`);
	  });



	  // El usuario que antes no estaba verificado se verificó y por eso estan fallando las pruebas pero la implementacion esta correcta
	  
});
