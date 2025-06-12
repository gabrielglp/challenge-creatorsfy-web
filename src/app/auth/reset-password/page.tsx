"use client";

import AuthLayout from "@/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }
    if (newPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess("Sua senha foi redefinida com sucesso!");
      console.log("Senha redefinida!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error) {
      setError(`Ocorreu um erro ao redefinir sua senha: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center md:items-start text-left">
        <div className="w-full flex items-center mb-12 md:hidden border-b pb-2">
          <button
            onClick={handleGoBack}
            className="p-2 transition-colors duration-200 flex items-center justify-center w-6 h-6 mr-3 ml-2"
            aria-label="Voltar"
          >
            <LeftOutlined className="h-6 w-6 text-black text-lg" />
          </button>
          <p className="text-creatorsfy-gray-dark text-lg font-normal flex-1 text-center mr-9">Nova Senha</p>
        </div>

        <div className="w-[93%]">
          <button
            onClick={handleGoBack}
            className="hidden md:flex self-start mb-12 p-2 transition-colors duration-200 items-center justify-center w-6 h-6"
            aria-label="Voltar"
          >
            <LeftOutlined className="text-black text-lg" />
          </button>
          
          <h2 className="w-full md:w-auto text-3xl font-semibold mb-2 text-gray-900">Redefinir Senha</h2>

          <form onSubmit={handleSubmit} className="w-full">
            <Input
              label="Nova Senha"
              id="newPassword"
              type="password"
              placeholder=""
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              error={error && newPassword.length < 6 ? error : null}
              className="mb-4"
            />
            <Input
              label="Confirmar Senha"
              id="confirmPassword"
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={error && newPassword !== confirmPassword ? error : null}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <Button variant="custom" className="rounded-[4px] md:rounded-md py-3 mt-12 md:mt-20" type="submit" fullWidth disabled={loading}>
              Finalizar Cadastro
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;