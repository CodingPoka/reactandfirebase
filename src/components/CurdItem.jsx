import React, { useState } from "react";

import { db } from "../firebase";

//collectoin is refer to the specific collection in the database where we want to add the data. Here we are creating a collection named "items" in the database

//addDoc is a function that is used to add a document to the collection. It takes two arguments, first is the reference of the collection and second is the data that we want to add to the collection. Here we are adding an object with name and price properties to the items collection in the database
import { collection, addDoc } from "firebase/firestore";

const CurdItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const [items, setItems]=useState([]);


  //fetching all items from firestore database and store it in items state variable. We will use this items state variable to display all the items in the database.

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !itemPrice) {
      alert("Please fill all the fields");
      return;
    }

    try {
      //addDoc is a function that is used to add a document to the collection. It takes two arguments, first is the reference of the collection and second is the data that we want to add to the collection. Here we are adding an object with name and price properties to the items collection in the database

      const itemData = await addDoc(collection(db, "items"), {
        name: itemName,
        price: itemPrice,
      });
      console.log("Document Id: ", itemData.id);

      alert("Item added successfully");
      setItemName("");
      setItemPrice("");
    } catch (error) {
      console.log(error.message);
      alert("Error adding item");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10  py-10 ">
      <h1 className="text-3xl text-red-400 font-bold">Curd Operaton </h1>
      <div>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            className="border-4 border-gray-950 outline-none rounded-md px-4"
            type="text"
            placeholder="Item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            className="border-4 border-gray-950 outline-none rounded-md px-4"
            type="number"
            placeholder="Item price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />

          <button
            type="submit"
            className="bg-sky-600  text-white text-2xl  px-4 py-1 rounded-md"
          >
            Add Item
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl">Show All Items</h1>

      </div>
    </div>
  );
};

export default CurdItem;
