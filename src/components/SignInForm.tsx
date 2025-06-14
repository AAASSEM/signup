import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface TouchedFields {
  email: boolean;
  password: boolean;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData, touched]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for sign-in
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Sign-in submitted:', formData);
      // Handle successful sign-in here (e.g., redirect)
    } catch (error) {
      console.error('Sign-in error:', error);
      // Handle sign-in errors here (e.g., show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-96 max-w-full">
      <header className="text-[rgba(53,80,78,1)] text-2xl font-bold text-center mb-8">
        Sign In
      </header>

      <form onSubmit={handleSubmit} className="flex w-full flex-col items-stretch text-sm space-y-4">
        <div className="flex w-full flex-col items-stretch">
          <label htmlFor="email" className="text-slate-900 font-medium leading-none mb-1.5">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@company.com"
            value={formData.email}
            onChange={handleInputChange('email')}
            onBlur={handleBlur('email')}
            className={errors.email ? 'border-red-500' : ''}
            aria-invalid={!!errors.email && (touched.email || isSubmitting)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (touched.email || isSubmitting) && (
            <span id="email-error" className="text-red-500 text-xs mt-1">
              {errors.email}
            </span>
          )}
        </div>

        <div className="flex w-full flex-col items-stretch">
          <label htmlFor="password" className="text-slate-900 font-medium leading-none mb-1.5">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Type here..."
            value={formData.password}
            onChange={handleInputChange('password')}
            onBlur={handleBlur('password')}
            className={errors.password ? 'border-red-500' : ''}
            aria-invalid={!!errors.password && (touched.password || isSubmitting)}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (touched.password || isSubmitting) && (
            <span id="password-error" className="text-red-500 text-xs mt-1">
              {errors.password}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="self-stretch bg-amber-700 w-full gap-2.5 text-white font-medium leading-6 mt-6 px-4 py-2 rounded-md hover:bg-amber-800 disabled:opacity-50"
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;