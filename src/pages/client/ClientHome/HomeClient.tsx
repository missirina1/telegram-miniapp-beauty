import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export default function HomeClient() {
  useEffect(() => {
    WebApp.expand(); // Разворачиваем веб-приложение на весь экран
    WebApp.MainButton.hide(); // Скрываем кнопку пока
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Выбери мастера ✨</h1>
      <p className="text-sm text-gray-600">
        На этой странице можно будет просмотреть доступных мастеров, услуги и
        перейти к записи.
      </p>
    </div>
  );
}
