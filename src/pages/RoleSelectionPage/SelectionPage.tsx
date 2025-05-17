import { useNavigate } from "react-router-dom";
import { Scissors, Smile } from "lucide-react";

export default function SelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f5f2] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-[#4e342e] mb-6">Кто вы?</h1>

        {/* Мастер */}
        <button
          className="w-full bg-[#a1887f] text-white font-medium py-3 rounded-xl mb-2 hover:bg-[#8d6e63] transition flex items-center justify-center gap-3"
          onClick={() => navigate("/master/home")}
        >
          Я мастер
        </button>
        <p className="text-sm text-[#5d4037] mb-6">
          Управляйте своим расписанием и услугами
        </p>

        {/* Клиент */}
        <button
          className="w-full bg-[#bcaaa4] text-white font-medium py-3 mb-2 rounded-xl hover:bg-[#a1887f] transition flex items-center justify-center gap-3"
          onClick={() => navigate("/client/home")}
        >
          <Smile className="w-5 h-5" />Я клиент
        </button>
        <p className="text-sm text-[#5d4037] mt-2">Запишитесь на услугу</p>
      </div>
    </div>
  );
}
