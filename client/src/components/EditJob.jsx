import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function EditJob() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/jobs/${id}`);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setLoading(false);
            } catch (error) {
                setError('Error fetching job details');
                setLoading(false);
                console.error('Error fetching job:', error);
            }
        };

        fetchJob();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await axios.put(`http://localhost:5001/api/jobs/${id}`, {
                title,
                description
            });
            navigate('/');
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Error updating job:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <div className="bg-blue-600 text-white p-4 sm:p-6 rounded-md mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Edit Job</h1>
                <p className="text-blue-100 mt-1 text-sm sm:text-base">Update job information</p>
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
                        Update Job
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditJob; 