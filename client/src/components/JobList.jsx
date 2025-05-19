import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/jobs`);
                setJobs(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Failed to load jobs. Please try again later.');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleDelete = async(id)=>{
        try {
            await axios.delete(`http://localhost:5001/api/jobs/${id}`);
            setJobs(jobs.filter(job => job._id !== id));
        } catch (error) {
            console.error('Error deleting job:', error);
            setError('Failed to delete job. Please try again.');
        }
    }
 
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 text-sm sm:text-base">{error}</div>;
    }

    return (
        <div className="w-full mt-6">
            {/* Header Section */}
            <div className="bg-blue-600 text-white p-4 sm:p-6 rounded-md mb-6">
                <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Job Listings</h1>
               
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    

                   
                    <Link
                        to="/add"
                        className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-3 sm:px-4 rounded-md transition flex items-center justify-center whitespace-nowrap text-sm sm:text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Job
                    </Link>
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-gray-700 font-normal text-sm sm:text-base">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
                </h2>
            </div>

            {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8 text-center border border-gray-200">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-700">No Jobs Found</h2>
                    <p className="text-gray-500 mb-6 text-sm sm:text-base">
                        {searchTerm ? `No jobs match your search for "${searchTerm}"` : "You haven't added any jobs yet."}
                    </p>
                    <Link to="/add" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:px-6 rounded-md transition inline-flex items-center text-sm sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Job
                    </Link>
                </div>
            ) : (
                <div>
                    {filteredJobs.map(job => (
                        <div key={job._id} className="bg-white rounded-md shadow-sm border border-gray-200 mb-4 overflow-hidden">
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-blue-600 font-medium">
                                        {job.title}
                                    </h3>
                                    <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                                        Active
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-3 text-sm">{job.description}</p>
                                <div className="flex items-center text-gray-500 text-xs mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        to={`/edit/${job._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default JobList; 