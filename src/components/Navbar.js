import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHeart,
  faBone,
  faCog,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector} from 'react-redux';
import { userSelector, removeUser } from '../features/User/UserSlice';


function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { email } = useSelector(
    userSelector
  );
  const dispatch = useDispatch();
  const history = useHistory();


  const onLogOut = () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
    history.push('/login');
  };
  return (
    <div className="flex items-center h-20 px-6 justify-between shadow-sm bg-white relative z-50">
      <Link to='/' className="flex-1 no-underline block h-8">
        <img
          src="https://takamolholding.com/wp-content/themes/takamol/assets/images/takamol-logo.png"
          alt='logo'
          className="h-full"
        />
      </Link>
      <div className="flex-none hidden md:flex md:justify-center md:h-full">
          {email ? (
              <>
                <div
                    onClick={onLogOut}
                    className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                    >
                        Log out
                    </div>
                <Link
                to="/fav"
                className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                >
                <FontAwesomeIcon icon={faHeart} className="mr-3" /> My favorites
                </Link>
                </>
          ) : (
              <>
            <Link
                        to="/signup"
                        className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                        >
                        <FontAwesomeIcon icon={faBone} className="mr-3" /> Sign up

                        </Link>
                        <Link
                        to="/login"
                        className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                        >
                        <FontAwesomeIcon icon={faCog} className="mr-3" /> Login
                        </Link>
            </>
          )}
      
      </div>
      <div className="flex-1 items-center justify-end hidden md:flex">
      </div>
      <FontAwesomeIcon
        icon={mobileOpen ? faTimes : faBars}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="text-black text-3xl cursor-pointer md:hidden"
      />
      {mobileOpen && (
        <div className="bg-white absolute top-full left-0 flex flex-col w-full py-8 shadow-sm lg:hidden">
          <div className="flex-1 flex flex-col items-center text-xl">
            {email ? (
              <>
                <div
                    onClick={onLogOut}
                    className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                    >
                        Log out
                    </div>
                <Link
                to="/fav"
                className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                >
                <FontAwesomeIcon icon={faHeart} className="mr-3" /> My favorites
                </Link>
                </>
          ) : (
              <>
            <Link
                        to="/signup"
                        className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                        >
                        <FontAwesomeIcon icon={faBone} className="mr-3" /> Sign up

                        </Link>
                        <Link
                        to="/login"
                        className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                        >
                        <FontAwesomeIcon icon={faCog} className="mr-3" /> Login
                        </Link>
            </>
          )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar