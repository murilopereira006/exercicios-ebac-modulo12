// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('adicionarProdutoNoCarrinho', (nomeDoProduto, tamanho, cor, quantidade) => {
    cy.get('[class="product-block grid"]').contains(nomeDoProduto).click()
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
});

Cypress.Commands.add('completarDados', (nome, sobrenome, nomeDaEmpresa, pais, nomeDaRua, cidade, estado, cep, telefone, email) => {
    cy.get('#billing_first_name').clear().type(nome)
    cy.get('#billing_last_name').clear().type(sobrenome)
    cy.get('#billing_company').clear().type(nomeDaEmpresa)
    cy.get('#select2-billing_country-container').type(pais+'{enter}')
    cy.get('#billing_address_1').clear().type(nomeDaRua)
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#select2-billing_state-container').type(estado+'{enter}')
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
    cy.get('#billing_email').clear().type(email)
});

Cypress.Commands.add('finalizarCompra', (metodoDePagamento) => {
    if(metodoDePagamento === 'Transferência bancária') cy.get('#payment_method_bacs').click()
    if(metodoDePagamento === 'Cheque') cy.get('#payment_method_cheque').click()
    if(metodoDePagamento === 'Pagamento na entrega') cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
});

