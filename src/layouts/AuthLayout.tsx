"use client";

import React from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-[45%] flex flex-col mt-4 justify-normal md:justify-center sm:p-12 md:p-16 lg:p-20 relative bg-white items-center">
        <div className="absolute top-8 left-8 md:block hidden">
          <h1 className="text-[27.15px] font-normal text-creatorsfy-blue-deep font-jost">creatorsfy</h1>
        </div>
        <div className="max-w-xl w-full mx-auto md:mx-0">
          {children}
        </div>
      </div>

      <div className="hidden md:block md:w-[60%] relative overflow-hidden">
        <Image
          src="/images/background.jpg"
          alt="Background azul"
          fill
          quality={100}
          priority
          className="rotate-[90deg] scale-150 transform origin-center"
          sizes="(max-width: 768px) 0vw, 60vw"
        />
      </div>
    </div>
  );
};

export default AuthLayout;