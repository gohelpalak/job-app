import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="py-4 w-full border-b border-gray-200">
            <div className="container mx-auto px-4 max-w-[1320px]">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600">Job Manager</Link>

                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="text-gray-600 hover:text-blue-600">Jobs</Link>
                        </li>
                        <li>
                            <Link to="/add" className="text-gray-600 hover:text-blue-600">Add Job</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 