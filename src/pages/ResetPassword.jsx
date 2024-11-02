import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://password-reset-backend-lcaz.onrender.com/api/auth/reset-password/${token}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || 'An error occurred');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Reset Password</button>
      </form>
      {message && (
        <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'} mt-3`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
