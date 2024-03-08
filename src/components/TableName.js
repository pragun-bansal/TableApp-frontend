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
  return (<>
    {editTableName?
        <span className="flex space-x-4 w-full justify-center items-center text-center">
        <input name="table name" value={tableName} onChange={(e) => setTableName(e.target.value)}  type="text" className="border-2 border-gray-300 p-2 mt-4" placeholder="Enter Table Name" />
        <button
          className="bg-slate-300 justify-center items-center hover:bg-slate-400 text-white text-[15px] h-2/3 font-bold px-2 py-0 rounded ml-4 "
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
        className="bg-slate-300 hover:bg-slate-400 text-white text-[20px] font-bold p-auto rounded ml-4 justify-center items-center"
        onClick={(e)=>{
            e.preventDefault()
          setTableName(table.name)
            setEditTableName(true)
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" className='h-1/2 justify-center items-center' viewBox="0 0 24 24">
    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
</svg>
      </button>
      </span>}
      </>
  )
}

export default TableName