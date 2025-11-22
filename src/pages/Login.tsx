import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);
      if (response.success) {
        // Use AuthContext to login
        login(response.user, response.token);
        navigate('/');
      } else {
        setError(response.message || '登录失败');
      }
    } catch (err) {
      setError('登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('login_title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            访问爱米的前端小笔记
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <TextInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="邮箱地址"
              value={formData.email}
              onChange={handleChange}
            />
            <TextInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="密码"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <Button type="submit" loading={loading} className="w-full">
              {loading ? t('login_loading') : t('login_submit')}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              测试账户: aimi@example.com / password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
