"use client";

import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { AppleFilled } from "@ant-design/icons";
import Image from "next/image";
import IconGoogle from "../../../../public/icons/IconGoogle.svg"
import IconFacebook from "../../../../public/icons/iconFecabook.svg"

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email.includes("@")) {
        console.log("Cadastro com e-mail:", email);
        router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        setError("Por favor, insira um e-mail válido.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
      console.error("Erro no cadastro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    router.push("/auth/verify-email");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-start h-full px-4 mt-12">
        <h2 className="text-xl font-semibold mb-1 text-creatorsfy-black">Cadastre-se</h2>
        <p className="text-creatorsfy-gray-dark mb-8">Crie uma conta para continuar.</p>

        <form onSubmit={handleRegister} className="w-full space-y-4">
          <Input
            label="E-mail"
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={error}
          />

          <Button className="rounded-sm" type="submit" fullWidth disabled={loading}>
            {loading ? "Carregando..." : "Continuar"}
          </Button>
        </form>

        <p className="text-creatorsfy-gray-light mt-6 mb-8 w-full text-center text-base">
          Já possui conta?{" "}
          <Link href="/auth/login" className="text-creatorsfy-navy hover:underline">
            Entrar
          </Link>
        </p>

        <div className="relative flex items-center w-full my-6">
          <div className="flex-grow border-t border-creatorsfy-gray-border"></div>
          <span className="flex-shrink mx-8 text-creatorsfy-dark-purple100 text-opacity-60 text-sm">ou continue com</span>
          <div className="flex-grow border-t border-creatorsfy-gray-border"></div>
        </div>

        <div className="w-full text-center">
          <div className="flex justify-center space-x-4 mt-4">
            <Button
              variant="outline"
              className="p-3 w-24 h-16 flex items-center justify-center rounded-2xl"
              aria-label="Login com Facebook"
            >
              <Image width={28.76} height={28.76} src={IconFacebook} alt={"Icone Facebook"} />
            </Button>
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="p-3 w-24 h-16 flex items-center justify-center rounded-2xl"
              aria-label="Login com Google"
            >
              <Image width={28.76} height={28.76} src={IconGoogle} alt={"Icone Google"} />
            </Button>
            <Button
              variant="outline"
              className="p-3 w-24 h-16 flex items-center justify-center rounded-2xl"
              aria-label="Login com Apple"
            >
              <AppleFilled className="text-gray-800 text-[28.76px]" />
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;