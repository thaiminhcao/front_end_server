
import Layout from '../dashboard';
import React, { useState } from 'react';
interface Profile {
    username: string;
    password: string;
    email: string;
    gender: string;
    phone_number: string;
    dob: string;
    avatar: string;
}

const ProfilePage = () => {
    const [profile, setProfile] = useState<Profile>({
        username: '',
        password: '',
        email: '',
        gender: '',
        phone_number: '',
        dob: '',
        avatar: '',
    });

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

    return (
        <div><Layout />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <div className="mb-4">
                    <label className="block mb-2">Username</label>
                    <input
                        className="border rounded w-1/3 p-2 mb-2"
                        name="username"
                        value={profile.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        className="border rounded w-1/3 p-2 mb-2"
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        className="border rounded w-1/3 p-2 mb-2"
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Gender</label>
                    <select
                        className="border rounded w-1/3 p-2 mb-2"
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
                        className="border rounded w-1/3 p-2 mb-2"
                        name="phone_number"
                        value={profile.phone_number}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Date of birth</label>
                    <input
                        className="border rounded w-1/3 p-2 mb-2"
                        type="date"
                        name="dob"
                        value={profile.dob}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="mb-4">
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
        </div>

    );
};

export default ProfilePage;
