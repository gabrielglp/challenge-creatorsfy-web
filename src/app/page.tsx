"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HomePage = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    if (isMobile) {
      const timer = setTimeout(() => {
        router.push('/welcome');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      router.replace('/auth/login');
    }
  }, [isMobile, router]);

  if (isMobile === null) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p className="text-gray-600">Carregando...</p>
        </div>
    );
  }

  if (isMobile) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
        <Image
          src="/images/background90°.jpg"
          alt="Background"
          fill
          priority
          className=""
          sizes="100vw"
          quality={100}
        />
        
        <h1 
          className="relative z-10 text-[43px] font-normal tracking-wider"
          style={{
            color: 'rgba(203, 250, 255, 0.7)',
            fontFamily: 'Jost, sans-serif',
            fontWeight: '400',
            letterSpacing: '0.5px'
          }}
        >
          creatorsfy
        </h1>
      </div>
    );
  }
  return null;
};

export default HomePage;