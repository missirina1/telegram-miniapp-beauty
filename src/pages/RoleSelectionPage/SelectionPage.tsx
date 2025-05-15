import { useNavigate } from 'react-router-dom';

export default function SelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4">
      <h1 className="text-2xl font-bold">Кто вы?</h1>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full max-w-xs"
        onClick={() => navigate('/master/home')}
      >
        Я мастер
      </button>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg w-full max-w-xs"
        onClick={() => navigate('/client/home')}
      >
        Я клиент
      </button>
    </div>
  );
}
