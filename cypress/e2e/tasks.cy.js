/// <reference types="cypress" />

import {faker} from '@faker-js/faker'

describe('tasks', () => {
    it('deve cadastrar uma nova tarefa', ()=> {
        cy.visit('http://localhost:3000')

        cy.get('input[placeholder="Add a new Task"]')
            .type(faker.git.branch()) // 'feed-parse' 

        // cy.get('._listButtonNewTask_1y0mp_40')
        cy.contains('button', 'Create').click()

    })
})