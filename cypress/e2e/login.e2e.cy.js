describe("Login E2E", () => {
	it("Login incorrect", () => {
		cy.visit("/login");
		cy.get('input[id="login-email"]').type("john@example.com");
		cy.get('input[id="login-password"]').type("john@example.com");
		cy.get('button[id="login-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "invalid credentials");
	});

	it("Correct login", () => {
		cy.visit("/login");
		cy.get('input[type="email"]').type("john@example.com");
		cy.get('input[type="password"]').type("2aSsword95%");
		cy.get('button[type="submit"]').click();

		cy.on("url:changed", () => {
			cy.url().should("eq", `${Cypress.config().baseUrl}/`);
		});
	});
	
	
	it("Incorrect login with invalid email format", () => {
		cy.visit("/login");
		cy.get('input[type="email"]').type("invalid-email");
		cy.get('input[type="password"]').type("2aSsword95%");
		cy.get('button[type="submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "invalid-email" no incluye el signo "@".');

		cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
	});

	it("Correct login with unverified user", () => {
		cy.visit("/login");
		cy.get('input[type="email"]').type("a.vera07@ufromail.cl");
		cy.get('input[type="password"]').type("1Qaz2wsx#");
		cy.get('button[type="submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "You need to verify your account");

		cy.url().should(
			"eq",
			`${Cypress.config().baseUrl}/verify?verify_error=1`
		);
	});

});
