import { useState, ChangeEvent } from 'react';
import Layout from '../dashboard';

import Modal from 'react-modal';

type ScheduleType = {
    [day: string]: {
        morning: {
            task: string;
            estimate: string;
            estimateMinutes: string;
        };
        afternoon: {
            task: string;
            estimate: string;
            estimateMinutes: string;
        };
        relax: {
            task: string;
            estimate: string;
            estimateMinutes: string;
        };
    };
};


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
    },
};

const Index = () => {
    const [schedule, setSchedule] = useState<ScheduleType>(
        daysOfWeek.reduce((acc, day) => {
            acc[day] = {
                morning: { task: '', estimate: '', estimateMinutes: '' },
                afternoon: { task: '', estimate: '', estimateMinutes: '' },
                relax: { task: '', estimate: '', estimateMinutes: '' },
            };
            return acc;
        }, {} as ScheduleType)
    );

    const [selectedTime, setSelectedTime] = useState<{ day: string; timeOfDay: 'morning' | 'afternoon' | 'relax' }>({ day: daysOfWeek[0], timeOfDay: 'morning' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, day: string, timeOfDay: 'morning' | 'afternoon' | 'relax') => {
        const { name, value } = event.target;
        if (name === 'estimateMinutes') {
            setSchedule((prevSchedule) => ({
                ...prevSchedule,
                [day]: { ...prevSchedule[day], [timeOfDay]: { ...prevSchedule[day][timeOfDay], estimateMinutes: value } },
            }));
        } else {
            setSchedule((prevSchedule) => ({
                ...prevSchedule,
                [day]: { ...prevSchedule[day], [timeOfDay]: { ...prevSchedule[day][timeOfDay], [name]: value } },
            }));
        }
    };


    return (
        <div>
            <Layout />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Weekly Schedule</h1>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Day</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Morning</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Afternoon</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Relax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daysOfWeek.map((day) => (
                            <tr key={day} className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 border-b border-grey-light">{day}</td>
                                <td
                                    className={`py-4 px-6 border-b border-r border-l border-t border-grey-light ${selectedTime.day === day && selectedTime.timeOfDay === 'morning' ? 'bg-blue-500' : schedule[day].morning.task ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    onClick={() => {
                                        setSelectedTime({ day, timeOfDay: 'morning' });
                                        setIsModalOpen(true);
                                    }}
                                ></td>
                                <td
                                    className={`py-4 px-6 border-b border-r border-t border-grey-light ${selectedTime.day === day && selectedTime.timeOfDay === 'afternoon'
                                        ? 'bg-blue-500'
                                        : schedule[day].afternoon.task
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                        }`}
                                    onClick={() => {
                                        setSelectedTime({ day, timeOfDay: 'afternoon' });
                                        setIsModalOpen(true);
                                    }}
                                ></td>
                                <td
                                    className={`py-4 px-6 border-b border-r border-t border-grey-light ${selectedTime.day === day && selectedTime.timeOfDay === 'relax' ? 'bg-blue-500' : schedule[day].relax.task ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    onClick={() => {
                                        setSelectedTime({ day, timeOfDay: 'relax' });
                                        setIsModalOpen(true);
                                    }}
                                ></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customStyles}>
                <div className="bg-white rounded-lg p-4">
                    <h2 className="text-lg font-medium mb-2">Enter Task and Estimate</h2>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-medium mb-1">Task:</label>
                        <input
                            type="text"
                            name="task"
                            value={schedule[selectedTime.day][selectedTime.timeOfDay].task}
                            onChange={(event) => handleInputChange(event, selectedTime.day, selectedTime.timeOfDay)}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-medium mb-1">Estimate (hours):</label>
                        <input
                            type="number"
                            name="estimate"
                            value={schedule[selectedTime.day][selectedTime.timeOfDay].estimate}
                            onChange={(event) => handleInputChange(event, selectedTime.day, selectedTime.timeOfDay)}
                            className="border rounded w-full py-2 px-3"
                            min={0}
                            max={6}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Estimate (minutes):</label>
                        <input
                            type="number"
                            name="estimateMinutes"
                            value={schedule[selectedTime.day][selectedTime.timeOfDay].estimateMinutes}
                            onChange={(event) => handleInputChange(event, selectedTime.day, selectedTime.timeOfDay)}
                            className="border rounded w-full py-2 px-3"
                            min={0}
                            max={59}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(false)}>
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>


        </div>
    );
};





export default Index;
