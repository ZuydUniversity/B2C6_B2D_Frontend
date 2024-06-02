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
                    if (data.type == "single") {
                        setJoke(data.joke);
                    }
                    else {
                        setJoke(data.setup + " " + data.delivery)
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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-5xl items-center justify-center mt-8">
                <p className="text-6xl text-center">
                    Hello World!
                </p>
                <p className="text-2xl text-center">
                    {joke}
                </p>
            </div>
        </main>
    );
};

export default Home;