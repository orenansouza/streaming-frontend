import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL;

      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      setToken(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Entrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Não tem uma conta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline"
            >
              Cadastrar-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
