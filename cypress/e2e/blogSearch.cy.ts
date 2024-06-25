describe("Blog Search and Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("body").click("topRight");
  });

  it("Performs blog search and verifies search results", () => {
    // Open search trigger
    cy.get("[data-search-trigger]").click();

    const searchText = "How to build an Application with modern Technology";

    // Type search text into the input
    cy.get("#searchInput").type(searchText);

    // Ensure the search result group title is "Blog"
    cy.get(".search-result-group-title").should("contain", "Blog");

    // Verify each search result item
    cy.get(".search-result-item").each(($item, index) => {
      cy.wrap($item).within(() => {
        cy.get(".search-result-item-title").should("contain", searchText);
        cy.get(".search-result-item-description").should(
          "contain",
          "meta description",
        );
        cy.get(".search-result-item-content").should(
          "contain",
          "Nemo vel ad consectetur",
        );
      });
    });

    // Click on the first search result item
    cy.get(".search-result-item-title").first().click();

    // Assert navigation to the correct URL or perform other validation
    cy.url().should("include", "/blog/post-1");

    // Return to home page
    cy.go("back");
  });
});
