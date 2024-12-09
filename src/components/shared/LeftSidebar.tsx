import { sidebarLinks } from '../../constants';
import { useUserContext } from '../../context/AuthContext'
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations';
import { INavLink } from '../../types';

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])


  function DropDownMenu() {
    return (
      <div className="dropdown-">

        <a href={`/asebridge/profile/${user.id}`} className='menu-item'>
          <span className='icon-button'>
            <i className='bx bx-detail' ></i>
          </span>

          <span>
            Profil Details
          </span>
        </a>

        <a href={`/asebridge/grades`} className='menu-item'>
          <span className='icon-button'>
            <i className='bx bxs-graduation' ></i>
          </span>

          <span>
            Grades
          </span>
        </a>

        <a onClick={() => signOut()} className='menu-item'>
          <span className='icon-button'>
            <i className='bx bx-log-out'></i>
          </span>
          <span>Log Out</span>
        </a>

      </div>
    );
  }


  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to='/asebridge/' className="flex gap-3 items-center">
          <img src="/asebridge/assets/images/ase.png" alt="logo"
            width={150}
            height={36}
          />
        </Link>

        <div className='flex gap-3 items-center'  onClick={
            () => setOpen(!open)
          } >

          <a className='flex-center gap-3'>
            <img className='h-8 w-8 rounded-full'
              src={user.imageUrl || '/asebridge/assets/icons/profile-placeholder.svg'} alt="profile" />

            {open && <DropDownMenu />}
          </a>

          <div className="flex flex-col">
            <p className="doby-bold">
              {user.name}
            </p>
            <p className="small-regular text-light-3">
              @{user.username}
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map(
            (link: INavLink) => {
              const isActive = pathname === link.route;

              return (
                <li key={link.label}
                  className={`leftsidebar-link group ${isActive && 'bg-primary-500'
                    }`}  >
                  <NavLink to={link.route}
                    className='flex gap-4 items-center p-4'
                  >
                    <img src={link.imgURL} alt={link.label}
                      className={`group-hover:invert-white ${isActive && 'invert-white'
                        }`}
                    />
                    {link.label}

                  </NavLink>
                </li>

              )
            }
          )}
        </ul>
      </div>

      <Button variant='ghost' className='shad-button_ghost'
        onClick={() => signOut()}>
        <img src="/asebridge/assets/icons/logout.svg" alt="logout" />
        <p>Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar