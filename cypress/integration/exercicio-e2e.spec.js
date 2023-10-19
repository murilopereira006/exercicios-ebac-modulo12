/// <reference types="cypress" />
const faker = require('faker')
let dadosLogin

const name = faker.name.firstName()
const lastName = faker.name.firstName()
const email = faker.internet.email(name)

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('.icon-user-unfollow').click()
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        cy.get('.page-title').should('contain', 'Minha conta')

        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.adicionarProdutoNoCarrinho('Abominable Hoodie', 'L', 'Green', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.adicionarProdutoNoCarrinho('Aether Gym Pant', '34', 'Green', 3)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.adicionarProdutoNoCarrinho('Argus All-Weather Tank', 'M', 'Gray', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.adicionarProdutoNoCarrinho('Ariel Roll Sleeve Sweatshirt', 'XS', 'Red', 1)

        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

        cy.completarDados(
            name,
            lastName,
            'EBAC',
            'Brasil',
            '960 Bruen Lake',
            'Rio de Janeiro',
            'Rio de Janeiro',
            '00000111',
            '11999994444',
            email
        )

        cy.finalizarCompra('Pagamento na entrega')

        cy.get('.page-title').should('contain', 'Pedido recebido')
    });
})
