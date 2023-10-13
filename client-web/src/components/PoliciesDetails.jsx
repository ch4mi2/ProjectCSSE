import { useEffect, useState } from 'react';
import { usePoliciesContext } from '../hooks/usePoliciesContext';
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';
import LoadingScreen from './LoadingScreen';

const PoliciesDetails = () => {
  const { policies, dispatch } = usePoliciesContext();
  const [deletePopup, setDeletePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(selectedPolicy?.amount);
  const [description, setDescription] = useState(selectedPolicy?.description);

  useEffect(() => {
    const fetchPolicies = async () => {
      const response = await fetch('/api/policies');
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        dispatch({ type: 'SET_POLICIES', payload: data });
        setLoading(false);
      } else {
        console.log('error');
      }
    };

    fetchPolicies();
  }, [dispatch]);

  const handleDelete = (id) => async () => {
    setLoading(true);
    setDeletePopup(false);
    const response = await fetch(`/api/policies/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      dispatch({ type: 'DELETE_POLICY', payload: data });
      setLoading(false);
    } else {
      console.log('error');
      setLoading(false);
    }
  };

  const handleUpdate = (id) => async () => {
    setLoading(true);
    setUpdatePopup(false);
    const payload = { amount, description };
    const response = await fetch(`/api/policies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      dispatch({ type: 'UPDATE_POLICY', payload: data });
      setLoading(false);
    } else {
      console.log('error');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=" relative mx-0 mt-4">
        <div className="bg-[#e5e7eb] mx-10 mt-4">
          <div className="relative overflow-x-auto shadow-md grid justify-items-center">
            <table className="w-11/12 text-md text-left text-gray-500 dark:text-gray-400 mx-10 my-10">
              <thead className="text-s text-black font-bold uppercase bg-[#f4ca40] ">
                <tr>
                  <th
                    scope="colgroup"
                    className="px-6 py-3 w-6/12 text-center pl-0"
                  >
                    Created Item/ Site
                  </th>
                  <th scope="col" className="px-6 py-3 w-2/12">
                    Created By
                  </th>
                  <th scope="col" className="px-6 py-3 w-2/12">
                    Amount (Rs.)/ Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/12"></th>
                  <th scope="col" className="px-6 py-3 w-1/12"></th>
                </tr>
              </thead>
              <tbody>
                {policies &&
                  policies.map((policy, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? 'border text-s text-black bg-[#ffefbb] border-[#f4ca40] '
                          : 'border text-s text-black bg-[#ffffff] border-[#f4ca40] '
                      }
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-row">
                          <div className="basis-2/3">
                            {policy.type === 'Item'
                              ? policy.createdItem?.name
                              : policy.createdSite?.name}
                          </div>
                          <div className="basis-1/3 grid justify-items-center">
                            {policy.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{policy.createdBy}</td>
                      <td className="px-6 py-4">{policy.amount}</td>
                      <td className="px-6 py-4">
                        <button
                          className="w-auto bg-[#0DB6FF] px-2 py-2 border rounded-md grid justify-items-center"
                          onClick={() => {
                            setUpdatePopup(true), setSelectedPolicy(policy);
                          }}
                        >
                          <img
                            src={editIcon}
                            className="object-scale-down h-4 w-4"
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="w-auto bg-red-400 px-2 py-2 border rounded-md grid justify-items-center"
                          onClick={() => {
                            setDeletePopup(true), setSelectedPolicy(policy);
                          }}
                        >
                          <img
                            src={deleteIcon}
                            className="object-scale-down h-4 w-4"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="bg-[#f4ca40] text-black font-bold 
            py-2 px-4 rounded-full absolute -bottom-20 right-10"
        >
          + Add New Policy
        </button>
      </div>
      {loading && <LoadingScreen />}
      {deletePopup && (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Delete Policy
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the policy on{' '}
                        {selectedPolicy.type === 'Item'
                          ? selectedPolicy.createdItem?.name ?? 'this item'
                          : selectedPolicy.createdSite?.name ?? 'this site'}
                        ? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleDelete(selectedPolicy.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setDeletePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {updatePopup && (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex min-h-full items-end justify-center p-4 text-center 
          sm:items-center sm:p-0"
          >
            <div
              className="relative transform overflow-hidden rounded-lg bg-white 
            text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 grid justify-items-center">
                <div className="sm:flex w-auto">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left min-w-min">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900 
                      grid justify-items-center"
                      id="modal-title"
                    >
                      Update Policy
                    </h3>
                    <div className="mt-2">
                      <form className="w-full max-w-lg">
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            {selectedPolicy?.type === 'Site'
                              ? 'Created Item'
                              : 'Created Site'}
                          </label>
                          <input
                            type="text'"
                            id="createdOn"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={
                              selectedPolicy.type === 'Item'
                                ? selectedPolicy?.createdItem?.name
                                : selectedPolicy?.createdSite?.name
                            }
                            disabled
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="type"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Type
                          </label>
                          <input
                            type="text"
                            id="type"
                            value={selectedPolicy?.type}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="type"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            {selectedPolicy?.type === 'Site'
                              ? 'Amount(Rs)'
                              : 'Quantity'}
                          </label>
                          <input
                            type="number"
                            id="amount"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="type"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            id="description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-[#0DB6FF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  onClick={handleUpdate(selectedPolicy?.id)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setUpdatePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliciesDetails;
