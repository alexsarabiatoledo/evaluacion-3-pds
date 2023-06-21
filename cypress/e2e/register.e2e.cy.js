describe("register E2E", () => {
	it("register correct", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("letrashumanasking@gmail.com");
		cy.get('input[id="register-name"]').type("letristacertero98");
        cy.get('input[id="register-rut"]').type("17066770-0");
        cy.get('input[aria-label="Password"]').type("Ab12345*");
        cy.get('input[aria-label="Confirm the password"]').type("Ab12345*");
		cy.get('button[id="register-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please login");
	});

    it("register failed for used email", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("anothersimpleman98@gmail.com");
		cy.get('input[id="register-name"]').type("alejandro99345");
        cy.get('input[id="register-rut"]').type("21466668-5");
        cy.get('input[aria-label="Password"]').type("Ab12345*");
        cy.get('input[aria-label="Confirm the password"]').type("Ab12345*");
		cy.get('button[id="register-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "the email already exist");
	});

    it("register failed for used rut", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("cualquiercorreopatricia@gmail.com");
		cy.get('input[id="register-name"]').type("aleatoriedadnumerica34521");
        cy.get('input[id="register-rut"]').type("19971496-1");
        cy.get('input[aria-label="Password"]').type("Ab12345*");
        cy.get('input[aria-label="Confirm the password"]').type("Ab12345*");
		cy.get('button[id="register-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "the rut already exists");
	});
});