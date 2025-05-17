import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

const mockMasters = [
  {
    id: 1,
    name: "Алина Иванова",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Мастер маникюра и педикюра с опытом 5 лет.",
  },
  {
    id: 2,
    name: "Олег Петров",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "Профессиональный парикмахер, специализация — мужские стрижки.",
  },
  {
    id: 3,
    name: "Мария Смирнова",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    description: "Визажист с большим портфолио и отличными отзывами.",
  },
];

export default function HomeClient() {
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    WebApp.expand();
    WebApp.MainButton.hide();

    // Тут можно будет заменить на загрузку с сервера
    setMasters(mockMasters);
  }, []);

  const handleBooking = (masterId) => {
    alert(
      `Переход к записи к мастеру с ID ${masterId} (реализуй переход позже)`
    );
  };

  return (
    <div className="p-4 bg-[#f8f5f2] text-[#4e342e] min-h-screen">
      <h1 className="text-xl font-semibold mb-6">Выбери мастера ✨</h1>

      <div className="space-y-4">
        {masters.map(({ id, name, photo, description }) => (
          <div
            key={id}
            className="flex items-center bg-[#d7ccc8] rounded-xl p-4 shadow-md"
          >
            <img
              src={photo}
              alt={name}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-sm text-[#6d4c41]">{description}</p>
            </div>
            <button
              onClick={() => handleBooking(id)}
              className="ml-4 px-3 py-1 bg-[#6d4c41] text-white rounded-md hover:bg-[#5a3d30]"
            >
              Записаться
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
