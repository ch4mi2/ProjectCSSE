import ItemDetails from '../components/ItemDetails';
import { useLocation } from 'react-router-dom';
import SiteDetails from '../components/SiteDetails';
import { useEffect, useState } from 'react';

const Page2 = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(null);

  useEffect(() => {
    setActiveNavItem(location.type);
  }, []);

  return (
    <div>
      <div className="px-10 pt-10 flex flex-row">
        <div className="basis-1/2">
          <h1 className="font-sans font-bold text-2xl leading-7">
            Policies and Procedures
          </h1>
          <h2 className="font-sans font-bold text-2xl leading-7 text-slate-500">
            Item List
          </h2>
        </div>
        <div className="mx-60 basis-1/2">
          <div className="relative flex items-end w-full h-12 rounded-lg focus-within:shadow-lg bg-[#e5e7eb] overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[#e5e7eb]"
              type="text"
              id="search"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      {activeNavItem === 'item' ? <ItemDetails /> : <SiteDetails />}
    </div>
  );
};

export default Page2;
