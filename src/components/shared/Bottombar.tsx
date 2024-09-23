import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const { pathname } = useLocation();

  const bottombarLinks = [
    {
      icon: "bx-home",
      route: "/asebridge",
      label: "Home",
    },    
    {
      icon: "bx-group",
      route: "/asebridge/all-users",
      label: "People",
    },
    {
      icon: "bx-image",
      route: "/asebridge/explore",
      label: "Explore",
    },
    {
      icon: "bx-bookmark",
      route: "/asebridge/saved",
      label: "Saved",
    },
    {
      icon: "bx-image-add",
      route: "/asebridge/create-post",
      label: "Create",
    },

  ];


  return (

    <section className="bottom-bar">
      {bottombarLinks.map(
        (link) => {
          const isActive = pathname === link.route;

          return (
            <Link to={link.route}
              key={link.label}
              className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`} >
              <i className={`bx ${link.icon} bx-sm ${isActive ? 'text-white ' : ''}` }></i>
              <p className='tiny-medium text-light-2'>{link.label}</p>
            </Link>

          )
        }
      )}
    </section>

  )
}

export default Bottombar;