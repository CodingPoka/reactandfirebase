import React, { useEffect, useState } from "react";

import { db } from "../firebase";

//collectoin is refer to the specific collection in the database where we want to add the data. Here we are creating a collection named "items" in the database

//addDoc is a function that is used to add a document to the collection. It takes two arguments, first is the reference of the collection and second is the data that we want to add to the collection. Here we are adding an object with name and price properties to the items collection in the database
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const CurdItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const [items, setItems] = useState([]);

  //fetching all items from firestore database and store it in items state variable. We will use this items state variable to display all the items in the database.

  const fetchItems = async () => {
    try {
      //get all items from the items collection and store in itemsData variable
      const itemsData = await getDocs(collection(db, "items"));

      //checking if itemsData exists or not. If it exists then we will store the data in items state variable using setItems function. We can use this items state variable to display all the items in the database.

      //create an empty array itemlist to store the items data in array format. Because itemsData is in object format and we need to convert it into array format to display it in the UI.
      const itemList = [];

      //Here we use forEach loop to loop through the itemsData and push the data in itemList array. We are using push method to add the data in the itemList array. And we are using spread operator to get all the properties of the item data and store it in the itemList array.
      itemsData.forEach((item) => {
        itemList.push({
          id: item.id,
          ...item.data(),
        });
      });

      setItems(itemList);
    } catch (error) {
      console.log(error.message);
    }
  };

  //use useEffect to fetch all items from the database when the component is mounted. So that we can display all the items in the database when the component is rendered.

  useEffect(() => {
    fetchItems();
  }, []);

  //delete items from the database and for this we will use deleteDoc function and delete the specifc document where id will comes from the item that we want to delete. We will pass the id of the item that we want to delete in the deleteDoc function and it will delete the specific document from the database.

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
      alert("Item deleted successfully");
      fetchItems(); // Fetch updated list of items after deletion
    } catch (error) {
      console.log(error.message);
      alert("Error deleting item");
    }
  };

  //create hanldeEdit function to edit the item and for this we will use updateDoc function and update the specific document where id will comes from the item that we want to edit. We will pass the id of the item that we want to edit in the updateDoc function and it will update the specific document in the database.

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditPrice(item.price);
  };

  //create handleUpdate function to update the item and for this we will use updateDoc function and update the specific document where id will comes from the item that we want to update. We will pass the id of the item that we want to update in the updateDoc function and it will update the specific document in the database.
  const handleUpdate = async (id) => {
    try {
      await updateDoc(doc(db, "items", id), {
        name: editName,
        price: editPrice,
      });
      alert("Item updated successfully");
      setEditId(null);
      setEditName("");
      setEditPrice("");
      fetchItems();
    } catch (error) {
      console.log(error.message);
      alert("Error updating item");
    }
  };

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
      fetchItems(); // Fetch updated list of items
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

        <div className="flex flex-col gap-4 mt-4">
          {items.map((item) => {
            return (
              <div key={item.id} className="bg-gray-200 p-4 mb-3 rounded">
                {editId === item.id ? (
                  <div>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                    <button onClick={() => handleUpdate(item.id)}>save</button>
                  </div>
                ) : (
                  <div>
                    <h1>Name: {item.name}</h1>
                    <h1>Price: {item.price}</h1>
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-2 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurdItem;
