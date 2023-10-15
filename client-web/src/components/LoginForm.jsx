import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'user' && password === 'pass') {
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } else {
      alert('Wrong username or password');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-[#f4ca40] to-white p-8 rounded shadow-lg w-1/2 h-96">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Power-Up Build</h1>
        <form className="mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="block m-2 p-2 rounded-lg"
            placeholder="username is user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="block m-2 p-2 rounded-lg"
            placeholder="password is pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="block bg-[#f4ca40] text-black py-2 px-4 rounded-lg mx-auto shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
