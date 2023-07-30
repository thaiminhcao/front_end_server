// import React from 'react';
import Layout from '../dashboard';
import { useEffect, useState } from 'react';
const Index = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/your-api-url')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);
    return (
        <div>
            <Layout />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Welcome to Man Managerment</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-md shadow p-6">
                        <h2 className="text-xl font-semibold mb-2">Recent Plan</h2>
                        <ul className="list-disc list-inside">
                            <li>Project 1</li>
                            <li>Project 2</li>
                            <li>Project 3</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-md shadow p-6">
                        <h2 className="text-xl font-semibold mb-2">Notes</h2>
                        <ul className="list-disc list-inside">
                            <li>Report 1</li>
                            <li>Report 2</li>
                            <li>Report 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Index;
