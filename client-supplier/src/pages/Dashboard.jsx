import { useEffect, useState } from "react";
import React from "react";
import { useContext } from "react";
import SupplierContext from "../context/SupplierContext";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("placed"); // Default filter value
  const [expandedRow, setExpandedRow] = useState(null);
  const { supplier } = useContext(SupplierContext);

  useEffect(() => {
    const getPlacedOrders = async () => {
      const response = await fetch("/api/orders/");
      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      }
    };

    getPlacedOrders();
  }, []);

  const handleChangeOrderState = async (orderId, newState) => {
    console.log(orderId, newState);
    try {
      const response = await fetch(`/api/orders/state/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: newState,
      });

      if (response.ok) {
        // If the request was successful, update the order's state locally.
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, state: newState } : order
          )
        );
      } else {
        // Handle the case where the request was not successful (e.g., show an error message).
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation.
    }
  };

  // Filter orders based on the selected filter value (case-insensitive)
  const filteredOrders = orders.filter(
    (order) => order.state.toLowerCase() === filter.toLowerCase()
  );

  const toggleRowExpansion = (orderId) => {
    if (expandedRow === orderId) {
      setExpandedRow(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(orderId); // Expand the clicked row
    }
  };

  return (
    <div className="mx-auto mt-4">
      <h1 className="text-2xl font-semibold mb-4 ml-2">Orders</h1>
      <div className="shadow overflow-hidden border border-black sm:rounded-lg m-4 p-2">
        <div>
          {/* Add a filter dropdown to select the order state */}
          <label className="text-gray-500">Filter by Order State:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="m-2 p-2"
          >
            <option value="placed">Placed</option>
            <option value="delivering">Delivering</option>
            <option value="complete">Completed</option>
          </select>
        </div>
        <table className="min-w-full">
          <thead>
            <tr>{/* ...Table headers... */}</tr>
          </thead>
          <tbody className="bg-white">
            {filteredOrders.map((order, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.site}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.sitemanager}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.state}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {/* Add a dropdown to change the order state */}
                    <select
                      onChange={(e) =>
                        handleChangeOrderState(order.id, e.target.value)
                      }
                    >
                      <option value="" disabled selected>
                        Change State
                      </option>
                      <option value="placed">Placed</option>
                      <option value="delivering">Delivering</option>
                      <option value="complete">Complete</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <button onClick={() => toggleRowExpansion(order.id)}>
                      {expandedRow === order.id ? "Hide Items" : "Show Items"}
                    </button>
                  </td>
                </tr>
                {expandedRow === order.id && (
                  <tr>
                    <td colSpan="5">
                      {/* Render items or other details here */}
                      <ul>
                        {order.items &&
                          order.items.map((item) => (
                            <li key={item.id}>
                              Item ID: {item.name}, Quantity: {item.qty}
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
