import Head from 'next/head'
import {useState} from 'react'
import usePosts from '../utils/query'

export default function Home() {

  const [state, setState] = useState({ password: '', email: ''});

  const handleChange = event => {
  const { name, value } = event.target;
      setState({
        ...state,
        [name]: value
      });
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    // const {data, isLoading, isError } = Query({name: "token", url: "auth", body: {senha: state.password, usuario: state.email}, type: "post"})
    const { status, data, error, isFetching } = usePosts();
  }

  return (
    <>
      <Head>
        <title>Login Portal-Seas</title>
      </Head>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">
                Email
              </label>
              <input
                name="email"
                type="text"
                id="email"
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
                value={state.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={state.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md"
                placeholder="Senha"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
