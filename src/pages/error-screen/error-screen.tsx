import { Link } from 'react-router-dom';

function ErrorScreen(): JSX.Element {
  return (
    <div>
      <h2>404 Not Found</h2>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

export default ErrorScreen;
