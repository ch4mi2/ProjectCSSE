import { useEffect, useState } from "react";

const Page2 = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      const response = await fetch("/api/items");
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setItems(data);
      } else {
        console.log("error");
      }
    };

    getItems();
  }, []); // Add an empty dependency array to useEffect to run it only once

  return (
    <div>
      <h1 className="text-2xl">Temp page, Testing GET items</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            Name: {item.name}
            <br />
            Price: {item.price}
            <br />
            Qty: {item.quantity}
            <br />
            Supplier: {item.supplier}
            <br />
            Description: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page2;
