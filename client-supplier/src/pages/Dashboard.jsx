import { useEffect, useState } from "react";
import React from "react";
import { useContext } from "react";
import SupplierContext from "../context/SupplierContext";
import { Link } from "react-router-dom";

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
                    {order.mainSite.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.mainSite.address}
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
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <Link
                      to={`/create-invoice/${order.id}`}
                      className="bg-yellow-300 text-black p-2 rounded-lg"
                    >
                      Create Invoice
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <button className="bg-yellow-300 text-black p-2 rounded-lg">
                      Create Delivery Note
                    </button>
                  </td>
                </tr>
                {expandedRow === order.id && (
                  <tr>
                    <td colSpan="5">
                      {/* Render items or other details here */}
                      <ul>
                        {Object.keys(order.items).map((itemName, index) => (
                          <li key={index}>
                            {itemName}: {order.items[itemName]}
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

// import React from "react";
// import data from "../data/orders.json"; // Import your JSON data
// import { useState } from "react";
// import { useContext } from "react";
// import SupplierContext from "../context/SupplierContext";

// const Dashboard = () => {
//   const [orders, setOrders] = useState(data.orders);
//   const [filterState, setFilterState] = useState("All");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const { supplier } = useContext(SupplierContext);

//   const handleStateChange = (orderId, newState) => {
//     const updatedOrders = orders.map((order) => {
//       if (order.orderid === orderId) {
//         return { ...order, state: newState };
//       }
//       return order;
//     });
//     setOrders(updatedOrders);
//   };

//   const handleFilterChange = (e) => {
//     const selectedState = e.target.value;
//     setFilterState(selectedState);
//   };

//   const openInvoiceModal = (order) => {
//     setSelectedOrder(order);
//     setShowInvoiceModal(true);
//   };

//   const closeInvoiceModal = () => {
//     setSelectedOrder(null);
//     setShowInvoiceModal(false);
//   };

//   const createInvoice = (invoiceData) => {
//     // Handle the submission of invoice data here (e.g., send to the backend)
//     console.log("Invoice data:", invoiceData);
//     closeInvoiceModal();
//     alert("Invoice created successfully!");
//   };

//   const calculateTotal = (orderItems) => {
//     let total = 0;
//     orderItems.forEach((item) => {
//       total += item.price * item.qty;
//     });
//     return total;
//   };

//   const filteredOrders = orders.filter((order) => {
//     const orderState = order.state.toLowerCase();
//     const selectedState = filterState.toLowerCase();
//     const orderSupplier = order.supplier.toLowerCase();
//     const selectedSupplier = supplier.toLowerCase();

//     return (
//       (selectedState === "all" || orderState === selectedState) &&
//       orderSupplier === selectedSupplier
//     );
//   });

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Order Dashboard</h1>

//       <div className="mb-4">
//         <label htmlFor="filterState" className="mr-2">
//           Filter by State:
//         </label>
//         <select
//           id="filterState"
//           onChange={handleFilterChange}
//           value={filterState}
//           className="border p-1"
//         >
//           <option value="All">All</option>
//           <option value="Placed">Placed</option>
//           <option value="Delivering">Delivering</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>

//       <table className="w-full table-auto border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Order ID</th>
//             <th className="border px-4 py-2">Order Date</th>
//             <th className="border px-4 py-2">Site Manager</th>
//             <th className="border px-4 py-2">Site</th>
//             <th className="border px-4 py-2">Items</th>
//             <th className="border px-4 py-2">Supplier</th>
//             <th className="border px-4 py-2">Comments</th>
//             <th className="border px-4 py-2">State</th>
//             <th className="border px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOrders.map((order) => (
//             <tr key={order.orderid}>
//               <td className="border px-4 py-2">{order.orderid}</td>
//               <td className="border px-4 py-2">{order.order_date}</td>
//               <td className="border px-4 py-2">{order.site_manager}</td>
//               <td className="border px-4 py-2">{order.site}</td>
//               <td className="border px-4 py-2">
//                 <ul>
//                   {order.order_items.map((item, index) => (
//                     <li key={index}>
//                       {item.name} x{item.qty}
//                     </li>
//                   ))}
//                 </ul>
//               </td>
//               <td className="border px-4 py-2">{order.supplier}</td>
//               <td className="border px-4 py-2">{order.comments}</td>
//               <td className="border px-4 py-2">{order.state}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => handleStateChange(order.orderid, "Delivering")}
//                   className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
//                 >
//                   Delivering
//                 </button>
//                 <button
//                   onClick={() => handleStateChange(order.orderid, "Completed")}
//                   className="bg-green-500 text-white px-2 py-1 rounded-lg"
//                 >
//                   Completed
//                 </button>
//                 <button
//                   onClick={() => openInvoiceModal(order)}
//                   className="bg-purple-500 text-white px-2 py-1 rounded-lg"
//                 >
//                   Create Invoice
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showInvoiceModal && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <div className="border-b-2 pb-2 mb-4">
//               <h2 className="text-2xl font-bold text-center">Invoice</h2>
//             </div>
//             <div className="flex flex-wrap justify-between mb-4">
//               <div className="w-full sm:w-1/2">
//                 <p>Order ID: {selectedOrder.orderid}</p>
//                 <p>Site Manager: {selectedOrder.site_manager}</p>
//                 <p>Site: {selectedOrder.site}</p>
//                 <p>Supplier: {selectedOrder.supplier}</p>
//               </div>
//               <div className="w-full sm:w-1/2 text-right">
//                 <div className="mb-2">
//                   <label htmlFor="invoiceNumber" className="font-bold">
//                     Invoice Number:
//                   </label>
//                   <input
//                     type="text"
//                     id="invoiceNumber"
//                     className="border border-gray-300 p-2 rounded"
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label htmlFor="invoiceDate" className="font-bold">
//                     Invoice Date:
//                   </label>
//                   <input
//                     type="date"
//                     id="invoiceDate"
//                     className="border border-gray-300 p-2 rounded"
//                   />
//                 </div>
//               </div>
//             </div>
//             <table className="w-full mb-4">
//               <thead>
//                 <tr>
//                   <th className="text-left">Item</th>
//                   <th className="text-right">Price</th>
//                   <th className="text-right">Quantity</th>
//                   <th className="text-right">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedOrder.order_items.map((item, index) => (
//                   <tr key={index}>
//                     <td className="text-left">{item.name}</td>
//                     <td className="text-right">${item.price}</td>
//                     <td className="text-right">{item.qty}</td>
//                     <td className="text-right">${item.price * item.qty}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="text-right">
//               <p className="font-bold">
//                 Total Amount: ${calculateTotal(selectedOrder.order_items)}
//               </p>
//             </div>
//             <div className="text-right mt-4">
//               <button
//                 onClick={closeInvoiceModal}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() =>
//                   createInvoice({
//                     invoiceNumber:
//                       document.getElementById("invoiceNumber").value,
//                     invoiceDate: document.getElementById("invoiceDate").value,
//                     totalAmount: calculateTotal(selectedOrder.order_items),
//                     // Add other fields as needed
//                   })
//                 }
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Create Invoice
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
