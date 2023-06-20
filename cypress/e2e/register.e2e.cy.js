describe("register E2E", () => {
	it("register correct", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("a.sarabia02@ufromail.cl");
		cy.get('input[id="register-name"]').type("alex98");
        cy.get('input[id="register-rut"]').type("199714961");
        cy.get('input[id="register-password"]').type("Ab12345*");
        cy.get('input[id="register-password"]').type("Ab12345*");
		cy.get('button[id="register-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please login");
	});

    it("register failed for used email", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("a.sarabia02@ufromail.cl");
		cy.get('input[id="register-name"]').type("alejandro99");
        cy.get('input[id="register-rut"]').type("10570061k");
        cy.get('input[id="register-password"]').type("Ab12345*");
        cy.get('input[id="register-password"]').type("Ab12345*");
		cy.get('button[id="register-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "the email already exist");
	});

    it("register failed for used rut", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("alexsarabia44@gmail.com");
		cy.get('input[id="register-name"]').type("alex988");
        cy.get('input[id="register-rut"]').type("199714961");
        cy.get('input[id="register-password"]').type("Ab12345*");
        cy.get('input[id="register-password"]').type("Ab12345*");
		cy.get('button[id="register-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "the rut already exists");
	});
});