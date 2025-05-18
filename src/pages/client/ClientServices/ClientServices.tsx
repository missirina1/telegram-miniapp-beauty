import { useState, useEffect } from "react";
import image from "../../../assets/image.png";

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
      name: "Классика",
      volume: "1:1",
      duration: "1.5 часа",
      price: "3500 ₽",
      photo: image,
    },
    {
      id: 2,
      name: "Объемное наращивание  ",
      volume: "2D-3D",
      duration: "2 часа",
      price: "4500 ₽",
      photo: image,
    },
    {
      id: 3,
      name: "Мега объем ",
      volume: "5D+",
      duration: "2.5 часа",
      price: "6000 ₽",
      photo: image,
    },
    {
      id: 4,
      name: "Снятие ресниц",
      volume: "-",
      duration: "30 минут",
      price: "500 ₽",
      photo: image,
    },
    {
      id: 5,
      name: "Коррекция ресниц",
      volume: "-",
      duration: "1 час",
      price: "1500 ₽",
      photo: image,
    },
    {
      id: 6,
      name: "Ламинирование ресниц",
      volume: "-",
      duration: "1 час",
      price: "2500 ₽",
      photo: image,
    },
    {
      id: 7,
      name: "Тонирование ресниц",
      volume: "-",
      duration: "45 минут",
      price: "1200 ₽",
      photo: image,
    },
  ];

  //загружаем данные
  useEffect(() => {
    setMockServices(servicesData);
  }, []);

  return (
    <div className="p-5 bg-[#f8f5f2] text-[#4e342e] min-h-screen flex flex-col">
      <h1 className="text-xl font-semibold mb-8 text-center">
        Выбери услугу наращивания ресниц
      </h1>

      <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-grow max-h-[70vh]">
        {mockServices.map(({ id, name, volume, duration, price, photo }) => (
          <div
            key={id}
            className="bg-[#d7ccc8] rounded-2xl shadow-md hover:shadow-lg transition-shadow w-full max-w-[170px] mx-auto"
          >
            <img
              src={photo}
              alt={name}
              className="w-full h-[120px] object-cover rounded-t-2xl"
            />
            <div className="p-2 text-left text-xs">
              <h4 className="font-semibold mb-1 break-words">{name}</h4>
              <p className="text-[#6d4c41] leading-tight">
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
