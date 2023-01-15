import React, { useState, useEffect } from 'react'
import UserAuth from '../../api/UserAuth'
import TableData from '../Table/TableData';
import './calldetails.css';
const CallDetails = () => {
  const { http } = UserAuth();
  const [callDetails, setCallDetails] = useState();
  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchUserDetails = () => {
    http.get('/calls').then((res) => {
      // console.log(res.data.nodes);
      setCallDetails(res.data.nodes);
    })
  }
  const renderElement=()=>{
    if(callDetails){
      return <div>
      <TableData callDetails={callDetails}/>
      </div>
      // {callDetails.map(c=>(
      //   <div key={c.id} >${c.duration}</div>
      // ))}
      
    }
    else{
      return <p>loading....</p>
    }
  }
  return (
    <>
      <h1 className='title'>Turing Technologies frontend test</h1>
     

   {renderElement()}

    </>

  )
}

export default CallDetails