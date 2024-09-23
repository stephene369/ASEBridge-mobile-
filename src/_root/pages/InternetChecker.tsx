import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const InternetCheck: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkOnline = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      console.log( online, "Online : ", location.pathname)

      if (online) {
        console.log("Online : ", location.pathname)
        if (location.pathname === '/asebridge/sign-up') {
          navigate('/');
        } else {
          navigate(-1);
        }
      }
    };

    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);

    const intervalId = setInterval(checkOnline, 2000);

    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
      clearInterval(intervalId);
    };
  }, [navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader />
      <p className="mt-4 text-lg font-semibold">
        {isOnline ? 'Connecting...' : 'No internet access'}
      </p>
    </div>
  );
};

export default InternetCheck;