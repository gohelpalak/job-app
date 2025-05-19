import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import AddJob from './components/AddJob';
import EditJob from './components/EditJob';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 max-w-[1320px]">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/add" element={<AddJob />} />
            <Route path="/edit/:id" element={<EditJob />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
