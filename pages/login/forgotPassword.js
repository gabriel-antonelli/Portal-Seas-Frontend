import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ForgotPassword() {

    const [email, setEmail] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        return email;
    }

  return (
    <>
      <div className="h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex justify-center items-center ">
          <div className="w-screen flex">
            <div className="w-full h-auto hidden 2xl:bg-seas-lg bg-seas-sm bg-no-repeat lg:block rounded-lg mx-12" />
            <div className="w-full bg-gray-50 p-12">
              <h3 className="pt-4 mb-2 text-2xl">Esqueceu sua senha?</h3>
              <p className="text-sm text-gray-700">
                Insira seu email que enviaremos uma nova senha.
              </p>
              <form onSubmit={handleSubmit} className="pt-6 pb-8 mb-4 bg-grey-50 rounded">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    required
                    placeholder="Digite seu email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Resetar a senha
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link href="/">
                    <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      Lembrou sua senha? Clique para logar
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
