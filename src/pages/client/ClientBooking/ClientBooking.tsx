import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Booking = {
  name: string;
  date: string;
  time: string;
};

export default function ClientBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      const parsed: Booking[] = JSON.parse(stored);
      setBookings(parsed);
    }
  }, []);

  return (
    <div className="p-4 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Ваши записи</h2>
        <button
          onClick={() => navigate("/client/calendar")}
          className="bg-chocolate text-white px-4 py-2 rounded"
        >
          Записаться
        </button>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-500">У вас пока нет записей.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map((booking, index) => (
            <li
              key={index}
              className="p-3 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <div className="font-medium">
                  {new Date(booking.date).toLocaleDateString("ru-RU")} в{" "}
                  {booking.time}
                </div>
                <div className="text-gray-500 text-xs">Имя: {booking.name}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
