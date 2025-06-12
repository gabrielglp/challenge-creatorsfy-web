"use client";

import AuthLayout from "@/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import IconUser from "../../../../public/icons/userAddFill.svg"
import IconStore from "../../../../public/icons/store.svg"

interface ProfileCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ icon, title, description, isSelected, onClick }) => {
  return (
    <div
      className={`
        flex flex-col items-center px-[30px] xl:px-[60px] h-[133px] border rounded-lg cursor-pointer
        transition-all duration-200 ease-in-out
        ${isSelected ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className={`p-4 mb-2 ${isSelected ? 'text-white' : 'text-gray-600'}`}>
          {icon}
        </div>
        <h3 className="text-[17px] mb-2 text-creatorsfy-gray-dark200">{title}</h3>
      </div>
      <p className="text-center text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const SelectProfilePage = () => {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<"influencer" | "loja" | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleContinue = async () => {
    if (!selectedProfile) {
      alert("Por favor, selecione um perfil para continuar.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(`Perfil selecionado: ${selectedProfile}`);

    router.push("/dashboard");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center md:items-start text-center md:text-left mb-0 xl:mb-28">
        <div className="w-full flex items-center mb-16 md:hidden border-b pb-2">
          <button
            onClick={handleGoBack}
            className="p-2 transition-colors duration-200 flex items-center justify-center w-6 h-6 mr-3 ml-2"
            aria-label="Voltar"
          >
            <LeftOutlined className="h-6 w-6 text-black text-lg" />
          </button>
          <p className="text-creatorsfy-gray-dark text-lg font-normal flex-1 text-center mr-9">Cadastro</p>
        </div>

        <button
          onClick={handleGoBack}
          className="hidden md:flex self-start mb-16 p-2 transition-colors duration-200 items-center justify-center w-6 h-6"
          aria-label="Voltar"
        >
          <LeftOutlined className="text-black text-lg" />
        </button>

        <div className="w-[93%] md:w-auto">
          <h2 className="text-start text-xl font-semibold mb-1 text-creatorsfy-black">Qual o seu perfil?</h2>
          <p className="text-start text-creatorsfy-gray-dark mb-8 text-[13px] md:text-base">Escolha a opção que melhor te representa.</p>

          <div className="grid grid-cols-1 grid-cols-2 gap-6 w-full max-w-md">
            <ProfileCard
              icon={<Image width={27.62} height={27.62} src={IconUser} alt={"Icone User"} />}
              title="Influencer"
              description=""
              isSelected={selectedProfile === "influencer"}
              onClick={() => setSelectedProfile("influencer")}
            />
            <ProfileCard
              icon={<Image width={27.62} height={27.62} src={IconStore} alt={"Icone Store"} />}
              title="Loja"
              description=""
              isSelected={selectedProfile === "loja"}
              onClick={() => setSelectedProfile("loja")}
            />
          </div>

          <div className="md:hidden flex mt-8 w-full max-w-md">
            <Button className="rounded-md py-3 bg-creatorsfy-bg-lighter100 bg-opacity-40" variant="secondary" onClick={handleContinue} fullWidth disabled={loading}>
              <p className="text-creatorsfy-gray-bold200 text-opacity-40">Avançar</p>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SelectProfilePage;