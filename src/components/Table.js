// pages/index.js
import { useState, useEffect } from "react";
import axios from "axios";
// import { useSearchParams } from 'react-router-dom';
import { useParams } from "react-router-dom";
import TableName from "./TableName";
import SendButton from "./SendButton";

const Table = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const [update, setUpdate] = useState(0);
  const [table, setTable] = useState([]);
  const [entries, setEntries] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const fetchTable = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/getTableById`,
      {
        _id: id,
      }
    );
    console.log(response.data);
    setTable(response.data.table);
    setEntries(response.data.entries);
  };

  useEffect(() => {
    fetchTable();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const handleSelectUpdate = (e, item) => {
    console.log(item);
    e.preventDefault();
    console.log("Update");
    setFormData({
      ...formData,
      item,
    });
    console.log(formData);
  };
  const handleUpdate = (e, item) => {
    e.preventDefault();
    console.log("Update");
    console.log(item);
    setFormData({
      name: item.name,
      phone_number: item.phone_number,
      email: item.email,
      hobby: item.hobby,
    });
    console.log(formData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      if (
        formData.name.length == 0 ||
        formData.phone_number.length == 0 ||
        formData.email.legth == 0 ||
        formData.hobby.length == 0
      ) {
        console.log("Please fill all fields");
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/saveEntry`,
          {
            ...formData,
            tableId: id,
          }
        );
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
    fetchTable();
  };

  const handleUpdateSubmit = async (e) => {
    console.log(formData2);
    e.preventDefault();
    try {
      if (
        formData2.name.length == 0 ||
        formData2.phone_number.length == 0 ||
        formData2.email.legth == 0 ||
        formData2.hobby.length == 0
      ) {
        console.log("Please fill all fields");
      } else {
        console.log("asdlkasd", formData2);
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/updateEntry`,
          {
            ...formData2,
          }
        );
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
    fetchTable();
  };


  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(checkedItems);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/deleteEntry`,
      {
        ids: checkedItems,
      }
    );
    console.log(response.data);
    fetchTable();
  };

  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, item._id]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((id) => id !== item._id)
      );
    }
    console.log(checkedItems);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex my-4 justify-center ">
        <TableName table={table} />
      </div>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="flex flex-wrap mb-2">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <input
              type="text"
              name="name"
              onChange={handleFormChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <input
              type="text"
              name="phone_number"
              onChange={handleFormChange}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <input
              type="email"
              name="email"
              onChange={handleFormChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <input
              type="text"
              name="hobby"
              onChange={handleFormChange}
              placeholder="Hobbies"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
              onClick={(e) => handleFormSubmit}
            >
              Add Entry
            </button>
          </div>
        </div>
      </form>
      <table className="w-full border border-gray-300 items-center justify-center">
        <thead>
          <tr>
            <th className="p-2 border-b">Select</th>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Phone Number</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Hobby</th>
            <th className="p-2 border-b">Update</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((item) => (
            <>
              <tr key={item._id}>
                <td className="p-2 border-b justify-center">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, item)}
                  />
                </td>
                <td className="p-2 border-b text-center">{item._id}</td>
                <td className="p-2 border-b text-center">
                  {update == item._id ? (
                    
                    <input
                      type="text"
                      name="name"
                      onChange={handleFormChange2}
                      value={formData2.name}
                      placeholder={item.name}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="p-2 border-b text-center">
                  {update == item._id ? (
                    <input
                      type="number"
                      name="phone_number"
                      onChange={handleFormChange2}
                      value={formData2.phone_number}
                      placeholder={item.phone_number}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    item.phone_number
                  )}
                </td>
                <td className="p-2 border-b text-center">
                  {update == item._id ? (
                    <input
                      type="text"
                      name="email"
                      onChange={handleFormChange2}
                      value={formData2.email}
                      placeholder={item.email}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    item.email
                  )}
                </td>
                <td className="p-2 border-b text-center">
                  {update == item._id ? (
                    <input
                      type="text"
                      name="hobby"
                      onChange={handleFormChange2}
                      value={formData2.hobby}
                      placeholder={item.hobby}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    item.hobby
                  )}
                </td>
                <td className="p-2 border-b text-center justify-center">
                  <button
                    className="mr-2 bg-blue-500 p-2 text-white rounded"
                    onClick={(e) => {
                      if (update == item._id) {
                        

                        handleUpdateSubmit(e);
                        setUpdate(null);
                      } else {
                        formData2._id = item._id;
                        formData2.name = item.name;
                        formData2.phone_number = item.phone_number;
                        formData2.email = item.email;
                        formData2.hobby = item.hobby;
                        setUpdate(item._id);
                      }
                    }}
                  >
                    {item._id == update ? "Save" : "Update"}
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
      <SendButton table={table} checkedItems={checkedItems} />
        <button
          className="bg-red-500 text-white rounded p-4"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Table;
