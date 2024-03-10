import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TableName = ({table}) => {
    const [editTableName, setEditTableName] = useState(false);
    const [tableName, setTableName] = useState([]);
    const Navigate = useNavigate();
    const handleEdit = async (e, table) => {
        e.preventDefault();
        console.log(tableName);
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/updateTable`, {
            _id: table._id,
            name: tableName
        });
        
        console.log(response);
        window.location.reload();
      };

      const handleDelete = async (e, table) => {
        e.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/deleteTable`, {
            _id: table._id
        });
        console.log(response);
        Navigate('/');
        window.location.reload();
      }

  return (<>
    {editTableName?
        <div className="flex w-full shadow hover:shadow-lg rounded-md p-2 my-2">
          <div className='w-[50%] pl-4  justify-center items-center'>
        <input name="table name" value={tableName} onChange={(e) => setTableName(e.target.value)}  type="text" className="border-2 border-gray-300 p-2 mt-4" placeholder="Enter Table Name" />
        </div>
        <div>
        <button
           type="button" class="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500"
          onClick={e => {
            handleEdit(e, table)
            setEditTableName(false)
          }
            }>
          Save
        </button>
        </div>
        </div>
       :
       <div className='flex w-full shadow hover:shadow-lg rounded-md p-2 my-2'>
        <div className='w-[50%] pl-4 justify-center items-center'>
       <button onClick={()=>{Navigate(`/table/${table._id}`) ;window.location.reload();}}>
        <h1 className="text-2xl font-bold mb-4">{table.name}</h1>
        </button>
        </div>
        <div>
        <button
       type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        onClick={(e)=>{
            e.preventDefault()
          setTableName(table.name)
            setEditTableName(true)
        }}>
       
          Edit
      </button>
      <button
        type="button" class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
        onClick={(e)=>{
            handleDelete(e, table)
        }}>
        Delete
      </button>
      </div>
      </div>}
      </>
  )
}

export default TableName