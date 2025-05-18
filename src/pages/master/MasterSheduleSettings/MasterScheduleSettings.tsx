import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CalendarDay = {
  date: string; // "2025-05-20"
  start: string; // "09:00"
  end: string; // "18:00"
};

interface Schedule {
  startTime: string;
  endTime: string;
}

export default function MasterScheduleSettings() {
  const [calendarSchedule, setCalendarSchedule] = useState<CalendarDay[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("calendarSchedule");
    if (saved) {
      try {
        const parsed: Schedule[] = JSON.parse(saved); // parsed: Record<string, DaySchedule>
        const scheduleArray: CalendarDay[] = Object.entries(parsed).map(
          ([date, { startTime, endTime }]) => ({
            date,
            start: startTime,
            end: endTime,
          })
        );
        setCalendarSchedule(scheduleArray);
      } catch (e) {
        console.error("Ошибка при чтении календаря из localStorage:", e);
      }
    }
  }, []);

  const goToCalendar = () => {
    navigate("/master/scheduleCalendar");
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-4 text-[#4e342e]">
      <h1 className="text-2xl font-bold mb-6">Ваше расписание</h1>

      {calendarSchedule.length === 0 ? (
        <p className="mb-6">
          Расписание не настроено. Перейдите в календарь для настройки рабочих
          дней.
        </p>
      ) : (
        <ul className="mb-6 space-y-2">
          {calendarSchedule.map((entry) => (
            <li
              key={entry.date}
              className="border border-[#d7ccc8] p-3 rounded-lg bg-white"
            >
              <strong>
                {new Date(entry.date).toLocaleDateString("ru-RU", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                })}
              </strong>
              : {entry.start} – {entry.end}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={goToCalendar}
        className="bg-[#a1887f] text-white py-2 px-4 rounded-xl shadow hover:bg-[#8d6e63]"
      >
        Настроить рабочие дни
      </button>
    </div>
  );
}
