import {defineConfig} from "cypress";

export default defineConfig({
    projectId: 'y9373r',
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents() {
            // implement node event listeners here
        },
        experimentalStudio: true,
    },
    env: {
        aiBackendUrl: 'http://localhost:11434'
    }
});
