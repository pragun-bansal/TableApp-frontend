import {React,useState,useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import TableName from './TableName';
// import Loader from './BasicExample';
import BasicExample from './BasicExample';

const IndexPage = () => {
    const Navigate = useNavigate();
    const [tables, setTables] = useState([]);
    const [tableName, setTableName] = useState("");
    const [loading,setLoading] = useState(true);
    console.log(loading);
    const fetchTables = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getAllTables`);
            setTables(response.data);
            setLoading(false); // Move this line here to set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching tables:', error);
            setLoading(false); // Handle error case by setting loading to false
        }
    };
    

    useEffect(() => {
        if(tables.length == 0){
            fetchTables();
        }
    });

    const handleEdit = async (e,table) => {
        e.preventDefault();
        console.log(table);
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/editTable`,table);
        console.log(response.data);
    }

    const handleTableClick = (table) => {
        console.log(table._id);
        Navigate(`/table/${table._id}`)
        window.location.reload();
    };

    const handleCreateTable = (e) => {
        e.preventDefault();
        let name =""
        if(tableName === ""){
            name = "NEW TABLE"
        }
        const response = axios.post(`${process.env.REACT_APP_SERVER_URL}/api/savetable`,{name:tableName});
        console.log(response.data);
        fetchTables();
        
    };

    return (
        <>
        {loading?<div className='flex-row w-[100vw] h-[100vh] items-center justify-center text-center py-[40vh]'><BasicExample /></div> : 
        <div className="container mx-auto p-4 items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Table Index</h1>
            <input name="table name" value={tableName} onChange={(e) => setTableName(e.target.value)}  type="text" className="border-2 border-gray-300 p-2 mt-4" placeholder="Enter Table Name" />
            <br />
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleCreateTable}
            >
                Create New Table
            </button>
            
                <ul className="space-y-2 my-4">
                {tables.map((table, index) => (
                    <li key={index}>
                        
                        <TableName table={table} />
                        
                    </li>
                    
                ))}
            </ul>
            
            
           
        </div>
                }
                </>

    );
};

export default IndexPage;
