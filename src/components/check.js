// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Table = ({ id }) => {
    console.log(id);
    const [formData, setFormData] = useState({});
    const [update, setUpdate] = useState(0);
    const [table, setTable] = useState([]);
    const [entries, setEntries] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    const fetchTable = async () => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/getTableById`, {
            _id: id,
        });
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

    const handleSelectUpdate = (e, item) => {
        e.preventDefault();
        console.log('Update');
        setFormData({
            ...formData,
            item,
        });
        console.log(formData);
    };

    const handleUpdate = (e, item) => {
        e.preventDefault();
        console.log('Update');
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
                console.log('Please fill all fields');
            } else {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/saveEntry`, {
                    ...formData,
                    tableId: id,
                });
                console.log(response.data);
            }
        } catch (err) {
            console.log(err);
        }
        fetchTable();
    };

    const handleDelete = async (e, item) => {
        e.preventDefault();
        console.log(item);
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteEntry`, {
            _id: item._id,
        });
        console.log(response.data);
        fetchTable();
    };

    const handleCheckboxChange = (e, item) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setCheckedItems((prevCheckedItems) => [...prevCheckedItems, item._id]);
        } else {
            setCheckedItems((prevCheckedItems) => prevCheckedItems.filter((id) => id !== item._id));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{table.name}</h1>

            <form onSubmit={handleFormSubmit} className="mb-4">
                {/* Form inputs */}
            </form>

            <table className="w-full border border-gray-300">
                <thead>
                    {/* Table headers */}
                </thead>
                <tbody>
                    {entries?.map((item) => (
                        <>
                            {update == item._id ? (
                                <form onSubmit={handleFormSubmit} className="mb-4">
                                    {/* Update form inputs */}
                                </form>
                            ) : (
                                <tr key={item._id}>
                                    <td className="p-2 border-b">
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, item)} />
                                    </td>
                                    {/* Table row data */}
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mt-4">
                <button className="mr-2 bg-blue-500 text-white rounded">Send</button>
                <button className="bg-green-500 text-white rounded">Delete</button>
            </div>
        </div>
    );
};

export default Table;
