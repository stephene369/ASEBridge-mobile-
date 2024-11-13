import { Outlet, Navigate } from 'react-router-dom';
import studentImg from "/asebridge/assets/images/side.jpeg"

function AuthLayout() {
  const isAuthenticated = false;

  return (
    <>
      {
        isAuthenticated ?
          <Navigate to='/asebridge/' /> : (
            <>
              <section className='flex flex-1 justify-start items-center flex-col py-10 h-full bg-white overflow-y-auto'>
                <Outlet />
              </section>
              <img
                src={studentImg}
                alt='logo'
                className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
              />

            </>
          )
      }
    </>
  )

}

export default AuthLayout;