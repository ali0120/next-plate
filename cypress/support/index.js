import "./commands";

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore specific errors that you know are related to hydration but are not critical for the test
    if (err.message.includes('Hydration failed')) {
      return false; // This prevents Cypress from failing the test
    }
  });

  Cypress.Server.defaults({
    delay: 500,
    force404: false,
    ignore: (xhr) => true,
});

// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML =
        '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');

    app.document.head.appendChild(style);
}