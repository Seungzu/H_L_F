'use client';

import axios from "axios"
import { useState } from "react";

const user = () => {

  const [ id, setId ] = useState('')

  const getWallet = async () => {
    const a = await axios.post('http://172.10.40.175:4000/api/getWallet/', { id })
    console.log(a.data)
  }

  const enrollAdmin = async () => {
    const a = await axios.post('http://172.10.40.175:4000/api/enrollAdmin/', { id })
    console.log(a.data)
    console.log('enrollAdmin')
  }

  const registUsers = async () => {
    const a = await axios.post('http://172.10.40.175:4000/api/registUsers/', { id })
    console.log(a.data)
    console.log('registUsers')
  }

  const handleChange = (e) => {
    setId(e.target.value)
  }


  return (
    <>
      <div>
        <div>
          <input onChange={handleChange} type='text' />
          <button onClick={getWallet} >getWallet</button>
          <br />
          <button onClick={enrollAdmin} >enrollAdmin</button>
          <br />
          <button onClick={registUsers} >registUsers</button>
        </div>
      </div>
    </>
  )
}

export default user