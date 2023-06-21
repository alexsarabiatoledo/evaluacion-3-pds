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

	it("Get RUT by clicking on the card", () => {
		cy.login("john@example.com", "2aSsword95%");
	  
		cy.visit("/");
	  
		cy.get(".").click(); // tengo que saber el nombre del atributo del avatar
	  
		cy.get(".modal-content")
		  .should("be.visible")
		  .within(() => {
			cy.get(".").should("contain.text", "22.222.222-2");
		});
	});

	it("Block user", () => {
		cy.login("m.vera14@ufromail.cl", "Garza12#");
	  
		cy.visit("/");
	  
		cy.get("div")
            .find('button[class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-red text-white q-btn--actionable q-focusable q-hoverable"]').should("contain.text", "block").click();
	  
			cy.get('div[class="q-itemlabel q-itemlabel--caption text-caption"]').should('contain', 'This user is blocked');
	});
	
    it("Unblock user", () => {
		cy.login("m.vera14@ufromail.cl", "Garza12#");
	  
		cy.visit("/");
	  
		cy.get('button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-red.text-white.q-btn--actionable.q-focusable.q-hoverable').should("contain.text", "block").click();
	  
		cy.get('div.q-itemlabel.q-itemlabel--caption.text-caption').should('contain', 'This user is blocked');
	  
		cy.get('button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-green.text-white.q-btn--actionable.q-focusable.q-hoverable').should("contain.text", "unblock").click();
	  
		cy.get('div.q-itemlabel.q-itemlabel--caption.text-caption').should('contain', 'This user is unblocked');
	  });
	  
	

});