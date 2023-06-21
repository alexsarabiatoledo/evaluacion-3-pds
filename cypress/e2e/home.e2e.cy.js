describe("Home E2E", () => {
	it("Home correct", () => {
		cy.login("john@example.com", "2aSsword95%");

		cy.visit("/");

		cy.get(".user-name").should("have.text", "John Doe");
		cy.get(".user-rut").should("have.text", "22.222****");
		cy.get(".user-email").should("have.text", "john@example.com");
	});

	it("Home incorrect", () => {
		cy.window().then((win) => {
			win.localStorage.clear();
		});

		cy.visit("/");

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please enter your credentials");

		cy.on("url:changed", (newurk) => {
			console.log(newurk);
			cy.url().should("eq", `${Cypress.config().baseUrl}/login?login_error=1`);
		});
	});

	it("Home not verified", () => {
		cy.window().then((win) => {
		  win.localStorage.clear();
		});
	
		cy.login("a.vera07@ufromail.cl", "1Qaz2wsx#"); // usuario no verificado
	
		cy.visit("/");
	
		cy.url().should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);
	});

	it("Obtener RUT al hacer click en la card", () => {
		cy.login("john@example.com", "2aSsword95%");
	  
		cy.visit("/");
	  
		cy.get(".user-card").click(); // tengo que saber el nombre del atributo del avatar
	  
		cy.get(".modal-content")
		  .should("be.visible")
		  .within(() => {
			cy.get(".user-rut-full").should("contain.text", "22.222.222-2");
		});
	});

	it("Bloquear usuario", () => {
		cy.login("john@example.com", "2aSsword95%");
	  
		cy.visit("/");
	  
		cy.get(".block").click(); // Revisar el nombre correcto del botón
	  
		cy.get(".user-status").should("have.text", "unblock"); // Cambiar por el texto correcto o alguna otra forma de verificar que el usuario fue bloqueado
	  });
	  
	  
	  
  
});