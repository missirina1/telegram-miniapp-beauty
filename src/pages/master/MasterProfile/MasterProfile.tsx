import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

export default function MasterProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('masterProfile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-4 text-[#4e342e]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Профиль</h1>
        <button
          className="text-[#4e342e] hover:text-[#6d4c41]"
          onClick={() => {
            navigate('/master/profile-settings');
          }}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
      <div className="bg-[#d7ccc8] p-4 rounded-2xl shadow-md">
        <p>
          <span className="font-semibold">Имя:</span> {profile.firstName}
        </p>
        <p>
          <span className="font-semibold">Фамилия:</span> {profile.lastName}
        </p>
        <p>
          <span className="font-semibold">Телефон:</span> {profile.phone}
        </p>
        <p>
          <span className="font-semibold">Город:</span> {profile.city}
        </p>
      </div>
    </div>
  );
}
