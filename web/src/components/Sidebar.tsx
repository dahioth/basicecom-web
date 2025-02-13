import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector} from "../store/hooks";
import { logout, selectCurrentUser} from '../store/slices/authSlice';
import { Package, ShoppingCart, Users, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser)

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-4 px-6 mb-8">
        <Package className="h-8 w-8" />
        <span className="text-2xl font-semibold">Shop Admin</span>
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-6 py-3 hover:bg-gray-700 rounded-lg transition-colors ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Package className="h-5 w-5" />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-6 py-3 hover:bg-gray-700 rounded-lg transition-colors ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Orders</span>
        </NavLink>

        { currentUser?.role == "ADMIN"
          && <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-6 py-3 hover:bg-gray-700 rounded-lg transition-colors ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Users className="h-5 w-5" />
          <span>Users</span>
        </NavLink>}

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-gray-700 rounded-lg transition-colors text-red-400 hover:text-red-300"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;