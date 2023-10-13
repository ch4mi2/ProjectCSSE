import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Page2 from '../pages/Page2';
import SideNav from '../components/SideNav';
import Procurement from '../pages/Procurement';
import Comments from '../pages/Comments';
import Policies from '../pages/Policies';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>

      <div className="flex">
        {/* SideNav */}
        <div className="w-64 md:shadow ">
          <SideNav />
        </div>

        {/* Content */}
        <div className="flex-grow p-4">
          {' '}
          {/* Use flex-grow to make the content take up remaining space */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/procurement" element={<Procurement />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/page2" element={<Page2 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
