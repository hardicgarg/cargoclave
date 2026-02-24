import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);

  const mockCredentials = {
    operations: { email: 'operations@cargoclave.com', password: 'Ops@2025!' },
    dispatcher: { email: 'dispatcher@cargoclave.com', password: 'Dispatch@2025!' },
    fleet: { email: 'fleet@cargoclave.com', password: 'Fleet@2025!' },
    compliance: { email: 'compliance@cargoclave.com', password: 'Comply@2025!' },
    admin: { email: 'admin@cargoclave.com', password: 'Admin@2025!' }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    return password?.length >= 8;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, rememberMe: e?.target?.checked }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (lockoutTime && Date.now() < lockoutTime) {
      const remainingSeconds = Math.ceil((lockoutTime - Date.now()) / 1000);
      setErrors({ form: `Account locked. Please try again in ${remainingSeconds} seconds.` });
      return;
    }

    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData?.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    setTimeout(() => {
      const isValidCredential = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredential) {
        if (formData?.rememberMe) {
          localStorage.setItem('rememberedEmail', formData?.email);
        }
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userEmail', formData?.email);
        navigate('/operations-dashboard');
      } else {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);

        if (newFailedAttempts >= 3) {
          const lockTime = Date.now() + 30000;
          setLockoutTime(lockTime);
          setErrors({ 
            form: `Invalid credentials. Account locked for 30 seconds due to multiple failed attempts.\n\nValid credentials:\nOperations: operations@cargoclave.com / Ops@2025!\nDispatcher: dispatcher@cargoclave.com / Dispatch@2025!\nFleet: fleet@cargoclave.com / Fleet@2025!\nCompliance: compliance@cargoclave.com / Comply@2025!\nAdmin: admin@cargoclave.com / Admin@2025!` 
          });
        } else {
          setErrors({ 
            form: `Invalid email or password. ${3 - newFailedAttempts} attempts remaining.\n\nValid credentials:\nOperations: operations@cargoclave.com / Ops@2025!\nDispatcher: dispatcher@cargoclave.com / Dispatch@2025!\nFleet: fleet@cargoclave.com / Fleet@2025!\nCompliance: compliance@cargoclave.com / Comply@2025!\nAdmin: admin@cargoclave.com / Admin@2025!` 
          });
        }
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.form && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <Icon name="AlertCircle" size="1.25rem" className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 whitespace-pre-line">{errors?.form}</p>
        </div>
      )}
      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        disabled={loading}
      />
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors"
          tabIndex={-1}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size="1.25rem" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={handleCheckboxChange}
          disabled={loading}
        />
        <a
          href="#"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          onClick={(e) => e?.preventDefault()}
        >
          Forgot password?
        </a>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        disabled={loading || (lockoutTime && Date.now() < lockoutTime)}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;