import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import { getYear } from 'date-fns';
const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<{ value: string; label: string } | null>(null);

  const [dob, setDob] = useState<bigint | null>(null);
  const dobDate = dob ? new Date(Number(dob)) : null;
  const dobTimestamp = dobDate ? dobDate.getDate() + dobDate.getMonth() * 100 + dobDate.getFullYear() * 10000 : null;
  const currentYear = getYear(new Date());
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  const [phoneNumber, setPhone] = useState<number|undefined>();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password || !email || !gender || !dob || !phoneNumber) { // Kiểm tra trường đã được nhập hay chưa
      setIsError(true);
      return;
    }
    const userData = {
      username,
      password,
      email,
      phoneNumber,
      gender: gender ? gender.value : null,
      dob: dobTimestamp
    };

    fetch('https://backend-server-pl7n.onrender.com/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        // Xử lý kết quả từ API tại đây
        if (data.message === "user exist") {
          toast.success('User already exists', {
            position: toast.POSITION.TOP_RIGHT
          });
          setIsSuccess(false);
        } else {


          toast.success('Registration successful', {
            position: toast.POSITION.TOP_RIGHT
          });
          setIsSuccess(true);
          if (isSuccess) {
            setTimeout(() => {
              navigate('/');
            }, 3000);
          }
        }
        console.log(data.message);
      })
      .catch(error => {
        // Xử lý lỗi tại đây
        console.error(error);
        toast.success('Server is currently busy. Please try again later', {
          position: toast.POSITION.TOP_RIGHT
        });
        setIsSuccess(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignUp} className="max-w-lg w-full mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2 ">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2 ">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2 ">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2 ">Phone Number</label>
          <input
            type="phoneNumber"
            value={phoneNumber}
            onChange={e => setPhone(Number(e.target.value))}
            placeholder='Enter your phone number'
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <
            label htmlFor="gender" className="block text-gray-700 font-medium mb-2 ">Gender</label>
          <Select
            id="gender"
            value={gender}
            onChange={selectedOption => setGender(selectedOption)}
            options={genders}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Select your gender"
          />
        </div>

        <div className="mb-4">

          <label htmlFor="dob" className="block text-gray-700 font-medium mb-2 ">Date of Birth</label>
          <DatePicker
            id="dob"
            selected={dob ? new Date(Number(dob)) : null} // Chuyển đổi dob từ BigInt thành số nguyên
            onChange={date => setDob(date ? BigInt(date.getTime()) : null)} // Cập nhật giá trị dob thành BigInt
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholderText="Select your date of birth"
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
          />
        </div>


        {isError && (
          <p className="text-red-500">Please fill in all the fields.</p>
        )}

        <ToastContainer />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Sign Up
        </button>


        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>

  );
};

export default SignUpForm;
