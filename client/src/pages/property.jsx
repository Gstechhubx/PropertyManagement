import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';

export default function Property() {
    const Navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [loggedIn, setLogin] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:9000/auth/login").then(res => { setLogin(true); console.log(loggedIn) }).catch(() => { console.log("Not logged in"); Navigate("/") })
    }, [loggedIn])

    const { house_id } = useParams();
    console.log(house_id)
    const [house, setHouse] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:9000/property/houses/${house_id}`).then(res => { console.log(res.data); setHouse(res.data); }).catch((err) => { console.log(err) })
    }, []);
    const [showEditable, setShowEditable] = useState(false)
    // const [details, setDetails] = useState({ house_name: "", rent: "", capacity: "", tenant_type: "" , is_paid:false,  issues:[] })
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "capacity" || name === "rent" ? parseInt(value) : value;
        setHouse(prevState => ({ ...prevState, [name]: newValue }));
    }


    const handleDone = () => {
        axios.post(`http://localhost:9000/property/houses/${house_id}`, house).then(res => { console.log(res.data); setHouse(res.data); setShowEditable(false) }).catch(err => { console.log(err) })
        axios.get(`http://localhost:9000/property/houses/${house_id}`).then(res => { console.log(res.data); setHouse(res.data); }).catch((err) => { console.log(err) })
    }

    const handleDelete = () => {
        axios.put(`http://localhost:9000/property/houses/${house_id}/delete`).then(res => { console.log(res.data); Navigate("/ownerdashboard") }).catch(err => { console.log(err) })
    }

    const editable = (
        <div className='z-10 abolute backdrop-blur-sm absolute h-[100%] w-[100%]'>
            <form className=' mt-[10%]  w-[50%] mx-auto bg-white opacity-75 border-gray-400 border-2 rounded-lg p-5 backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
                <h1 className='text-4xl'><em><u>Edit House</u></em></h1>
                <span className='absolute right-5 top-1 cursor-pointer' onClick={() => setShowForm((prev) => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </span>

                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="house_name" value={house.house_name} onChange={handleChange} placeholder="House Name" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="capacity" value={house.capacity} onChange={handleChange} placeholder="Room Capacity" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="rent" value={house.rent} onChange={handleChange} placeholder="Room Rent" />

                <div>

                    <input type="radio" id="family" name="tenant_type" value="family" onChange={handleChange} />
                    <label className='ml-3' for="family">Family</label><br />
                    <input type="radio" id="bachelors" name="tenant_type" value="bachelors" onChange={handleChange} />
                    <label className='ml-3' for="bachelors">Bachelors</label><br />
                    <input type="radio" id="other" name="tenant_type" value="other" onChange={handleChange} />
                    <label className='ml-3' for="other">Other</label><br />
                </div>
                <button className=' bg-green-700 text-yellow-50  border-gray-400 rounded-lg p-2' type="submit" onClick={handleDone}>Done</button>

            </form>
        </div>
    )
    const handleEdit = () => {
        setShowEditable((prev) => !prev)
    }
    // console.log(house)
    return (
        <>
            <Navbar />
            <div className='pt-4 h-[100vh] max-h-max bg-gray-100'>
                {showEditable && editable}
                <div className='flex flex-col space-y-5 p-5  m-5 bg-white shadow-md transition-all duration-400 ease-in-out hover:shadow-xl rounded-lg'>
                    <h1 className='text-3xl'>{house.house_name}</h1>
                    <h1><b>House Rent: </b>{house.rent}</h1>
                    <h1><b>People: </b>{house.capacity}</h1>
                    <h1><b>Tenant Type: </b>{house.tenant_type}</h1>
                    <h1><b>Is Paid? </b>{house.ispaid ? "True" : "False"}</h1>
                    {house.issues?.map(issue => <h1>{issue.issue}</h1>)}
                    <span>
                        <button className='bg-blue-500 border hover:bg-white transition-colors ease-in-out duration-250 hover:text-black border-blue-300 w-[5rem] text-white px-4 py-2 rounded-lg' onClick={handleEdit}>Edit</button>
                        <button className='w-[5rem] mx-6 border transition-colors ease-in-out duration-250 hover:bg-red-500 border-red-300 px-4 py-2 rounded-lg' onClick={handleDelete}>Delete</button>
                    </span>
                </div>
            </div>
        </>
    )
}
