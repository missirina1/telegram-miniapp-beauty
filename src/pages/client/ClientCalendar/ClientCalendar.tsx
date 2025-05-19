import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ScheduleSlots = Record<string, string[]>; // пример: { "2025-05-20": ["10:00", "10:30"] }
type Booking = { date: string; time: string; name: string };

export default function ClientCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [allSlots, setAllSlots] = useState<ScheduleSlots>({});
  const navigate = useNavigate();

  // Загружаем все слоты мастера при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem("masterAvailableSlots");
    if (saved) {
      setAllSlots(JSON.parse(saved));
    }
  }, []);

  // Когда клиент выбирает дату — обновляем доступные слоты
  useEffect(() => {
    if (!selectedDate) return;

    const isoDate = selectedDate.toISOString().split("T")[0];
    const masterSlots = allSlots[isoDate] || [];

    const bookings: Booking[] = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );
    const taken = bookings.filter((b) => b.date === isoDate).map((b) => b.time);

    const available = masterSlots.filter((slot) => !taken.includes(slot));
    setAvailableSlots(available);
    setSelectedTime(null);
  }, [selectedDate, allSlots]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;

    const isoDate = selectedDate.toISOString().split("T")[0];
    const newBooking: Booking = {
      name: "Имя клиента", // в будущем можно сделать ввод
      date: isoDate,
      time: selectedTime,
    };

    const bookings: Booking[] = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert(`Вы записались на ${selectedTime}`);
    setAvailableSlots((prev) => prev.filter((t) => t !== selectedTime));
    setSelectedTime(null);
    navigate("/client/booking");
  };

  return (
    <div className="p-6 text-sm">
      <h2 className="text-lg font-bold mb-4">Выберите дату</h2>

      <Calendar
        onChange={(value) => setSelectedDate(value as Date)}
        value={selectedDate}
        minDate={new Date()}
        locale="ru-RU"
        tileClassName={({ date }) => {
          const iso = date.toISOString().split("T")[0];
          const masterSlots = allSlots[iso];

          if (!masterSlots) return null; // если для даты нет расписания

          const bookings: Booking[] = JSON.parse(
            localStorage.getItem("bookings") || "[]"
          );
          const taken = bookings
            .filter((b) => b.date === iso)
            .map((b) => b.time);

          const available = masterSlots.filter((slot) => !taken.includes(slot));

          if (available.length > 0) {
            return "has-available"; // будут зелёные
          } else {
            return "fully-booked"; // будут серые
          }
        }}
        className="rounded-xl shadow"
      />

      {selectedDate && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">
            Свободные слоты на {selectedDate.toLocaleDateString("ru-RU")}:
          </h3>

          {availableSlots.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-4 py-2 rounded ${
                    selectedTime === slot
                      ? "bg-chocolate text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Нет свободных слотов</p>
          )}

          {selectedTime && (
            <button
              onClick={handleBooking}
              className="mt-4 bg-chocolate text-white px-4 py-2 rounded"
            >
              Записаться на {selectedTime}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
