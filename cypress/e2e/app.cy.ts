describe("User Management App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display users from users.json", () => {
    cy.get("table").contains("td", "jdoe");
  });

  it("should add a user manually", () => {
    cy.get('input[name="username"]').type("newuser");
    cy.get('input[name="firstName"]').type("New");
    cy.get('input[name="lastName"]').type("User");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('button[type="submit"]').click();
    cy.get("table").contains("td", "newuser");
  });

  it("should generate a random user and add it to the table after submit", () => {
    // Intercept the API request triggered by the "Generate" button
    cy.intercept("GET", "https://random-data-api.com/api/v2/users").as(
      "getRandomUser"
    );

    // Click the "Generate" button to trigger the API call
    cy.get('button[type="button"]').contains("Generate").click();

    // Wait for the API call to complete
    cy.wait("@getRandomUser");

    // Capture the initial row count of the table
    cy.get("table tbody tr")
      .its("length")
      .then((initialRowCount) => {
        // Define an empty object to store the generated user data
        let generatedUser = {
          username: "",
          firstName: "",
          lastName: "",
          email: "",
        };

        // Capture the values after they are populated into the input fields
        cy.get('input[name="username"]')
          .invoke("val")
          .then((val) => {
            generatedUser.username = val as string;
          });
        cy.get('input[name="firstName"]')
          .invoke("val")
          .then((val) => {
            generatedUser.firstName = val as string;
          });
        cy.get('input[name="lastName"]')
          .invoke("val")
          .then((val) => {
            generatedUser.lastName = val as string;
          });
        cy.get('input[name="email"]')
          .invoke("val")
          .then((val) => {
            generatedUser.email = val as string;
          });

        // Submit the form after the inputs are populated
        cy.get('button[type="submit"]').click();

        cy.log("username", generatedUser);

        // Wait for the table to have one more row
        cy.get("table tbody tr")
          .should("have.length", initialRowCount + 1)
          .then(() => {
            // After submitting, verify that the user has been added to the table
            cy.get("table").contains("td", generatedUser.username);
            cy.get("table").contains("td", generatedUser.firstName);
            cy.get("table").contains("td", generatedUser.lastName);
            cy.get("table").contains("td", generatedUser.email);
          });
      });
  });
});
