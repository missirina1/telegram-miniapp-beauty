import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type DaySchedule = {
  startTime: string;
  endTime: string;
  slotDuration: number;
};

type CalendarSchedule = Record<string, DaySchedule>;

function generateTimeSlots(
  start: string,
  end: string,
  duration: number
): string[] {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startTime = new Date();
  startTime.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMinute, 0, 0);

  const slots: string[] = [];
  const current = new Date(startTime);

  while (current < endTime) {
    slots.push(current.toTimeString().slice(0, 5)); // формат "HH:mm"
    current.setMinutes(current.getMinutes() + duration);
  }

  return slots;
}

export default function MasterScheduleSettings() {
  const [calendarSchedule, setCalendarSchedule] = useState<CalendarSchedule>(
    {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("calendarSchedule");
    if (saved) {
      try {
        const parsed: CalendarSchedule = JSON.parse(saved);
        setCalendarSchedule(parsed);
      } catch (e) {
        console.error("Ошибка при чтении календаря из localStorage:", e);
      }
    }
  }, []);

  const goToCalendar = () => {
    navigate("/master/scheduleCalendar");
  };

  const sortedDates = Object.keys(calendarSchedule).sort();

  return (
    <div className="min-h-screen bg-[#f8f5f2] pb-16 text-[#4e342e]">
      <h1 className="text-2xl font-bold mb-6">Ваше расписание</h1>
      <button
        onClick={goToCalendar}
        className="bg-[#a1887f] text-[12px] text-white py-2 px-4 mb-4 rounded-xl shadow hover:bg-[#8d6e63]"
      >
        Настроить рабочие дни
      </button>
      {sortedDates.length === 0 ? (
        <p className="mb-6">
          Расписание не настроено. Перейдите в календарь для настройки рабочих
          дней.
        </p>
      ) : (
        <ul className="mb-6 space-y-4">
          {sortedDates.map((date) => {
            const schedule = calendarSchedule[date];
            const slots = generateTimeSlots(
              schedule.startTime,
              schedule.endTime,
              schedule.slotDuration
            );

            return (
              <li
                key={date}
                className="border border-[#d7ccc8] p-4 rounded-lg bg-white"
              >
                <div className="font-semibold mb-2">
                  {new Date(date).toLocaleDateString("ru-RU", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-[#5d4037]">
                  {slots.map((slot, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#efebe9] rounded border border-[#d7ccc8]"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
