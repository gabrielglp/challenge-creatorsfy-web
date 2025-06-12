"use client";

import AuthLayout from "@/layouts/AuthLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import OTPInput from "@/components/auth/OTPInput";
import { LeftOutlined } from "@ant-design/icons";

interface CircularLoadingProps {
  percentage: number;
}

const CircularLoading: React.FC<CircularLoadingProps> = ({ percentage }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#3B82F6"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "email@gmail.com";
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(53);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer, isTimerActive]);

  const handleCompleteOTP = (completedOtp: string) => {
    setOtp(completedOtp);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setError(null);
    setLoadingProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setLoadingProgress(100);
      clearInterval(progressInterval);

      if (otp === "4712") {
        console.log("Código verificado com sucesso!");
        setTimeout(() => {
          router.push("/auth/select-profile");
        }, 500);
      } else {
        setError("Código inválido. Tente novamente.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao verificar o código.");
      console.error("Erro na verificação:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setLoadingProgress(0);
      }, 500);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center md:items-start text-center md:text-left mb-0 xl:mb-28 mt-14">
        <div className="w-full flex items-center mb-12 md:hidden border-b pb-2">
          <button
            onClick={handleGoBack}
            className="p-2 transition-colors duration-200 flex items-center justify-center w-6 h-6 mr-3 ml-2"
            aria-label="Voltar"
          >
            <LeftOutlined className="h-6 w-6 text-black text-lg" />
          </button>
          <p className="text-creatorsfy-gray-dark text-lg font-normal flex-1 text-center mr-9">Verificação</p>
        </div>

        <button
          onClick={handleGoBack}
          className="hidden md:flex self-start mb-12 p-2 transition-colors duration-200 items-center justify-center w-6 h-6"
          aria-label="Voltar"
        >
          <LeftOutlined className="text-black text-lg" />
        </button>

        <div className="w-[93%] md:w-auto">
            <h2 className="text-xl font-semibold mb-2 text-creatorsfy-black">Verificação</h2>
            <p className="text-creatorsfy-gray-dark mb-8">
              Insira o código que enviamos para{" "}
              <span className="font-bold">{email}</span>
            </p>

            <OTPInput length={4} onComplete={handleCompleteOTP} error={error ? "true" : undefined} />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <p className="text-creatorsfy-gray-medium200 text-opacity-80 mb-20">
              Reenviar código em{" "}
              <span className="text-blue-600">{" "}0:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}</span>
            </p>

            <Button className="w-full xl:w-[23rem] rounded-md py-3" onClick={handleVerifyCode} fullWidth disabled={loading}>
              Continuar
            </Button>
          </div>

          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <CircularLoading percentage={loadingProgress} />
            </div>
          )}
        </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;