import { useState, useEffect } from "react";

type Master = {
  id: number;
  name: string;
  photo: string;
  description: string;
};

export default function HomeClient() {
  // Указываем тип состояния как массив объектов типа Master
  const [mockMasters, setMockMasters] = useState<Master[]>([]);

  const mastersData: Master[] = [
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

  // Загружаем мастеров при монтировании компонента
  useEffect(() => {
    setMockMasters(mastersData);
  }, []);

  return (
    <div className="p-4 bg-[#f8f5f2] text-[#4e342e] min-h-screen">
      <h1 className="text-xl font-semibold mb-6 text-center">
        Выбери мастера ✨
      </h1>

      <div className="flex flex-col items-center gap-4 max-h-[70vh] overflow-y-auto">
        {mockMasters.map(({ id, name, photo, description }) => (
          <div
            key={id}
            className="bg-[#d7ccc8] rounded-2xl shadow-md hover:shadow-lg transition-shadow w-full w-[375px] p-4 flex gap-3 items-start"
          >
            <img
              src={photo}
              alt={name}
              className="w-16 h-16 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col flex-1">
              <h2 className="text-sx font-semibold break-words">{name}</h2>
              <p className="text-xs text-[#6d4c41] mb-2">{description}</p>
              <button className="self-start mt-auto px-3 py-1.5 bg-[#6d4c41] text-white text-sm rounded-md hover:bg-[#5a3d30] transition-colors">
                Записаться
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
