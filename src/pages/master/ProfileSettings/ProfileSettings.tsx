import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AvatarEditor from "react-avatar-editor";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const editorRef = useRef<AvatarEditor>(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  // Загружаем данные из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("masterProfile");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setName(data.name || "");
        setContact(data.contact || "");
        setDescription(data.description || "");
        setPhotoPreview(data.photo || null);
      } catch (e) {
        // Если localStorage поврежден — игнорируем
      }
    }
  }, []);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhotoFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let finalPhoto = photoPreview;

    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      finalPhoto = canvas;
    }

    localStorage.setItem(
      "masterProfile",
      JSON.stringify({ name, contact, description, photo: finalPhoto })
    );
    navigate("/master/profile");
  };

  return (
    <div className="min-h-screen bg-background text-chocolate p-4 pb-16 font-sans">
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
              rows={3}
              className="w-full border border-chocolate-light rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-chocolate"
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
            {photoFile && (
              <div className="flex flex-col items-center gap-2">
                <AvatarEditor
                  ref={editorRef}
                  image={photoFile}
                  width={150}
                  height={150}
                  border={30}
                  borderRadius={75}
                  color={[255, 255, 255, 0.6]} // фон
                  scale={scale}
                  rotate={0}
                />
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.01"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                />
              </div>
            )}
            {!photoFile && photoPreview && (
              <img
                src={photoPreview}
                alt="Текущее фото"
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
