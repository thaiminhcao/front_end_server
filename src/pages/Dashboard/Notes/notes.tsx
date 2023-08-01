import Layout from '../dashboard';
import { useState } from 'react';

interface Note {
    title: string;
    content: string;
}

const Index = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleAddNote = () => {
        if (editIndex !== null) {
            const newNotes = [...notes];
            newNotes[editIndex] = { title, content };
            setNotes(newNotes);
            setEditIndex(null);
        } else {
            setNotes([...notes, { title, content }]);
        }
        setTitle('');
        setContent('');
    };

    const handleEditNote = (index: number) => {
        setEditIndex(index);
        setTitle(notes[index].title);
        setContent(notes[index].content);
    };

    const handleDeleteNote = (index: number) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    return (
        <div><Layout />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Notes Work</h1>
                <div className="mb-4">
                    <input
                        className="border rounded w-full p-2 mb-2"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
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
                    onClick={handleAddNote}
                >
                    {editIndex !== null ? 'Update note' : 'Add new'}
                </button>
                <ul className="mt-4">
                    {notes.map((note, index) => (
                        <li key={index} className="border rounded p-2 mb-2">
                            <h2 className="font-bold">{note.title}</h2>
                            <p>{note.content}</p>
                            <div className="flex justify-end">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleEditNote(index)}
                                >
                                    Change
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDeleteNote(index)}
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

