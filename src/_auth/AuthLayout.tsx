import { Outlet, Navigate } from 'react-router-dom';


function AuthLayout() {
  const isAuthenticated = false;

  return (
    <>
      {
        isAuthenticated ?
          <Navigate to='/asebridge/' /> : (
            <>
              <section className='flex flex-1 justify-center items-center flex-col py-10 bg-white' >
                <Outlet />
              </section>

              <img
                src='/asebridge/assets/images/side.jpeg'
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