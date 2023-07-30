import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const dashboard = document.querySelector('.dashboard');
    if (dashboard) {
      dashboard.classList.remove('-translate-y-full');
    }
  }, []);

  return (
    <div className="bg-purple-900 text-white transform -translate-y-full transition-all duration-1000 ease-out dashboard">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-4xl font-extrabold text-white">Dashboard</h1>
          <div className="ml-4 flex space-x-4">
            <Link
              to="/dashboard/home"
              className={`text-purple-300 hover:text-purple-100 transition-all duration-300 text-lg font-semibold px-2 py-1 rounded-md ${location.pathname === '/dashboard/home' ? 'bg-purple-500' : 'hover:bg-purple-500'
                }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard/schedule"
              className={`text-purple-300 hover:text-purple-100 transition-all duration-300 text-lg font-semibold px-2 py-1 rounded-md ${location.pathname === '/dashboard/schedule' ? 'bg-purple-500' : 'hover:bg-purple-500'
                }`}
            >
              Schedule
            </Link>
            <Link
              to="/dashboard/notes"
              className={`text-purple-300 hover:text-purple-100 transition-all duration-300 text-lg font-semibold px-2 py-1 rounded-md ${location.pathname === '/dashboard/notes' ? 'bg-purple-500' : 'hover:bg-purple-500'
                }`}
            >
              Notes
            </Link>
            <Link
              to="/dashboard/plans"
              className={`text-purple-300 hover:text-purple-100 transition-all duration-300 text-lg font-semibold px-2 py-1 rounded-md ${location.pathname === '/dashboard/plans' ? 'bg-purple-500' : 'hover:bg-purple-500'
                }`}
            >
              Plans
            </Link>
            <Link
              to="/dashboard/profile"
              className={`text-purple-300 hover:text-purple-100 transition-all duration-300 text-lg font-semibold px-2 py-1 rounded-md ${location.pathname === '/dashboard/profile' ? 'bg-purple-500' : 'hover:bg-purple-500'
                }`}
            >
              Profile
            </Link>
            <Link
              to="/dashboard/settings"
              className={`text-purple-300 hover:text-purple-100 transition-all duration-300 text-lg font-semibold px-2 py-1 rounded-md ${location.pathname === '/dashboard/settings' ? 'bg-purple-500' : 'hover:bg-purple-500'
                }`}
            >
              Settings
            </Link>
          </div>
        </div>
        <div>
          <Link to="/" className="text-purple-300 hover:text-purple-100 transition-all duration-300 text-lg font-semibold px-2 py-1 rounded-md hover:bg-purple-500">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
