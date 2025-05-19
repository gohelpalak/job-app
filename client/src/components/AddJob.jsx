import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddJob() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !description) {
            setError('Please fill in all fields');
            return;
        }

        try {
            console.log('Sending job data:', { title, description });
            const response = await axios.post(`http://localhost:5001/api/jobs`, {
                title,
                description
            });
            console.log('Server response:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
            setError(`Error adding job: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className="mt-6">
            <div className="bg-blue-600 text-white p-4 sm:p-6 rounded-md mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Add New Job</h1>
                <p className="text-blue-100 mt-1 text-sm sm:text-base">Create a new job posting</p>
            </div>

            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 sm:p-6">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 text-sm sm:text-base">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
                        >
                            Job Title
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
                        >
                            Job Description
                        </label>
                        <textarea
                            className="w-full border border-gray-300 rounded-md py-2 px-3 h-24 sm:h-32 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded transition text-sm sm:text-base"
                    >
                        Add Job
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddJob; 