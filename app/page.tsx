'use client';

import React, { useState, useEffect } from 'react';

const Home = () => {
    const [joke, setJoke] = useState('Loading...');

    useEffect(() => {
        async function fetchJoke() {
            try {
                const response = await fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
                const data = await response.json();
                if (response.ok) {
                    if (data.type === "single") {
                        setJoke(data.joke);
                    } else {
                        setJoke(data.setup + " " + data.delivery);
                    }
                } else {
                    setJoke(data.error);
                }
            } catch (error) {
                setJoke("Failed to fetch joke. An unexpected error occurred.");
            }
        }

        fetchJoke();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8" style={{
            backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4)), url("https://www.shutterstock.com/shutterstock/videos/1101144295/thumb/1.jpg?ip=x480")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 text-center bg-opacity-75">
                <h1 className="text-5xl font-bold mb-6 text-gray-800">Hello World!</h1>
                <h2 className="text-3xl font-semibold mb-4 text-gray-600">Groep 5 pagina.</h2>
                <p className="text-xl text-gray-500">{joke}</p>
            </div>
        </main>
    );
};

export default Home;