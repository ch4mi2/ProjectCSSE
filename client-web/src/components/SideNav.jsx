import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import man from '../assets/man.png';
import dashboard from '../assets/dashboard.png';
import policy from '../assets/policy.png';
import setting from '../assets/settings.png';
import procurement from '../assets/procurement.png';

const SideNav = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(location.pathname);

  console.log(man);
  console.log(dashboard);
  console.log(setting);
  // console.log(procurement)

  const handleNavItemClick = (path) => {
    setActiveNavItem(path);
  };

  // Example user data (replace with actual user data)
  const user = {
    name: 'John Doe',
    imageUrl: '../', // Replace with the actual path to the user's image
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-black">
      <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-[#f4ca40]">
        {/* Company Name */}
        <div className="sidebar-header flex flex-col items-center justify-center py-4 overflow-auto">
          <div className="inline-flex">
            <a href="#" className="inline-flex flex-row items-center">
              <span className="leading-10 text-black text-2xl font-bold ml-1 uppercase">
                Power-Up Build
              </span>
            </a>
          </div>
          {/* User Image */}
          <div className="mt-4 rounded-full overflow-hidden w-20 h-20">
            <img
              src={man}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* User Name */}
          <p className="mt-2 text-gray-800">{user.name}</p>
        </div>

        {/* Sidebar Content */}
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <Link
                to="/dashboard"
                className={`flex flex-row items-center h-10 px-3 rounded-lg text-black ${
                  activeNavItem === '/dashboard' ? 'bg-[#ffefbb]' : ''
                }`}
                onClick={() => handleNavItemClick('/dashboard')}
              >
                <img src={dashboard} className="w-8 h-8" />
                <span
                  className={`ml-3 ${
                    activeNavItem === '/dashboard' ? 'text-black' : ''
                  }`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/policies"
                className={`flex flex-row items-center h-10 px-3 rounded-lg text-black ${
                  activeNavItem === '/policies' ? 'bg-[#ffefbb]' : ''
                }`}
                onClick={() => handleNavItemClick('/policies')}
              >
                <img src={policy} className="w-8 h-8" />
                <span
                  className={`ml-3 ${
                    activeNavItem === '/policies' ? 'text-black' : ''
                  }`}
                >
                  Policies
                </span>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/procurement"
                className={`flex flex-row items-center h-10 px-3 rounded-lg text-black ${
                  activeNavItem === '/procurement' ? 'bg-[#ffefbb]' : ''
                }`}
                onClick={() => handleNavItemClick('/procurement')}
              >
                <img src={procurement} className="w-8 h-8" />
                <span
                  className={`ml-3 ${
                    activeNavItem === '/procurement' ? 'text-black' : ''
                  }`}
                >
                  Procurement
                </span>
              </Link>
            </li>
            {/* Add more navigation items as needed */}
            <li className="my-px">
              <Link
                to="/"
                className={`flex flex-row items-center h-10 px-3 rounded-lg text-black ${
                  activeNavItem === '/page3' ? 'bg-[#ffefbb]' : ''
                }`}
                onClick={() => handleNavItemClick('/page3')}
              >
                <img src={setting} className="w-8 h-8" />
                <span
                  className={`ml-3 ${
                    activeNavItem === '/page3' ? 'text-black' : ''
                  }`}
                >
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
