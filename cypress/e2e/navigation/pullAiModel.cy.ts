describe('Pull new ai model', () => {
    const aiBackendUrl = Cypress.env('aiBackendUrl');
    const interceptUpdateModelsUrl = `${aiBackendUrl}/api/tags`;
    const interceptPullModelUrl = `${aiBackendUrl}/api/model`;


    beforeEach(() => {
        cy.visit('/ai-models');
        cy.log(interceptUpdateModelsUrl);
        cy.intercept('GET', interceptUpdateModelsUrl, {
            statusCode: 200,
            body: {
                "models": [
                    {
                        "name": "deepseek-r1:8b",
                        "model": "deepseek-r1:8b",
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
    });

    it('pull not existing ai model', () => {
        cy.log(interceptUpdateModelsUrl)
        cy.intercept('POST', interceptPullModelUrl, {
            statusCode: 500,
            body: {
                "error": "pull model manifest: file does not exist"
            }
        }).as('pullModel');

        cy.get('.MuiStack-root > .MuiButtonBase-root').click();
        cy.get('#model_name').type('not existing model');
        cy.get('.MuiDialogContent-root > .MuiButtonBase-root').click();
        cy.get('.MuiTypography-body1').should('have.text', 'deepseek-r1:8b');
    });

    it('pull existing ai model', () => {
        cy.log(interceptUpdateModelsUrl);
        cy.intercept('POST', interceptPullModelUrl, {
            statusCode: 200,
            body: {
                "success": true,
                "modelName": "deepseek-llm:7b"
            }
        }).as('pullModel');

        cy.log(interceptUpdateModelsUrl);
        cy.intercept('GET', interceptUpdateModelsUrl, {
            statusCode: 200,
            body: {
                "models": [
                    {
                        "name": "deepseek-llm:7b",
                        "model": "deepseek-llm:7b",
                        "modified_at": "2025-03-25T08:47:46.737142309+01:00",
                        "size": 4000473688,
                        "digest": "9aab369a853bb12b8187d14eca701385f0a564cd2ae938fb4cbdb31bf2d43fc2",
                        "details": {
                            "parent_model": "",
                            "format": "gguf",
                            "family": "llama",
                            "families": null,
                            "parameter_size": "7B",
                            "quantization_level": "Q4_0"
                        }
                    },
                    {
                        "name": "deepseek-r1:8b",
                        "model": "deepseek-r1:8b",
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
        }).as('updateModelList');

        cy.get('.MuiStack-root > .MuiButtonBase-root').click();
        cy.get('#model_name').type('not existing model');
        cy.get('.MuiDialogContent-root > .MuiButtonBase-root').click();

        cy.get(':nth-child(1) > .MuiListItemText-root > .MuiTypography-body1').should('have.text', 'deepseek-llm:7b');
    });
});