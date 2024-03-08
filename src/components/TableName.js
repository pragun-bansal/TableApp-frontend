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
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/updateTable`, {
            _id: table._id,
            name: tableName
        });
        
        console.log(response);
        window.location.reload();
      };
  return (<>
    {editTableName?
        <span className="flex space-x-4 w-full justify-center text-center">
        <input name="table name" value={tableName} onChange={(e) => setTableName(e.target.value)}  type="text" className="border-2 border-gray-300 p-2 mt-4" placeholder="Enter Table Name" />
        <button
          className="bg-slate-300 hover:bg-slate-400 text-white text-[20px] font-bold py-2 px-4 rounded ml-4 "
          onClick={e => {
            handleEdit(e, table)
            setEditTableName(false)
          }
            }>
          Save
        </button>
        
        </span>
       :
       <span className='flex space-x-4 w-full justify-center text-center'>
       <button onClick={()=>{Navigate(`/table/${table._id}`) ;window.location.reload();}}>
        <h1 className="text-2xl font-bold mb-4">{table.name}</h1>
        </button>
        <button
        className="bg-slate-300 hover:bg-slate-400 text-white text-[20px] font-bold py-2 px-4 rounded ml-4 "
        onClick={(e)=>{
            e.preventDefault()
          setTableName(table.name)
            setEditTableName(true)
        }}>
        Edit
      </button>
      </span>}
      </>
  )
}

export default TableName