import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* RoleRedirect.jsx — компонент, который определяет роль из query-параметра
 (?role=master или ?role=client) и редиректит:
*/

export default function RoleRedirect() {
  const navigate = useNavigate(); // получаем функцию для навигации
  const { search } = useLocation(); // получаем query-параметры из URL

  useEffect(() => {
    const role = new URLSearchParams(search).get('role');
    if (role === 'master') navigate('/master/home');
    else navigate('/client/home');
  }, [search, navigate]); // зависимость от search и navigate

  return <p>Загрузка...</p>;
}
