import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import Lottie from 'react-lottie-player'
import lottieJson from "/asebridge/assets/js/Animation - 1727072262647.json"


const InternetWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      if (Capacitor.isNativePlatform()) {
        const status = await Network.getStatus();
        setIsOnline(status.connected);
      } else {
        setIsOnline(navigator.onLine);
      }
    };

    const handleStatusChange = (status: any) => {
      setIsOnline(status.connected);
    };

    if (Capacitor.isNativePlatform()) {
      Network.addListener('networkStatusChange', handleStatusChange);
      checkConnection();
    } else {
      window.addEventListener('online', () => setIsOnline(true));
      window.addEventListener('offline', () => setIsOnline(false));
    }

    return () => {
      if (Capacitor.isNativePlatform()) {
        Network.removeAllListeners();
      } else {
        window.removeEventListener('online', () => setIsOnline(true));
        window.removeEventListener('offline', () => setIsOnline(false));
      }
    };
  }, []);

  if (location.pathname) {
    
  }

  return (
    <>
      {children}
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ${isOnline ? 'hidden' : ''}`}>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 150, height: 150 }}
        />
          <p className=" text-sm text-gray-800 dark:text-gray-200">
            No internet connection
          </p>
        </div>
      </div>
    </>
  );
};

export default InternetWrapper;
