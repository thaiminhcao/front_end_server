
import Layout from '../dashboard';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
interface Profile {
    username: string;
    password: string;
    email: string;
    gender: string;
    phoneNumber: string;
    dob: string;
    avatar: string;
}

const Index = () => {
    const [, setIsSuccess] = useState(false);
    const [profile, setProfile] = useState<Profile>({
        username: '',
        password: '',
        email: '',
        gender: '',
        phoneNumber: '',
        dob: '',
        avatar: '',
    });
    const userId: number = 1;
    useEffect(() => {
        // call the fetchUserInfo function here to get the user info when the component mounts

        fetchUserInfo(userId);
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProfile(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = event => {
                setProfile(prevState => ({
                    ...prevState,
                    avatar: event.target?.result as string,
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // const handleSubmit = () => {
    //     // call the updateUserInfo function here to update the user info when the form is submitted
    //     updateUserInfo(profile);
    // }

    const fetchUserInfo = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/user/getinfo/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profile }),
            });
            const data = await response.json();
            // Xử lý kết quả từ API tại đây
            if (data.message === "Sucessful") {
                console.log(data.message);
                setProfile(data);
            }
        } catch (error) {
            // Xử lý lỗi tại đây
            console.error(error);
            toast.error('Server is currently busy. Please try again later', {
                position: toast.POSITION.TOP_RIGHT
            });
            setIsSuccess(false);
        }
    }


    // const updateUserInfo = async (profileData: Profile) => {
    //     const response = await fetch(`http://localhost:8080/user/updateinfo`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(profileData)
    //     });
    //     const data = await response.json();
    //     // handle the data here
    //     return data
    // }


    return (
        <div><Layout />
            <h1 className="text-2xl font-bold mb-4 mx-auto container">Profile</h1>
            <div className='flex container mx-auto p-4'>
                <div className="container mx-auto mb-4 ">
                    <label className="block mb-2">Avatar</label>
                    {profile.avatar && (
                        <img
                            src={profile.avatar}
                            alt=""
                            className="w-full rounded mb-2 object-cover object-center"
                            style={{ height: '200px' }}
                        />
                    )}
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="container mx-auto p-4">
                    <div className="mb-4">
                        <label className="block mb-2">Username</label>
                        <input
                            className="border rounded w-full p-2 mb-2"
                            name="username"
                            value={profile.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input
                            className="border rounded w-full p-2 mb-2"
                            type="password"
                            name="password"
                            value={profile.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input
                            className="border rounded w-full p-2 mb-2"
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Gender</label>
                        <select
                            className="border rounded w-full p-2 mb-2"
                            name="gender"
                            value={profile.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Choose gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Phone number</label>
                        <input
                            className="border rounded w-full p-2 mb-2"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Date of birth</label>
                        <input
                            className="border rounded w-full p-2 mb-2"
                            type="date"
                            name="dob"
                            value={profile.dob}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>

    );
};
export default Index;