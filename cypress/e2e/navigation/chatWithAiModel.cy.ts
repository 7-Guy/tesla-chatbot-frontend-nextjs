describe('chat and chat history tests', () => {
    const aiBackendUrl = Cypress.env('aiBackendUrl');
    const interceptUpdateModelsUrl = `${aiBackendUrl}/api/tags`;
    const generateResponseUrl = `${aiBackendUrl}/api/generate`;
    const generateFollowingResponseUrl = `${aiBackendUrl}/api/chat`;


    beforeEach(() => {
        cy.visit('/');
    });

    it('chat not possible when no model available', () => {
        cy.intercept('GET', interceptUpdateModelsUrl, {
            statusCode: 200,
            body: {
                "models": []
            }
        });
        cy.get('#select-model-error-text').should('have.text', 'Select an AI Model first before starting a discussion');
        cy.get('#select-model-button').click();
        cy.location('pathname').should('eq', '/ai-models');

    });

    it('ask 2 questions - generated responses should be displayed', () => {
        setAvailableModel("deepseek-llm:7b");

        cy.get('#activate-discussion-button').click();

        setInitialGeneratedResponse("Simulated response for question 1");
        cy.get('#outlined-textarea').click();
        cy.get('#outlined-textarea').type('question 1');
        cy.get('.MuiButton-outlinedPrimary').click();
        cy.wait('@generateResponse').its('response.statusCode').should('eq', 200);

        setFollowingGeneratedResponse("Simulated response for question 2");
        cy.get('#outlined-textarea').click();
        cy.get('#outlined-textarea').type('question 2');
        cy.get('.MuiButton-outlinedPrimary').click();
        cy.wait('@generateNextResponse').its('response.statusCode').should('eq', 200);
    });

    it('activate chat - finish without asking questions ', () => {
        setAvailableModel("deepseek-llm:7b");
        cy.get('#activate-discussion-button').click();
        cy.get('#finish-discussion-button').click();
    })

    it('activate chat - ask question and finish', () => {
        activateChatAndAskOneQuestion();
        cy.get('#finish-discussion-button').click();

    })

    it('activate chat - ask question - finish - reactivate', () => {
        activateChatAndAskOneQuestion();
        cy.get('#finish-discussion-button').click();

        cy.get('#tab-history').click();
        cy.get('#chat-history-viewer-table')
            .find('tbody tr')
            .should('have.length', 1);
        cy.get('#chat-history-viewer-table-body-cell-topic-0').should('have.text', 'Dummy topic');
        cy.get('#chat-history-viewer-reactivate-button-0').click();
        cy.get('#\\30 -question-card > p').should('have.text', 'question 1');

        setFollowingGeneratedResponse("Simulated response for question 2");

        cy.get('#outlined-textarea').click();
        cy.get('#add-question-button').click();
        cy.get('#\\31 -answer-card > p').should('have.text', 'Simulated response for question 2');
        cy.get('#finish-discussion-button').click();
        cy.get('#tab-history').click();
        cy.get('#chat-history-viewer-table')
            .find('tbody tr')
            .should('have.length', 1);
        cy.get('#chat-history-viewer-table-body-cell-questions-0').should('have.text', '2');
    })

    function activateChatAndAskOneQuestion() {
        setAvailableModel("deepseek-llm:7b");
        cy.get('#activate-discussion-button').click();
        cy.get('#outlined-textarea').click();
        cy.get('#outlined-textarea').type('question 1');
        setInitialGeneratedResponse("Simulated response for question 1");
        cy.get('.MuiButton-outlinedPrimary').click();
        cy.wait('@generateResponse').its('response.statusCode').should('eq', 200);
        setInitialGeneratedResponse("Dummy topic");
    }

    function setInitialGeneratedResponse(response: string) {
        cy.intercept('POST', generateResponseUrl, {
            statusCode: 200,
            body: {
                "model": "deepseek-llm:7b",
                "created_at": "2025-03-31T21:37:00.70627Z",
                "response": `${response}`,
                "done": true,
                "done_reason": "stop",
                "total_duration": 16088054958,
                "load_duration": 1332334750,
                "prompt_eval_count": 30,
                "prompt_eval_duration": 1859000000,
                "eval_count": 391,
                "eval_duration": 12895000000
            }
        }).as('generateResponse');
    }

    function setFollowingGeneratedResponse(response: string) {
        cy.intercept('POST', generateFollowingResponseUrl, {
            statusCode: 200,
            body: {
                "model": "deepseek-llm:7b",
                "created_at": "2025-03-31T22:04:15.069289Z",
                "message": {
                    "role": "assistant",
                    "content": `${response}`
                },
                "done_reason": "stop",
                "done": true,
                "total_duration": 7581197708,
                "load_duration": 1352515708,
                "prompt_eval_count": 437,
                "prompt_eval_duration": 3286000000,
                "eval_count": 84,
                "eval_duration": 2821000000
            }
        }).as('generateNextResponse');
    }

    function setAvailableModel(availableModel: string) {
        cy.intercept('GET', interceptUpdateModelsUrl, {
            statusCode: 200,
            body: {
                "models": [
                    {
                        "name": `${availableModel}`,
                        "model": `${availableModel}`,
                        "modified_at": "2025-03-10T23:04:20.234696025+01:00",
                        "size": 4920738407,
                        "digest": "28f8fd6cdc677661426adab9338ce3c013d7e69a5bea9e704b364171a5d61a10",
                        "details": {
                            "parent_model": "",
                            "format": "gguf",
                            "family": "llama",
                            "families": [
                                "llama"
                            ],
                            "parameter_size": "8.0B",
                            "quantization_level": "Q4_K_M"
                        }
                    }
                ]
            }
        });

    }
});