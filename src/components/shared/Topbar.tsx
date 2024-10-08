import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';
import logo from "/asebridge/assets/images/ase.png"
import profilePlaceholder from "/asebridge/assets/icons/profile-placeholder.svg"


const Topbar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    // console.log(
    //     "Je suis user" ,user
    // )

    //console.log(user)
    useEffect(() => {
        if (isSuccess) {
            navigate(0)
        }
    }, [isSuccess])

    return (
        <section className="topbar bg-opacity-0">
            <div className="flex-between py-3 px-5 bg-opacity-0">
                <Link to='/asebridge/' className="flex gap-3 items-center">
                    <img src={logo} alt="logo"
                        width={100}
                        // height={325}
                    />
                </Link>

                <div className="flex gap-4">
                    <Button  className='bg-transparent flex-col m-0 p-0'
                        onClick={() => signOut()}>
                        <i className='bx bx-log-out text-[rgb(255,0,0)] text-2xl'></i>
                        {/* <span className='text-light-1 text-[8px]'>LogOut</span> */}
                    </Button>

                    <Link to={`/asebridge/profile/${user.id}`} className='flex-center gap-3' >
                        <img className='h-8 w-8 rounded-full'
                            src={user.imageUrl || profilePlaceholder} alt="profile" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default Topbar;