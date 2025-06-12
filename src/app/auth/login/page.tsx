"use client";

import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { AppleFilled } from "@ant-design/icons";
import Image from "next/image";
import IconGoogle from "../../../../public/icons/IconGoogle.svg"
import IconFacebook from "../../../../public/icons/iconFecabook.svg"

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
    } else {
      console.log("Login successful!");
      window.location.href = "/auth/verify-email";
    }
  };

  const handleGoogleLogin = () => {
    router.push("/auth/verify-email");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-start w-full h-full px-4 mt-12 md:mt-0">

        <h2 className="text-xl font-semibold mb-1 text-creatorsfy-black w-full text-start md:text-left">Bem-Vindo de Volta</h2>
        <p className="text-creatorsfy-gray-dark mb-8 w-full text-start md:text-left text-[16px]">Entre e acesse sua conta</p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <Input
            label="E-mail"
            id="email"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="mb-4">
            <Input
              label="Senha"
              id="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link href="/auth/reset-password" className="text-base text-creatorsfy-blue-primary underline mt-2 block text-right mb-4">
              Esqueci minha Senha
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button className="rounded-[4px] py-3" type="submit" fullWidth>
            Continuar
          </Button>
        </form>

        <p className="text-creatorsfy-gray-light mt-10 mb-4 w-full text-center text-base">
          Ainda não possui conta?{" "}
          <Link href="/auth/register" className="text-creatorsfy-navy hover:underline">
            Cadastrar
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
              onClick={() => signIn("facebook")}
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
              onClick={() => signIn("apple")}
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

export default LoginPage;