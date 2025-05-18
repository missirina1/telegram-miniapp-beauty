import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";

function Input(props: any) {
  return <input className="w-full border p-2 rounded" {...props} />;
}

function Button({ children, className = "", ...props }: any) {
  return (
    <button
      className={`px-4 py-2 rounded bg-[#a1887f] text-white hover:bg-[#8d6e63] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Label({ children }: any) {
  return <label className="block mb-1 font-medium">{children}</label>;
}

interface DaySchedule {
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export default function MasterScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [schedules, setSchedules] = useState<Record<string, DaySchedule>>({});
  const [currentSchedule, setCurrentSchedule] = useState<DaySchedule>({
    startTime: "09:00",
    endTime: "18:00",
    slotDuration: 60,
  });
  const navigate = useNavigate();
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  const handleDateSelect = (date?: Date) => {
    setSelectedDate(date);
    if (date) {
      const key = format(date, "yyyy-MM-dd");
      const existing = schedules[key];
      setCurrentSchedule(
        existing || {
          startTime: "09:00",
          endTime: "18:00",
          slotDuration: 60,
        }
      );
    }
  };

  const validateSchedule = () => {
    const { startTime, endTime, slotDuration } = currentSchedule;
    if (startTime >= endTime) {
      alert("Время начала должно быть раньше окончания.");
      return false;
    }
    if (slotDuration <= 0 || slotDuration > 240) {
      alert("Невалидная длительность слота.");
      return false;
    }
    return true;
  };

  const saveSchedule = () => {
    if (!selectedDate) return;
    if (!validateSchedule()) return;

    const updated = {
      ...schedules,
      [formattedDate]: currentSchedule,
    };
    setSchedules(updated);
    saveToLocalStorage(updated);
    alert("Расписание сохранено.");
    navigate("/master/schedule-settings");
  };

  const handleDuplicate = () => {
    const targetDate = prompt(
      "Введите дату для копирования в формате ГГГГ-ММ-ДД:"
    );
    if (!targetDate) return;

    if (schedules[formattedDate]) {
      const updated = {
        ...schedules,
        [targetDate]: { ...schedules[formattedDate] },
      };
      setSchedules(updated);
      saveToLocalStorage(updated);
      alert(`Скопировано в ${targetDate}`);
    } else {
      alert("Сначала сохраните текущее расписание.");
    }
  };

  // Преобразуем все ключи с расписанием в Date[]
  const scheduledDates = Object.keys(schedules).map((d) => new Date(d));

  useEffect(() => {
    const saved = localStorage.getItem("masterSchedules");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSchedules(parsed);
      } catch (e) {
        console.error("Ошибка при загрузке расписания из localStorage:", e);
      }
    }
  }, []);
  const saveToLocalStorage = (data: Record<string, DaySchedule>) => {
    localStorage.setItem("calendarSchedule", JSON.stringify(data));
  };
  return (
    <div className="max-w-xl mx-auto bg-[#fefaf6] p-6 rounded-2xl shadow text-[#4e342e]">
      <h2 className="text-xl font-semibold mb-4">Календарь расписания</h2>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        modifiers={{ scheduled: scheduledDates }}
        modifiersClassNames={{
          selected: "bg-[#a1887f] text-white",
          today: "border border-[#a1887f]",
          scheduled: "bg-[#d7ccc8] text-black",
        }}
        locale={ru}
        className="mb-6"
      />

      {selectedDate && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Начало:</Label>
              <Input
                type="time"
                value={currentSchedule.startTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentSchedule((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Конец:</Label>
              <Input
                type="time"
                value={currentSchedule.endTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentSchedule((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-span-2">
              <Label>Длительность слота (мин):</Label>
              <Input
                type="number"
                min={5}
                value={currentSchedule.slotDuration}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentSchedule((prev) => ({
                    ...prev,
                    slotDuration: parseInt(e.target.value, 10),
                  }))
                }
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button onClick={saveSchedule}>Сохранить день</Button>
            <Button onClick={handleDuplicate}>Дублировать день</Button>
          </div>
        </>
      )}
    </div>
  );
}
