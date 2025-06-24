import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    console.log('before e.preventDefault')
    e.preventDefault();
    console.log('after do e.preventDefault')
    try {
      console.log('before import env', console.log(process.env.REACT_APP_API_URL))
      const API_URL = process.env.REACT_APP_API_URL;
      console.log('after import env')
      console.log('register', API_URL)

      await axios.post(`${API_URL}/api/users`, {
        username,
        password,
      });
      navigate('/');
    } catch (err) {
      console.log(err)
      setError('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Usuário</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Senha</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Cadastrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:underline"
            >
              Voltar para Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
