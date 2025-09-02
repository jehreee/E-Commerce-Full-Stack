import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'
import { useDispatch } from 'react-redux'
import defaultImage from '../assest/signin.gif'
import uploadImage from '../helpers/uploadImage'

const UserProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        name : "",
        email : "",
        profilePic : "",

    })

    const fetchUserDetails = async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.userProfile.url, {
            method : SummaryApi.userProfile.method,
            credentials : "include",
            headers : {
            "content-type" : "application/json" 
            },
        })

        const dataResponse = await response.json()
        setData(dataResponse?.data)
        setLoading(false)
    }

    useEffect(()=>{
        fetchUserDetails()
    },[params])

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: data?.name || "",
        email: data?.email || "",
        profilePic: data?.profilePic || "",
    });
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const result = await uploadImage(file);
            if (result.secure_url) {
            setFormData({ ...formData, profilePic: result.secure_url });
            }
        } catch (err) {
            console.error("Cloudinary Upload Error:", err);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch(SummaryApi.userProfileEdit.url, {
                method: SummaryApi.userProfileEdit.method,
                headers: { 
                    "Content-Type": "application/json" 
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                console.log("Profile updated successfully!");
                setData(result.data);
                setIsEditing(false);
            } else {
                console.log("Profile not updated",result.message);
            }
        } catch (error) {
        console.error(error);
        }
    };





    const handleLogout = async() => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method : SummaryApi.logout_user.method,
            credentials : 'include'
        })

        const data = await fetchData.json()

        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate("/")
        }

        if(data.error){
            toast.error(data.message)
        }
    }




  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md md:mt-16">
        {
            loading ? (
                <div className='flex flex-col items-center'>
                    <div className='w-24 h-24 rounded-full shadow mb-4 bg-slate-200 animate-pulse'>

                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 bg-slate-200 p-2 rounded-full w-20 mt-10 animate-pulse"> </h2>
                    <p className="text-gray-500 mb-4 bg-slate-200 mt-6 p-2 rounded-full w-32 animate-pulse"></p>

                    <div className="w-full flex justify-between gap-4 mt-10">
                        <button className="flex-1 bg-slate-200 text-white py-5 px-4 rounded-full animate-pulse">
                            
                        </button>
                        <button className="flex-1 bg-slate-200 text-white py-5 px-4 rounded-full animate-pulse">
                            
                        </button>
                    </div>
                </div>
            ) : (
                    <div className="flex flex-col items-center">
                        
                        { isEditing ? (
                            <div className="flex flex-col gap-2 w-full">
                                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full mb-10'>
                                    <img
                                        src={formData?.profilePic || data?.profilePic || defaultImage}
                                        alt="User Profile"
                                    />
                                    <form>
                                        <label>
                                            <input type="file" className='hidden' accept="image/*" onChange={handleImageUpload} />
                                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                                Upload Photo
                                            </div>
                                        </label>
                                    </form>
                                    
                                </div>
                                
                                <div className='grid mb-2'>
                                    <label>Name : </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                        placeholder='name'
                                        name='name'
                                    />
                                </div>
                                <div className='grid mb-2'>
                                    <label>Email : </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                        placeholder="Email"
                                        name='email'
                                    />
                                </div>

                                <div className="flex gap-4 mt-4">
                                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={handleSave}>
                                        Save
                                    </button>
                                    <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            ) : (
                                <div className='flex flex-col items-center container mx-auto'>
                                    <img
                                        src={ data?.profilePic || defaultImage}
                                        alt="User Profile"
                                        className="w-24 h-24 rounded-full shadow object-cover mb-10"
                                    />
                                    <h2 className="text-xl font-semibold text-gray-800">{data?.name}</h2>
                                    <p className="text-gray-500 mb-4">{data?.email}</p>

                                    <div className="w-full flex justify-between gap-4 mt-4">
                                        <button 
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                            onClick={() => {
                                                setFormData({
                                                name: data?.name || "",
                                                email: data?.email || "",
                                                profilePic: data?.profilePic || defaultImage,
                                                });
                                                setIsEditing(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={handleLogout}>
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                    </div>
            )
        }

    </div>

  )
}

export default UserProfile