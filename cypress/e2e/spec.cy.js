describe("Aprendendo conceitos Cypress", () => {
  it("1 - Usuário faz login com username e senha inválidos", () => {
    cy.visit("/");
    cy.get("div.shop-menu").contains("Login").should("have.attr", "href", "/login").click();

    cy.contains("Login to your account").should("be.visible");

    cy.get('[data-qa="login-email"]')
    .type("teste@email.com")
    .should("be.visible")
    .and("have.attr", "placeholder", "Email Address")
    .and("have.prop", "required");

    cy.get('[data-qa="login-password"]').type("123456").should('have.value', '123456');
    
    //cy.get('[data-qa="login-button"]').contains("Login").click();
    
    cy.get('[data-qa="login-button"]').as('btnLogin').then(($button) =>{
      expect($button).to.have.text('Login');
      expect($button).to.contain('Login');
      expect($button).to.be.visible;
      expect($button).to.have.attr('type', 'submit');
      expect($button).to.have.class('btn');

      cy.wrap($button).click();
    });
    
    /*
    cy.get('[data-qa="login-button"]').should(($button) =>{
      expect($button).to.have.text('Login');
      expect($button).to.contain('Login');
      expect($button).to.be.visible;
      expect($button).to.have.attr('type', 'submit');
      expect($button).to.have.class('btn');
    });
    */
   
    cy.get('@btnLogin').click();

    cy.contains("Your email or password is incorrect!");
  });

  it("2 - Acessando home da página Automation Exercise", () => {
    cy.visit("/");
    cy.contains("Automation");
    cy.get("h1");
    cy.get("h1").contains("Automation");
    cy.get(".features_items");
    cy.get("div.features_items");
  });

  it("3 - Verificando itens para comprar", () => {
    cy.visit("/");
    cy.get(".features_items");
    cy.get(".features_items").children().first();
    cy.get(".features_items").children().last();
    cy.get(".features_items").children().eq(2);
    cy.get('[data-product-id="2');
  });
  it("4 - Colocar item no carrinho e continuar comprando", () => {
    cy.visit("/");
    cy.get('[data-product-id="2"]').contains("Add to cart").click();
    cy.get("#cartModal").contains("Added");
    cy.get("button.close-modal", { timeout: 5000 }).click();
  });
  it("5 - Acessando página de produtos - usando intercept", () => {
    cy.visit("/");
    cy.intercept("GET", "products").as('getProdutos');

    cy.get(".navbar-nav").contains("Products").then(($btn) =>{
      cy.wrap($btn).click();
    });

    //cy.wait('@getProdutos').its('response.statusCode').should('eq',200);

    cy.wait('@getProdutos').should((interception) => {
      expect(interception.response.statusCode).to.be.eq(200)
    });

  });
  it("6 - GET Produtos - usando request", () => {
    cy.request("GET", "api/productsList").should((response) =>{
      expect(response.status).to.be.eq(200);
      expect(response.body).not.to.be.empty;
      let body = JSON.parse(response.body);
      expect(body.products).to.be.an('array');
      expect(body.products).to.have.length.above(1);
    });
  });
});
