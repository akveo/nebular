describe('packages-smoke app', () => {
  it('should load successfully', () => {
    // Visit the app with generous timeout for CI
    cy.visit('/', {
      timeout: 60000,
    });

    // Wait for the page to load completely
    cy.get('body', { timeout: 30000 }).should('be.visible');

    // Wait for Angular to bootstrap - check for either bs-root or the content
    cy.get('bs-root', { timeout: 30000 }).should('exist').and('be.visible');

    // Finally check for the actual content with a generous timeout
    cy.get('bs-root', { timeout: 20000 }).should('contain.text', 'Nebular Works!!!');
  });
});
