import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountPage from '../app/account/page';

describe('AccountPage', () => {
    it('renders the account page correctly', () => {
        render(<AccountPage />);
        expect(screen.getByText('Notities')).toBeInTheDocument();
    });

    it('shows error message on form submission with empty fields', () => {
        render(<AccountPage />);

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('All fields are required')).toBeInTheDocument();
    });

    // Add more tests as needed
});