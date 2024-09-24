import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '@/context/AuthContext';
import Lottie from 'react-lottie-player'
import lottieJson from "/asebridge/assets/js/Animation - 1727072262647.json"


const InitialLoader: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();

  useEffect(() => {
    const checkConnection = async () => {
      if (navigator.onLine) {
        setTimeout(() => {
          setIsOnline(true);
          setIsLoading(true);
        }, 4000);
        setIsOnline(true);
        setIsLoading(true);
        const isAuthenticated = await checkAuthUser();
        if (isAuthenticated) {
          navigate('/asebridge');
        }
        setIsLoading(false);
      } else {
        setIsOnline(false);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkConnection, 2000);

    const handleOnline = () => {
      setIsOnline(true);
      checkConnection();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', handleOnline);
    };
  }, [navigate, checkAuthUser]);

  return (
    <div className={`fixed inset-0 z-51 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ${!isLoading && isOnline ? 'hidden' : ''}`}>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 150, height: 150 }}
        />        <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
          {isLoading ? 'Loading...' : isOnline ? 'Connecting...' : 'No internet connection'}
        </p>
      </div>
    </div>
  );
};

export default InitialLoader;