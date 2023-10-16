import React, { useState } from 'react';

const CreateInvoice = ({ order }) => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',  // You can generate this dynamically
    issueDate: new Date().toLocaleDateString(),
    dueDate: '',
    total: order.total,
    site: order.site,
    sitemanager: order.sitemanager,
    items: order.items,
    supplierPrice: order.supplier.price,
    billingAddress: {
      name: '',
      street: '',
      city: '',
      zip: '',
    },
    shippingAddress: {
      name: '',
      street: '',
      city: '',
      zip: '',
    },
    paymentTerms: '',
    notes: '',
  });

  const handleCreateInvoice = () => {
    // Handle the creation of the invoice data, e.g., sending to a server
    console.log('Invoice Data:', invoiceData);
  };

  return (
    <div>
      <h1>Create Invoice</h1>
      <form>
        <div>
          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="issueDate">Issue Date:</label>
          <input
            type="text"
            id="issueDate"
            name="issueDate"
            value={invoiceData.issueDate}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="text"
            id="dueDate"
            name="dueDate"
            value={invoiceData.dueDate}
            onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="total">Total:</label>
          <input
            type="text"
            id="total"
            name="total"
            value={invoiceData.total}
            readOnly
          />
        </div>
        {/* Include more invoice details as needed */}
        <button onClick={handleCreateInvoice}>Create Invoice</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
