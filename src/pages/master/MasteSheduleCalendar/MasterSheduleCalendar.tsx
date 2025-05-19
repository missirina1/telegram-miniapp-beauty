import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";

interface Appointment {
  date: string; // в формате yyyy-MM-dd
  time: string; // HH:mm
  clientName: string;
}

interface DaySchedule {
  startTime: string;
  endTime: string;
  slotDuration: number;
}

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

export default function MasterScheduleCalendar() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [schedules, setSchedules] = useState<Record<string, DaySchedule>>({});
  const [currentSchedule, setCurrentSchedule] = useState<DaySchedule>({
    startTime: "09:00",
    endTime: "18:00",
    slotDuration: 60,
  });
  const navigate = useNavigate();

  const handleDateSelect = (dates?: Date[] | undefined) => {
    setSelectedDates(dates || []);
    if (dates && dates.length > 0) {
      const key = format(dates[0], "yyyy-MM-dd");
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
    if (!selectedDates) return;
    if (!validateSchedule()) return;

    const updated = { ...schedules };
    selectedDates.forEach((date) => {
      const key = format(date, "yyyy-MM-dd");
      updated[key] = currentSchedule;
    });
    setSchedules(updated);
    saveToLocalStorage(updated);
    alert("Расписание сохранено.");
    navigate("/master/schedule-settings");
  };

  const handleDuplicate = () => {
    const sourceDate = prompt("Введите дату-источник в формате ГГГГ-ММ-ДД:");
    if (!sourceDate || !schedules[sourceDate]) {
      alert("Неверная дата или нет сохранённого расписания.");
      return;
    }

    const updated = { ...schedules };
    selectedDates.forEach((date) => {
      const key = format(date, "yyyy-MM-dd");
      updated[key] = { ...schedules[sourceDate] };
    });
    setSchedules(updated);
    saveToLocalStorage(updated);
    alert(`Расписание с ${sourceDate} скопировано на выбранные даты`);
  };

  // Преобразуем все ключи с расписанием в Date[]
  const scheduledDates = Object.keys(schedules).map((d) => new Date(d));

  useEffect(() => {
    const saved = localStorage.getItem("calendarSchedule");
    if (saved) {
      try {
        setSchedules(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка при загрузке расписания");
      }
    }

    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments));
      } catch (e) {
        console.error("Ошибка при загрузке записей");
      }
    }
  }, []);

  const saveToLocalStorage = (data: Record<string, DaySchedule>) => {
    localStorage.setItem("calendarSchedule", JSON.stringify(data));
  };

  const saveAppointmentsToLocalStorage = (data: Appointment[]) => {
    localStorage.setItem("appointments", JSON.stringify(data));
  };
  return (
    <div className="max-w-xl mx-auto bg-[#fefaf6] p-4 rounded-2xl shadow text-[#4e342e] pb-16">
      <h2 className="text-xl font-semibold mb-4 mt-2">Календарь расписания</h2>
      <div className="overflow-x-auto">
        <div className="max-w-[320px] max-w-full flex justify-center">
          <DayPicker
            mode="multiple"
            selected={selectedDates}
            onSelect={handleDateSelect}
            modifiers={{ scheduled: scheduledDates }}
            modifiersClassNames={{
              selected: "bg-[#a1887f] text-white",
              today: "border border-[#a1887f]",
              scheduled: "bg-[#d7ccc8] text-black",
            }}
            locale={ru}
            className="mb-6 max-w-full overflow-x-auto border border-[#d7ccc8] rounded-lg shadow p-5"
          />
        </div>
      </div>
      {selectedDates && (
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

          {selectedDates.length === 1 && (
            <div className="mt-4 text-sm">
              <h3 className="font-semibold mb-2">
                Записи на {format(selectedDates[0], "dd MMMM", { locale: ru })}
              </h3>
              <ul className="space-y-1">
                {appointments
                  .filter(
                    (a) => a.date === format(selectedDates[0], "yyyy-MM-dd")
                  )
                  .map((a, i) => (
                    <li
                      key={i}
                      className="text-xs border p-2 rounded bg-[#f3e5f5]"
                    >
                      {a.time} — {a.clientName}
                    </li>
                  ))}
                {appointments.filter(
                  (a) => a.date === format(selectedDates[0], "yyyy-MM-dd")
                ).length === 0 && (
                  <li className="text-xs text-gray-500">
                    Нет записей на этот день
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="flex justify-around gap-4 mt-5 text-[11px]">
            <Button onClick={saveSchedule}>Сохранить день</Button>
            <Button onClick={handleDuplicate}>Дублировать день</Button>
          </div>
        </>
      )}
    </div>
  );
}
