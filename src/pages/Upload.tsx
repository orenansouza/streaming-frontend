import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function UploadVideo() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  function handleBack() {
    navigate('/streams');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!file) {
      setMessage('Por favor, selecione um arquivo de vídeo.');
      return;
    }

    if (!title.trim()) {
      setMessage('O título é obrigatório.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      setLoading(true);
      setMessage(null);

      await api.post('/upload/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Upload realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/streams');
      }, 1500);
    } catch (error: any) {
      setMessage(`Erro ao enviar vídeo: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={handleBack}
          className="mb-6 inline-block px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold rounded border border-blue-600 hover:border-blue-700 transition"
        >
          &larr; Voltar
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Upload de Vídeo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold disabled:opacity-50 transition"
          >
            {loading ? 'Enviando...' : 'Enviar Vídeo'}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-red-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
