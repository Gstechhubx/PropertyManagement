// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/navbar';

// export default function OwnerDashboard() {
//   axios.defaults.withCredentials = true;
//   const Navigate = useNavigate();



//   const [showForm, setShowForm] = useState(false);
//   const [details, setDetails] = useState({ house_name: "", rent: "", bedrooms: "", bathrooms: "", tenant_type: "", status: "", isPaid: "", bathrooms: "", bedrooms: "", })
//   const [properties, setProperties] = useState([])
//   const [loggedIn, setLogin] = useState(false)
//   useEffect(() => {
//     if (!loggedIn) {
//       axios.get("http://localhost:9000/auth/login").then((res) => { setLogin(true); console.log(res, "loggedin") }).catch(() => { console.log("Not logged in line 96"); Navigate("/") })
//     }
//   }, [loggedIn]);

//   useEffect(() => {

//     axios.get("http://localhost:9000/property/properties").then(res => {
//       console.log(res, "res.data")
//       if (res.data == null) {
//         setDetails({ house_name: "", rent: "", tenant_type: "", status: "", isPaid: "", bathrooms: "", bedrooms: "", })
//       } else {

//         setDetails(res.data.houses)
//       }
//     }).catch(err => {
//       console.log(err)
//     }
//     )
//   }, [])

//   useEffect(() => {
//     axios.get("http://localhost:9000/property/properties").then((res) => { if (res.data == null) { setProperties([]) } else { setProperties(res.data.properties); console.log(res.data, "houses  line 90") } }).catch((err) => { console.log("Not logged in line 36", err); Navigate("/") })
//     console.log("rooooooms", properties)
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newValue = name === "house_name" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
//     setDetails(prevState => ({ ...prevState, [name]: newValue }));
//   }
//   const handleAddHouse = (e) => {

//     e.preventDefault()
//     console.log(details, "details")
//     axios.post('http://localhost:9000/property/addproperty', details).then(res => {
//       alert("Room Added")
//       setShowForm(false)
//       setDetails({ house_name: "", rent: "", capacity: "", tenant_type: "" })
//       axios.get("http://localhost:9000/property/houses").then((res) => setHouses(res.data.houses)).catch(() => { console.log("Not logged in"); Navigate("/") })
//     }).catch(err => {
//       console.log(err)
//     })
//   }


//   const form = (
//     <div className='z-10 abolute backdrop-blur-sm absolute h-[100%] w-[100%]'>

//       <form className=' mt-[10%]  w-[50%] mx-auto bg-white opacity-75 border-gray-400 border-2 rounded-lg p-5 backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
//         <h1 className='text-4xl'><em><u>Add House</u></em></h1>
//         <span className='absolute right-5 top-1 cursor-pointer' onClick={() => setShowForm((prev) => !prev)}>
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>

//         </span>

//         <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="house_name" value={details.house_name} onChange={handleChange} placeholder="House Name" />
//         <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="rent" value={details.rent} onChange={handleChange} placeholder="Room Rent" />
//         <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="bathrooms" value={details.bathrooms} onChange={handleChange} placeholder="Bathrooms" />
//         <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="bedrooms" value={details.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
//         < input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="status" value={details.status} onChange={handleChange} placeholder="Status" />
//         <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="isPaid" value={details.isPaid} onChange={handleChange} placeholder="isPaid" />
//         <div className='flex flex-col space-y-2'>
//           <label className='text-xl' htmlFor="status">Staus</label>
//           < input type="radio" id="vacant" name="status" value="vacant" onChange={handleChange} />
//           <label className='ml-3' htmlFor="vacant">vacant</label><br />
//           <input type="radio" id="occupied" name="status" value="bachelors" onChange={handleChange} />
//           <label className='ml-3' htmlFor="occupied">occupied</label><br />
//         </div>
//         <div className='flex flex-col space-y-2'>
//           <label className='text-xl' htmlFor="tenant_type">Tenant Type</label>
//           < input type="radio" id="family" name="tenant_type" value="family" onChange={handleChange} />
//           <label className='ml-3' htmlFor="family">Family</label><br />
//           <input type="radio" id="bachelors" name="tenant_type" value="bachelors" onChange={handleChange} />
//           <label className='ml-3' htmlFor="bachelors">Bachelors</label><br />
//           <input type="radio" id="other" name="tenant_type" value="other" onChange={handleChange} />
//           <label className='ml-3' htmlFor="other">Other</label><br />
//         </div>
//         <button className=' bg-green-700 text-yellow-50  border-gray-400 rounded-lg p-2' type="submit" onClick={handleAddHouse}>Add Room</button>

//       </form>
//     </div>
//   )


//   const handleShowForm = () => {
//     setShowForm(!showForm)
//   }



//   return (
//     <div className='bg-gray-100 h-[100vh] max-h-max'>
//       {showForm ? form : null}
//       <Navbar />
//       {houses.length == 0 ? <h1 className='text-4xl mt-3 text-center'>No Rooms Added</h1> : null}
//       {houses.map((house) => {
//         return (
//           <Link to={{ pathname: `/dashboard/house/${house._id}` }}>
//             <div key={house._id} className='flex flex-col space-y-5 p-5 cursor-pointer m-5 shadow-md transition-all duration-400 ease-in-out hover:shadow-xl bg-white border-gray-400 rounded-lg backdrop-blur-20px backdrop-saturate-200'>
//               <h1 className='text-2xl'>House Name: {house.house_name}</h1>
//               <h1 className='text-2xl'>House Rent: Rs.{house.rent}</h1>
//               <h1 className='text-2xl'>House Capacity: {house.capacity}</h1>
//               <h1 className='text-2xl'>Tenant Type: {house.tenant_type}</h1>
//             </div>
//           </Link>
//         )
//       })
//       }
//       <span className=''>
//         <button className=' fixed bottom-5 right-5 shadow-lg hover:scale-110 float-right px-4 py-2 transition-all ease-in-out border-black rounded-lg bg-orange-400' onClick={handleShowForm}>Add Room</button>
//       </span>
//     </div >
//   )
// }




import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

export default function OwnerDashboard() {
  axios.defaults.withCredentials = true;
  const Navigate = useNavigate();



  const [showForm, setShowForm] = useState(false);
  const [details, setDetails] = useState({ property_name: "", address: "", units: [], })
  const [properties, setProperties] = useState([])
  const [loggedIn, setLogin] = useState(false)
  useEffect(() => {
    if (!loggedIn) {
      axios.get("http://localhost:9000/auth/login").then((res) => { setLogin(true); console.log(res, "loggedin") }).catch(() => { console.log("Not logged in line 96"); Navigate("/") })
    }
  }, [loggedIn]);

  useEffect(() => {

    axios.get("http://localhost:9000/property/properties").then(res => {
      console.log(res.data, "res.data")
      if (res.data == null) {
        setProperties({ property_name: "", address: "", units: [], })
      } else {

        setProperties(res.data)
      }
    }).catch(err => {
      console.log(err)
    }
    )
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "property_name" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    console.log(details, "details")
    setDetails(prevState => ({ ...prevState, [name]: newValue }));
  }
  const handleAddProperty = (e) => {

    e.preventDefault()
    console.log(details, "details")
    axios.post('http://localhost:9000/property/addproperty', details).then(res => {
      alert("Property Added")
      setShowForm(false)
      setDetails({ property_name: "", address: "", units: [], })
      axios.get("http://localhost:9000/property/properties").then((res) => {

        console.log(res, "res.data in properties add request")

        setProperties(res.data)
      }).catch(() => {
        console.log("Not logged in");
        Navigate("/")
      })
    }).catch(err => {
      console.log(err)
    })
  }


  const form = (
    <div className='z-10 abolute backdrop-blur-sm absolute h-[100%] w-[100%]'>

      <form className=' mt-[10%]  w-[50%] mx-auto bg-white opacity-75 border-gray-400 border-2 rounded-lg p-5 backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
        <h1 className='text-4xl'><em><u>Add Property</u></em></h1>
        <span className='absolute right-5 top-1 cursor-pointer' onClick={() => setShowForm((prev) => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

        </span>

        <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="property_name" value={details.property_name} onChange={handleChange} placeholder="Property Name" />
        <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="address" value={details.address} onChange={handleChange} placeholder="Address" />
        <button className=' bg-green-700 text-yellow-50  border-gray-400 rounded-lg p-2' type="submit" onClick={handleAddProperty}>Add Property</button>

      </form>
    </div>
  )


  const handleShowForm = () => {
    setShowForm(!showForm)
  }



  return (
    <div className='bg-gray-100 h-[100vh] max-h-max'>
      {showForm ? form : null}
      <Navbar />
      {properties.length == 0 ? <h1 className='text-4xl mt-3 text-center'>No Properties to show</h1> : null}
      {properties.map((property) => {
        return (
          <Link key={property._id} to={{ pathname: `/dashboard/property/${property._id}` }}>
            <div key={property._id} className='flex flex-col space-y-5 p-5 cursor-pointer m-5 shadow-md transition-all duration-400 ease-in-out hover:shadow-xl bg-white border-gray-400 rounded-lg backdrop-blur-20px backdrop-saturate-200'>
              <h1 className='text-2xl'>Property Name: {property.property_name}</h1>
              <h1 className='text-2xl'>Address: {property.address}</h1>
              <h1 className='text-2xl'>Houses: {property.units.length}</h1>
            </div>
          </Link>
        )
      })
      }
      <span className=''>
        <button className=' fixed bottom-5 right-5 shadow-lg hover:scale-110 float-right px-4 py-2 transition-all ease-in-out border-black rounded-lg bg-orange-400' onClick={handleShowForm}>Add Property</button>
      </span>
    </div >
  )
}

