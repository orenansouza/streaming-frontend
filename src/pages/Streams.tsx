import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { VideoPlayer } from '../components/VideoPlayer';

interface Stream {
  id: string;
  title: string;
  description?: string;
  status: string;
  videoUrl?: string;
}

export default function Streams() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

  useEffect(() => {
    api.get('/stream/list').then((res) => setStreams(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-semibold">Streams</h2>
        <Link
          to="/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition"
        >
          Fazer upload
        </Link>
      </div>

      {streams.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-2xl font-semibold">
            Nenhum streaming criado ainda.
          </p>
          <p className="mt-2">
            Clique no botão <span className="text-blue-600">“Fazer upload”</span> acima para adicionar um vídeo.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="border rounded-lg p-5 shadow hover:shadow-lg transition cursor-default"
            >
              <h3 className="text-2xl font-semibold mb-2">{stream.title}</h3>
              <p className="text-gray-700 mb-1">{stream.description}</p>
              <p className="text-sm text-gray-500 mb-3">Status: {stream.status}</p>
              {stream.videoUrl && (
                <button
                  onClick={() => setSelectedStream(stream)}
                  className="text-blue-600 underline hover:text-blue-800 font-semibold bg-transparent border-none p-0 cursor-pointer"
                >
                  Ver vídeo
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedStream && (
        <VideoPlayer
          videoUrl={selectedStream.videoUrl!}
          title={selectedStream.title}
          onClose={() => setSelectedStream(null)}
        />
      )}
    </div>
  );
}
