# Installation

To install the dependencies and run the app, please run following commands in the root of the project.

To install the dependencies

```
yarn
```

To run the project in local.

```
yarn dev
```

To run the tests

```
yarn cy:open
```

## Live Link

Click [here](https://user-management-app-five-fawn.vercel.app/) to visit live deployed app.

# Thought Process

Understanding Requirements: The first step was to clearly understand the requirements of the user management app I focused on ensuring both functionality and user experience.

Validating Inputs: I implemented real-time validation to enhance user experience, providing instant feedback as users interacted with the form. This involved checking for required fields and validating the email format.

User Feedback: I included error messages and success notifications to improve usability, ensuring users are aware of validation states.

# Future Improvements

Testing Suite: I would expand the testing suite with more comprehensive unit tests for individual components and integration tests for the overall functionality, ensuring the app behaves as expected under various conditions.

Styling and Theming: I would invest more time in refining the UI and UX design, potentially implementing a custom theme with Material UI to enhance visual consistency and responsiveness across different devices.


# Tools & Libraries used

React Final Form: Used for its simplicity and efficiency in handling form state and validation, allowing for a clean implementation of form logic without much boilerplate.

Material UI: This library was chosen for its robust component library that enables rapid development of visually appealing UIs with responsive design capabilities.

Axios: Utilized for making API calls due to its promise-based structure and easy handling of requests and responses.

Cypress: Selected for end-to-end testing because of its ease of use and powerful capabilities for testing user interactions and application behavior.