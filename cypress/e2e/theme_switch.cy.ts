describe("Theme Switcher", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("body").click("topRight");
  });
  it("Switches between dark and light themes", () => {
    // Ensure the initial theme is light
    cy.get("#theme-switcher").should("not.be.checked");

    // Click on the theme switcher to toggle to dark theme
    cy.get("#theme-switcher").click({ force: true });

    // Check if the theme has switched to dark
    cy.get("#theme-switcher").should("be.checked");

    cy.wait(2000);

    // Click again to toggle back to light theme
    cy.get("#theme-switcher").click({ force: true });

    // Check if the theme has switched back to light
    cy.get("#theme-switcher").should("not.be.checked");
  });
});
