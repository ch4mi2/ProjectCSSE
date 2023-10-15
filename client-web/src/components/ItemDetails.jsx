import { useState, useEffect } from 'react';
import plusIcon from '../assets/plus.png';
import checkedIcon from '../assets/checked.png';
import LoadingScreen from './LoadingScreen';

const ItemDetails = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [fetchNeeded, setFetchNeeded] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      const response = await fetch('/api/api/items/');
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setItems(data);
        setLoading(false);
      } else {
        console.log('error');
        setLoading(false);
      }
    };

    const getUser = async () => {
      setUser(localStorage.getItem('username'));
    };

    getItems();
    getUser();
  }, [fetchNeeded]);

  const handleSubmit = async (e) => {
    e.preventDefault;
    setLoading(true);

    const policy = {
      createdBy: user,
      amount,
      description,
      type: 'Item',
      createdItem: { id: selectedItem.id },
    };

    console.log(policy);

    const response = await fetch('/api/policies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(policy),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setShowForm(false);
    } else {
      console.log('error');
    }
    setLoading(false);
    setFetchNeeded(false);
  };

  return (
    <div>
      <div className="bg-[#e5e7eb] mx-10 mt-8">
        <div className="relative overflow-x-auto shadow-md grid justify-items-center">
          <div className="w-11/12 text-md text-left text-gray-500 dark:text-gray-400 mx-10 my-10">
            {items &&
              items.map((item, index) => (
                <div
                  key={index}
                  className="border text-s text-black bg-[#ffefbb] border-[#f4ca40] w-12/12
                  flex flex-row justify-between items-center px-4 py-2 my-2 rounded-lg"
                >
                  <div className="basis-1/5">{index + 1}</div>
                  <div className="basis-3/4">{item.name}</div>
                  <div className="basis-1/5 justify-items-end">
                    {item.restricted ? (
                      <div className="grid justify-items-end mr-6">
                        <button className="w-auto bg-[#0DB6FF] px-2 py-2 border rounded-md grid justify-items-center">
                          <img
                            src={checkedIcon}
                            className="object-scale-down h-4 w-4"
                          />
                        </button>
                      </div>
                    ) : (
                      <div className="grid justify-items-end mr-6">
                        <button
                          className="w-auto bg-[#f4ca40] px-2 py-2 border rounded-md grid justify-items-center"
                          onClick={() => {
                            setShowForm(true), setSelectedItem(item);
                          }}
                        >
                          <img
                            src={plusIcon}
                            className="object-scale-down h-4 w-4"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {loading && <LoadingScreen />}
      {showForm && (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-50 grid"
        >
          <div className="absolute p-4 w-9/12 max-w-2 h-full right-28 top-36">
            <div className="relative p-4 bg-gray-300 rounded-lg shadowsm:p-5 grid align-middle ">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add Policy
                </h3>
                <button
                  type="button"
                  className="text-white bg-gray-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-[#f4ca40] hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={() => setShowForm(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="createOn"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Create On
                    </label>
                    <input
                      type="text"
                      name="createOn"
                      id="createOn"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={selectedItem?.name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      readOnly
                      value={'Item'}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="createdBy"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Created By
                    </label>
                    <input
                      type="text"
                      name="createdBy"
                      id="createdBy"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={user}
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required=""
                      value={amount ?? ''}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Write policy description here"
                      value={description ?? ''}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-black inline-flex items-center bg-[#f4ca40] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new policy
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
