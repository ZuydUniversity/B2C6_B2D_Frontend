'use client'
import React, { useState } from 'react';

const SearchButton: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('id', inputValue);

        // Get current URL and append query params
        let currentUrl = window.location.href.split('?')[0];
        currentUrl += '?' + queryParams.toString();

        // Navigate to the updated URL
        window.location.href = currentUrl;
    };

    const handleButtonClickLastName = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('lastname', inputValue);

        // Get current URL and append query params
        let currentUrl = window.location.href.split('?')[0];
        currentUrl += '?' + queryParams.toString();

        // Navigate to the updated URL
        window.location.href = currentUrl;
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Voer ID of Achternaam in"
            />
            <br />
            <button onClick={handleButtonClick}>Zoek op ID</button>
            <br />
            <button onClick={handleButtonClickLastName}>Zoek op achternaam</button>
            <br /><br />
        </div>

    );
};

export default SearchButton;
