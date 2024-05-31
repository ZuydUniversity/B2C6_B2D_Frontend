import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

expect.extend({
    toBeInTheDocument(received) {
        if (document.body.contains(received)) {
            return {
                message: () => `expected ${received} not to be in the document`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to be in the document`,
                pass: false,
            };
        }
    },
});

describe('Home', () => {
    it('renders a paragraph', () => {
        render(<Home />);

        // Assert that a paragraph with the text 'Hello World!' is rendered
        expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });
});