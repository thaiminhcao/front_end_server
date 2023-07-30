// import React from 'react';
import Layout from '../dashboard';

import { useState } from 'react';

interface Plan {
    title: string;
    startDate: string;
    endDate: string;
    content: string;
}

const Index = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [content, setContent] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleAddPlan = () => {
        if (new Date(startDate) > new Date(endDate)) {
            alert('The start date cannot be after the end date!');
            return;
        }
        if (editIndex !== null) {
            const newPlans = [...plans];
            newPlans[editIndex] = { title, startDate, endDate, content };
            setPlans(newPlans);
            setEditIndex(null);
        } else {
            setPlans([...plans, { title, startDate, endDate, content }]);
        }
        setTitle('');
        setStartDate('');
        setEndDate('');
        setContent('');
    };

    const handleEditPlan = (index: number) => {
        setEditIndex(index);
        setTitle(plans[index].title);
        setStartDate(plans[index].startDate);
        setEndDate(plans[index].endDate);
        setContent(plans[index].content);
    };

    const handleDeletePlan = (index: number) => {
        setPlans(plans.filter((_, i) => i !== index));
    };

    return (
        <div><Layout />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Work plan</h1>
                <div className="mb-4">
                    <input
                        className="border rounded w-full p-2 mb-2"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        className="border rounded w-full p-2 mb-2"
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                    <input
                        className="border rounded w-full p-2 mb-2"
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                    <textarea
                        className="border rounded w-full p-2"
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <button
                    className={`px-4 py-2 rounded ${editIndex !== null ? 'bg-green-500' : 'bg-blue-500'
                        } text-white`}
                    onClick={handleAddPlan}
                >
                    {editIndex !== null ? 'Update plan' : 'Add new'}
                </button>
                <ul className="mt-4">
                    {plans.map((plan, index) => (
                        <li key={index} className="border rounded p-2 mb-2">
                            <h2 className="font-bold">{plan.title}</h2>
                            <p>
                                From {new Date(plan.startDate).toLocaleDateString()} to {' '}
                                {new Date(plan.endDate).toLocaleDateString()}
                            </p>
                            <p>{plan.content}</p>
                            <div className="flex justify-end">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleEditPlan(index)}
                                >
                                    Change
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDeletePlan(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default Index;

