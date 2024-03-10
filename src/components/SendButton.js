import React from 'react'
import axios from 'axios'
const SendButton = ({table,checkedItems}) => {

    const handleEmail = async (recipientEmail) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/sendEmail`, {
            table: table,
            checkedItems: checkedItems,
            recipientEmail: recipientEmail
        });
        console.log(response.data);
    }
    const popUp = () => {
        // take input of recipient email in a small pop up
        const recipientEmail = prompt('Enter recipient email');
        if (recipientEmail) {
            handleEmail(recipientEmail);
        }
    }
  return (
    <button className="mr-2 bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg text-white rounded p-4" onClick={popUp}>Send Email</button>
  )
}

export default SendButton