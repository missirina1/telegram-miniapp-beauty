import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSettings() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  // Загружаем данные из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('masterProfile');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setName(data.name || '');
        setContact(data.contact || '');
        setDescription(data.description || '');
        setPhoto(data.photo || null);
      } catch (e) {
        // Если localStorage поврежден — игнорируем
      }
    }
  }, []);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem(
      'masterProfile',
      JSON.stringify({ name, contact, description, photo })
    );
    navigate('/master/profile');
  };

  return (
    <div className="min-h-screen bg-background text-chocolate p-4 font-sans">
      <div className="max-w-md mx-auto rounded-2xl shadow-md bg-white p-6">
        <h1 className="text-2xl font-bold mb-4 text-chocolate">
          Настройки профиля
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
              className="w-full border border-chocolate-light rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-chocolate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <textarea
              placeholder="Расскажите о себе..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-chocolate-light rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-chocolate"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Контакт</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="@username или номер WhatsApp"
              className="w-full border border-chocolate-light rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-chocolate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Фото</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-sm text-chocolate file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-chocolate-light file:text-white hover:file:bg-chocolate"
            />
            {photo && (
              <img
                src={photo}
                alt="Предпросмотр"
                className="mt-2 h-24 w-24 object-cover rounded-full"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-chocolate text-white py-2 rounded-xl font-semibold hover:bg-opacity-90"
          >
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>
  );
}
