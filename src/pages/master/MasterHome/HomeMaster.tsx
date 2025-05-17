import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

export default function HomeMaster() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    WebApp.expand(); // Разворачиваем веб-приложение на весь экран
    WebApp.MainButton.setText("Добавить услугу"); // Устанавливаем текст кнопки
    WebApp.MainButton.show(); // Показываем кнопку
    WebApp.MainButton.onClick(() => {
      alert("Переход к добавлению услуги (реализуй позже)");
    });

    const storedProfile = localStorage.getItem("masterProfile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      if (profile.name) {
        setName(profile.name);
      }
    }

    return () => WebApp.MainButton.hide(); // Скрываем кнопку при размонтировании компонента
  }, []);

  return (
    <div className="p-4 min-h-screen bg-[#f8f5f2] text-[#4e342e]">
      <h1 className="text-2xl font-semibold mb-6">
        {" "}
        {name ? `Привет, ${name}! 👋` : "Привет, мастер 👋"}
      </h1>

      <section className="mb-6 bg-[#d7ccc8] rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Краткая статистика</h2>
        <p className="text-sm text-[#6d4c41]">
          Здесь будут данные о ваших услугах и записях.
        </p>
      </section>

      <section className="mb-6 bg-[#d7ccc8] rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Ближайшие записи</h2>
        <p className="text-sm text-[#6d4c41]">
          Список предстоящих клиентов и времени записи.
        </p>
      </section>

      <section className="mb-6 bg-[#d7ccc8] rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Уведомления</h2>
        <p className="text-sm text-[#6d4c41]">
          Информация о новых сообщениях и изменениях.
        </p>
      </section>
    </div>
  );
}
