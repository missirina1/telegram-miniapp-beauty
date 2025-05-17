import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
// Функция для получения ближайшей даты для дня недели
function getNextDateForWeekDay(weekDayIndex: number) {
  const today = new Date();
  const currentDay = (today.getDay() + 6) % 7; // Приводим к формату: Пн=0, ..., Вс=6
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

export default function MasterScheduleSettings() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [slotDuration, setSlotDuration] = useState<number>(30);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('scheduleSettings'); // Получаем настройки из localStorage
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedDays(parsed.selectedDays || []);
      setStartTime(parsed.startTime || '09:00');
      setEndTime(parsed.endTime || '18:00');
      setSlotDuration(parsed.slotDuration || 30);
    }
  }, []);

  const handleToggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  const handleSave = () => {
    const settings = {
      selectedDays,
      startTime,
      endTime,
      slotDuration,
    };
    localStorage.setItem('scheduleSettings', JSON.stringify(settings));
    alert('Настройки сохранены!');
    navigate('/master/schedule');
  };
  return (
    <div className="min-h-screen bg-[#f8f5f2] p-4 text-[#4e342e]">
      <h1 className="text-2xl font-bold mb-6">Настройки расписания</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Рабочие дни:</label>
        <div className="flex gap-2 flex-wrap">
          {weekDays.map((day, idx) => {
            const date = getNextDateForWeekDay(idx);
            return (
              <button
                key={day}
                onClick={() => handleToggleDay(day)}
                className={`px-3 py-1 rounded-full border transition ${
                  selectedDays.includes(day)
                    ? 'bg-[#a1887f] text-white'
                    : 'bg-white border-[#a1887f] text-[#4e342e]'
                }`}
              >
                {day} {formatDate(date)}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Время начала:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border rounded px-2 py-1 w-40"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Время окончания:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border rounded px-2 py-1 w-40"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">
          Длительность слота (мин):
        </label>
        <input
          type="number"
          value={slotDuration}
          onChange={(e) => setSlotDuration(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-[#6d4c41] text-white py-2 px-4 rounded-xl shadow hover:bg-[#5d4037]"
      >
        Сохранить
      </button>
    </div>
  );
}
