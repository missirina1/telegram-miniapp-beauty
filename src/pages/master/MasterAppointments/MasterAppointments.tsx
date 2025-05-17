import { useState, useEffect } from "react";

export default function MasterAppointments() {
  // Заглушка с примерами записей
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Тут будет загрузка реальных данных — пока пример
    setAppointments([
      { id: 1, client: "Анна", time: "2025-05-20 14:00", service: "Маникюр" },
      { id: 2, client: "Марина", time: "2025-05-21 16:30", service: "Стрижка" },
    ]);
  }, []);

  return (
    <div className="p-4 bg-[#f8f5f2] text-[#4e342e] min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Записи</h1>

      {appointments.length === 0 ? (
        <p className="text-sm text-[#6d4c41]">Записей пока нет</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map(({ id, client, time, service }) => (
            <li key={id} className="bg-[#d7ccc8] p-4 rounded-xl shadow-md">
              <p className="font-semibold">{client}</p>
              <p className="text-sm">{new Date(time).toLocaleString()}</p>
              <p className="italic">{service}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
