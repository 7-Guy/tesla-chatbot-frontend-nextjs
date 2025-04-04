describe('test prompt management', () => {
    let examplePerson: string;
    let exampleUserQuestion: string;
    let defaultText: string;

    beforeEach(() => {
        cy.visit('/prompt-management')
        cy.get('#example-person').invoke('text').then((text) => {
            examplePerson = text.replace('Example person: ', '');
        });
        cy.get('#example-user-question').invoke('text').then((text) => {
            exampleUserQuestion = text.replace('Example user question: ', '');
            defaultText = `Complete prompt text: Respond to the following question: '${exampleUserQuestion}' Formulate your response as if you were ${examplePerson}.`;
        });
    })

    it('check complete prompt text', () => {
        cy.get('#complete-prompt-text').invoke('text').then((text) => {
            expect(text).to.eq(defaultText);
        })
    })

    it('add building blocks and check complete text', () => {
        const additionalTextBlock1 = 'Really act as if you were ';
        const additionalTextBlock2 = '!';
        cy.get('#4-add-button').click();
        cy.get('#5-building-block-prompt-input').type(`${additionalTextBlock1}`);
        cy.get('#5-add-button').click();
        cy.get('#6-building-block-person-button').click();
        cy.get('#6-add-button').click();
        cy.get('#7-building-block-prompt-input').type(`${additionalTextBlock2}`);
        cy.get('#complete-prompt-text').invoke('text').then((text) => {
            const updatedCompleteText = `${defaultText}${additionalTextBlock1}${examplePerson}${additionalTextBlock2}`;
            expect(text).to.eq(updatedCompleteText);
        })
    })

    it('delete all building blocks and create new text', () => {
        const textBlock1 = 'BLOCK1';
        const textBlock2 = 'BLOCK2';
        cy.get('#4-delete-building-block-button').click();
        cy.get('#3-delete-building-block-button').click();
        cy.get('#2-delete-building-block-button').click();
        cy.get('#1-delete-building-block-button').click();
        cy.get('#0-delete-building-block-button').click();
        cy.get('#0-add-button').click();
        cy.get('#0-building-block-prompt-input').type(`${textBlock1}`);
        cy.get('#0-add-button').click();
        cy.get('#1-building-block-question-button').click();
        cy.get('#1-add-button').click();
        cy.get('#2-building-block-prompt-input').type(`${textBlock2}`);
        cy.get('#complete-prompt-text').invoke('text').then((text) => {
            const updatedCompleteText = `Complete prompt text: ${textBlock1}${exampleUserQuestion}${textBlock2}`;
            expect(text).to.eq(updatedCompleteText);
        })
    })

})
