import PoliciesDetails from '../components/PoliciesDetails';
import { useEffect, useState } from 'react';
import { usePoliciesContext } from '../hooks/usePoliciesContext';

const Policies = () => {
  const [search, setSearch] = useState('');
  const { dispatch } = usePoliciesContext();

  useEffect(() => {
    dispatch({ type: 'FILTER_POLICIES', name: search });
  }, [search]);
  return (
    <div>
      <div className="px-10 pt-10 flex flex-row">
        <div className="basis-1/2">
          <h1 className="font-sans font-bold text-2xl leading-7">
            Policies and Procedures
          </h1>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <br />
      <PoliciesDetails />
    </div>
  );
};

export default Policies;
