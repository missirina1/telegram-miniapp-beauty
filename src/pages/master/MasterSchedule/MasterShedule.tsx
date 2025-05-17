import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// Функция для получения ближайшей даты для дня недели
function getNextDateForWeekDay(weekDayIndex: number) {
  const today = new Date();
  const currentDay = (today.getDay() + 6) % 7; // Пн=0, ..., Вс=6
  let diff = weekDayIndex - currentDay;
  if (diff < 0) diff += 7;
  const result = new Date(today);
  result.setDate(today.getDate() + diff);
  return result;
}

// Форматирование даты в "дд.мм"
function formatDate(date: Date) {
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
}

interface ScheduleSettings {
  selectedDays: string[];
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export default function MasterSchedule() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<ScheduleSettings | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('scheduleSettings');
    if (stored) {
      const parsed: ScheduleSettings = JSON.parse(stored);
      setSettings(parsed);
      const generatedSlots = generateSlots(
        parsed.startTime,
        parsed.endTime,
        parsed.slotDuration
      );
      setSlots(generatedSlots);
    }
  }, []);

  const generateSlots = (
    start: string,
    end: string,
    duration: number
  ): string[] => {
    const slots: string[] = [];
    let [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    while (
      startHour < endHour ||
      (startHour === endHour && startMin < endMin)
    ) {
      const formatted = `${String(startHour).padStart(2, '0')}:${String(
        startMin
      ).padStart(2, '0')}`;
      slots.push(formatted);

      startMin += duration;
      if (startMin >= 60) {
        startHour += Math.floor(startMin / 60);
        startMin = startMin % 60;
      }
    }

    return slots;
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] p-4 text-[#4e342e]">
        <p>Нет настроек расписания. Перейдите в настройки.</p>
        <button
          onClick={() => navigate('/master/schedule-settings')}
          className="mt-4 px-4 py-2 bg-[#a1887f] text-white rounded-xl hover:bg-[#8d6e63]"
        >
          Перейти в настройки
        </button>
      </div>
    );
  }

  // Получаем только два дня для показа
  const daysToShow = settings.selectedDays.slice(sliderIndex, sliderIndex + 2);

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-4 text-[#4e342e]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Моё расписание</h1>
        <button
          onClick={() => navigate('/master/schedule-settings')}
          className="text-[#4e342e] hover:text-[#6d4c41]"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setSliderIndex((i) => Math.max(i - 2, 0))}
          disabled={sliderIndex === 0}
          className="p-2 rounded-full bg-white border border-[#d7ccc8] disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {daysToShow.map((day) => {
            const idx = weekDays.indexOf(day);
            const date = getNextDateForWeekDay(idx);
            return (
              <div
                key={day}
                className="bg-white rounded-xl shadow p-4 border border-[#d7ccc8]"
              >
                <h2 className="font-semibold mb-2 text-[#6d4c41]">
                  {day} {formatDate(date)}
                </h2>
                <ul className="space-y-1 text-sm">
                  {slots.map((slot) => (
                    <li key={slot}>{slot}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <button
          onClick={() =>
            setSliderIndex((i) =>
              i + 2 < settings.selectedDays.length ? i + 2 : i
            )
          }
          disabled={sliderIndex + 2 >= settings.selectedDays.length}
          className="p-2 rounded-full bg-white border border-[#d7ccc8] disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
