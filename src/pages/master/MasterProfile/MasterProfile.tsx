import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

export default function MasterProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    contact: '',
    description: '',
    photo: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('masterProfile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-5 text-[#4e342e] font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Профиль</h1>
        <button
          className="text-[#4e342e] hover:text-[#6d4c41] transition-colors"
          onClick={() => navigate('/master/profile-settings')}
          aria-label="Настройки профиля"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-[#efebe9] p-6 rounded-2xl shadow-md">
        <div className="flex items-center mb-4">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Фото профиля"
              className="w-20 h-20 rounded-full border-2 border-[#a1887f] object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#a1887f] flex items-center justify-center text-white text-xl font-bold">
              ?
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-xl font-semibold">
              {profile.name || 'Имя мастера'}
            </h2>
            <p className="text-sm text-[#6d4c41]">
              {profile.contact || 'Контакт не указан'}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium mb-1">О себе</h3>
          <p className="text-sm text-[#5d4037] whitespace-pre-line">
            {profile.description || 'Описание пока не добавлено.'}
          </p>
        </div>
      </div>
    </div>
  );
}
