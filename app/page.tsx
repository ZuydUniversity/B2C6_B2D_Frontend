import React from 'react';
import Layout from './layout';

const HomePage = () => {
    return (
        <Layout>
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="top-300 text-3xl text-center">
                    Hello World!
                </p>
            </div>
        </Layout>
    );
};

export default HomePage;