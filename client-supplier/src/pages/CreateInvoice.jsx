import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CreateInvoice = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [invoiceData, setInvoiceData] = useState({
    siteName: '',
    siteAddress: '',
    invoiceDate: '',
    items: {},
    total: 0, // Initialize the total with 0
  });

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (response.ok) {
        setOrder(data);
        setInvoiceData({
          siteName: data.mainSite.name || '',
          siteAddress: data.mainSite.address || '',
          invoiceDate: '', // Initialize with an empty date
          items: data.items || {},
          total: data.total || 0, // Get the total from the order data
        });
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCreateInvoice = () => {
    // Prepare the data to send
    const dataToSend = {
      siteName: invoiceData.siteName,
      siteAddress: invoiceData.siteAddress,
      invoiceDate: invoiceData.invoiceDate,
      items: invoiceData.items,
      total: invoiceData.total,
    };
  
    // Send the data to the backend
    fetch('/api/invoice/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Invoice data sent successfully.');
          alert('Invoice created successfully.');
          // Handle any additional actions after successful submission
        } else {
          console.error('Failed to send invoice data.');
          alert('Failed to create invoice.');
          // Handle errors, e.g., display an error message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle network errors, e.g., display an error message
      });
  };
  

  const updateItemQuantity = (itemName, quantity) => {
    const updatedItems = { ...invoiceData.items };
    updatedItems[itemName] = quantity;
    setInvoiceData({ ...invoiceData, items: updatedItems });
    calculateTotal(updatedItems); // Calculate the total when item quantities change
  };

  const calculateTotal = (items) => {
    const total = Object.keys(items).reduce((acc, itemName) => {
      return acc + items[itemName];
    }, 0);
    setInvoiceData({ ...invoiceData, total });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Invoice</h1>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Site Information</h2>
          <div className="mb-2">
            <label className="block text-gray-600">Site Name:</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={invoiceData.siteName}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, siteName: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600">Site Address:</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={invoiceData.siteAddress}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, siteAddress: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600">Invoice Date:</label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1"
              value={invoiceData.invoiceDate}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Items</h2>
          <ul>
            {Object.keys(invoiceData.items).map((itemName, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{itemName}:</span>
                <input
                  type="number"
                  value={invoiceData.items[itemName]}
                  onChange={(e) =>
                    updateItemQuantity(
                      itemName,
                      parseInt(e.target.value, 10)
                    )
                  }
                  className="border rounded px-2 py-1 w-16 text-center"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Total</h2>
          <p className="font-semibold text-xl">${invoiceData.total}</p>
        </div>
        <button
          onClick={handleCreateInvoice}
          className="bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400"
        >
          Send Invoice
        </button>
      </div>
    </div>
  );
};

export default CreateInvoice;
