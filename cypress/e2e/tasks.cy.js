/// <reference types="cypress" />

describe('tasks', () => {

    let testData;

    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            var taskName = 'Ler um livro de Node.js'

            cy.removeTaskByName(taskName)

            cy.createTask(taskName)

            // cy.get('main div p')
            //     .should('be.visible')
            //     .should('have.text', 'Ler um livro de node.js')

            cy.contains('main div p', taskName)
                .should('be.visible')

        })

        it('Não deve permitir tarefa duplicada', () => {

            const task = testData.dup

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            // Dado que eu tenho uma tarefa duplicada
            cy.createTask(task.name)

            // Quando faço o cadastro dessa tarefa
            cy.createTask(task.name)

            // Então veja a mensagem de duplicidade
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it('Campo obrigatório', () => {
            cy.createTask()

            cy.isRequired('This is a required field')
        })
    })
    context('atualização', ()=> {
        it('Deve concluir uma tarefa', () => {
            const task = {
                name: 'Pagar contas de consumo',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('exclusão', ()=> {
        it('Deve remover uma tarefa', () => {
            const task = {
                name: 'Estudar Javascript',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})

