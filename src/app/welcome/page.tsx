"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import Arrow from "../../../public/icons/Vector.svg"

const WelcomePage = () => {
  return (
    <div 
      className="flex flex-col items-center justify-end h-screen px-8 pb-8 text-white overflow-hidden"
      style={{
        backgroundImage: 'url("/images/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0" />
      
      <div className="w-full max-w-sm text-center relative z-10">
        <h1 className="text-[39.47px] sm:text-5xl font-normal leading-tight mb-8 text-start">
          Monetize{" "} 
          <p>sua influência</p>
          <p>e acompanhe</p>
          <div className="flex">
            <span className="text-white">seu{" "}</span>
            <span style={styles.gradient} className="font-bold ml-3">sucesso!</span>
            <Image className="ml-2" src={Arrow} alt='Seta'/>
          </div>
        </h1>
        
        <div className="space-y-4">
          <Button variant="primary" className="bg-white py-4 rounded-sm" fullWidth size="lg">
            <Link className="text-creatorsfy-blue-deep200 text-xl font-medium" href="/auth/register">
              Iniciar Cadastro
            </Link>
          </Button>
          <p className="text-center text-xl text-white">
            Já possui acesso?{" "}
            <Link href="/auth/login" className="text-white hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = ({
  gradient: {
    background: 'linear-gradient(135deg, #6BD5F9 0%, #5B82F2 50%, #B7DFFF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  }
});

export default WelcomePage;