import React, { useEffect, useState } from 'react'
import { subscriptionsData } from './api/auth/APICalls'
import { subscriptionsURL } from './api/auth/URL'
import axios from 'axios'
import MyTable from './Table'

const Subscriptions = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(async () => {
        
            await axios.request({
                method: 'get',
                url: subscriptionsURL,
                headers:{
                    'Content-Type' : 'application/json'
                },
            })
            .then((response) => {
                console.log(response.data.data)
                setData(response.data.data)
                console.log()
            })
            .catch((error) => { 
                console.log(error)
            })
            
       
    },[])
   
    return (
            <MyTable data={data} />
    )
}


export default Subscriptions