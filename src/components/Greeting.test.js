import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

// For grouping test use describe block
// describe is known as a test suite
describe('Greeting Component', () => { 
    test('Render Hello World as a text', () => {
        // Arrange - Set up the test data, test conditions, and test environment
        render(<Greeting />);

        // Act - Run logic that should be tested (e.g. execute function)
        // ... nothing

        // Assert - Compare execution results with expected results.
        const helloWorldElement = screen.getByText(/Hello, World!/i);
        expect(helloWorldElement).toBeInTheDocument();
    });

    test('Render the paragraph (Welcome to our application) if button is NOT clicked', () => {
        // Arrange
        render(<Greeting />);

        // Act

        // Assert
        const paragraphText = screen.getByText('Welcome to our application.', {exact: false});
        expect(paragraphText).toBeInTheDocument();
    });

    test('Render the paragraph (Have a great day!) if button is clicked', () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonElement = screen.getByRole('button', {name: 'Change Text'});
        userEvent.click(buttonElement);

        // Assert
        const paragraphText = screen.getByText('Have a great day!', {exact: false});
        expect(paragraphText).toBeInTheDocument();
    });

     test('The paragraph (Welcome to our application) should not be visible when button is clicked', () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonElement = screen.getByRole('button', {name: 'Change Text'});
        userEvent.click(buttonElement);

        // Assert
        const paragraphText = screen.queryByText('Welcome to our application.', {exact: false});
        expect(paragraphText).toBeNull();
    });

});

