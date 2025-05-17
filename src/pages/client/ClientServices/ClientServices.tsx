import { useState, useEffect } from "react";

type Service = {
  id: number;
  name: string;
  volume: string;
  duration: string;
  price: string;
  photo: string;
};

export default function ClientServices() {
  const [mockServices, setMockServices] = useState<Service[]>([]);

  const servicesData: Service[] = [
    {
      id: 1,
      name: "Классическое наращивание ресниц",
      volume: "1:1",
      duration: "1.5 часа",
      price: "3500 ₽",
      photo: "https://source.unsplash.com/300x200/?eyelashes,classic",
    },
    {
      id: 2,
      name: "Объемное наращивание ресниц 2D-3D",
      volume: "2D-3D",
      duration: "2 часа",
      price: "4500 ₽",
      photo: "https://source.unsplash.com/300x200/?eyelashes,volume",
    },
    {
      id: 3,
      name: "Мега объем 5D и выше",
      volume: "5D+",
      duration: "2.5 часа",
      price: "6000 ₽",
      photo: "https://source.unsplash.com/300x200/?eyelashes,mega-volume",
    },
    {
      id: 4,
      name: "Снятие ресниц",
      volume: "-",
      duration: "30 минут",
      price: "500 ₽",
      photo: "https://source.unsplash.com/300x200/?eyelashes,removal",
    },
    {
      id: 5,
      name: "Коррекция ресниц",
      volume: "-",
      duration: "1 час",
      price: "1500 ₽",
      photo: "https://source.unsplash.com/300x200/?eyelashes,correction",
    },
    {
      id: 6,
      name: "Ламинирование ресниц",
      volume: "-",
      duration: "1 час",
      price: "2500 ₽",
      photo: "https://source.unsplash.com/300x200/?eyelashes,lamination",
    },
    {
      id: 7,
      name: "Тонирование ресниц",
      volume: "-",
      duration: "45 минут",
      price: "1200 ₽",
      photo: "https://source.unsplash.com/300x200/?eyelashes,toning",
    },
  ];

  //загружаем данные
  useEffect(() => {
    setMockServices(servicesData);
  }, []);

  return (
    <div className="p-4 bg-[#f8f5f2] text-[#4e342e] min-h-screen flex flex-col">
      <h1 className="text-xl font-semibold mb-4">
        Выбери услугу наращивания ресниц
      </h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto flex-grow max-h-[70vh] pr-2"
        style={{ scrollbarWidth: "thin" }}
      >
        {mockServices.map(({ id, name, volume, duration, price, photo }) => (
          <div
            key={id}
            className="bg-[#d7ccc8] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <img
              src={photo}
              alt={name}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="p-3 text-center">
              <h3 className="font-semibold mb-1 truncate">{name}</h3>
              <p className="text-sm text-[#6d4c41]">
                Объём: {volume} <br />
                Время: {duration} <br />
                Цена: {price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
