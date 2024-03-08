import {React,useState,useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import axios from 'axios';

const IndexPage = ({setId,id}) => {
    const Navigate = useNavigate();
    const [tables, setTables] = useState([]);

    const fetchTables = async () => {
        const response =await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllTables`)
        setTables(response.data);
    };

    useEffect(() => {
        if(tables.length == 0){
            fetchTables();
        }
    });


    const handleTableClick = (table) => {
        console.log(table._id);
        setId(table._id);
        Navigate('/table')
    };

    const handleCreateTable = () => {
        // Handle create table logic here
        console.log('Creating a new table');
    };

    return (
        <div className="container mx-auto p-4 w-full">
            <h1 className="text-3xl font-bold mb-4 mx-auto">Table Index</h1>
            <ul className="space-y-2">
                {tables.map((table, index) => (
                    <li key={index}>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleTableClick(table)}
                        >
                            {table.name}
                        </button>
                    </li>
                ))}
            </ul>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleCreateTable}
            >
                Create New Table
            </button>
        </div>
    );
};

export default IndexPage;
