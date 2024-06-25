describe("Form Submission", () => {
  beforeEach(() => {
    cy.visit("/contact");
    cy.get("form").click();
  });

  it("Submits the form with valid data", () => {
    cy.get('input[name="name"]').type("John Doe");

    // Type into the email input field
    cy.get('input[name="email"]').type("john.doe@example.com");

    // Type into the message textarea field
    cy.get('textarea[name="message"]').type("This is a test message.");

    // Submit the form
    cy.get("form").submit();

    // After submission, assert that the input fields are empty
    cy.get('input[name="name"]').should("have.value", "");
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('textarea[name="message"]').should("have.value", "");
  });
});
