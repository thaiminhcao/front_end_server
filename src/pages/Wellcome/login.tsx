import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [, setIsSuccess] = useState(false);
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !email) { // Kiểm tra trường đã được nhập hay chưa
      setIsError(true);
      return;
    }
    fetch('https://backend-server-pl7n.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        // Xử lý kết quả từ API tại đây
        if (data.message === "Sucessful") {
          toast.success('Login successful', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsSuccess(true);

          console.log(data.message);

          navigate('/dashboard/home');
        } else {
          toast.error('Login failed', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsSuccess(false);
        }

      })
      .catch(error => {
        // Xử lý lỗi tại đây
        console.error(error);
        toast.error('Server is currently busy. Please try again later', {
          position: toast.POSITION.TOP_RIGHT
        });
        setIsSuccess(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-semibold mb-8 text-center">Login</h1>
        <div className="bg-white shadow-lg rounded-lg px-12 py-10">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            {isError && (
              <p className="text-red-500">Please fill in all the fields.</p>
            )}

            <ToastContainer />
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/registration" className="text-blue-500 hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>

        </div>
      </div>
    </div >
  );
};

export default Index;
