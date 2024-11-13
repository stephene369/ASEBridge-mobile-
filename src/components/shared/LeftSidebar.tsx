import { sidebarLinks } from '../../constants';
import { useUserContext } from '../../context/AuthContext'
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations';
import { INavLink } from '../../types';

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { useEffect } from 'react';

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (isSuccess) {
        navigate(0)
    }
}, [isSuccess])

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to='/asebridge/' className="flex gap-3 items-center">
          <img src="/asebridge/assets/images/ase.png" alt="logo"
            width={150}
            height={36}
          />
        </Link>

        <Link to={`/asebridge/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            className='h-14 w-14 rounded-full'
            src={user.imageUrl || '/asebridge/assets/icons/profile-placeholder.svg'}
            alt="profile"
          />

          <div className="flex flex-col">
            <p className="doby-bold">
              {user.name}
            </p>
            <p className="small-regular text-light-3">
              @{user.username}
            </p>
          </div>
        </Link>

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
                        }`} />
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