import React, { useState } from 'react';
import { FormField } from '@/components/ui/form-field';
import { CustomCheckbox } from '@/components/ui/custom-checkbox';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: 'johndoe@company.com',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleRememberMeChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Handle forgot password logic here
  };

  return (
    <section className="bg-[rgba(250,249,246,1)] shadow-[0px_0px_24px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden justify-center px-20 py-[298px] max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <div className="w-96 max-w-full">
        <h1 className="text-[rgba(53,80,78,1)] text-2xl font-bold text-center">
          Sign In
        </h1>
        
        <form onSubmit={handleSubmit} className="w-full text-sm mt-8">
          <fieldset className="w-full border-0 p-0 m-0">
            <legend className="sr-only">Login credentials</legend>
            
            <div className="w-full">
              <FormField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
              
              <FormField
                label="Password"
                type="password"
                placeholder="Type here..."
                value={formData.password}
                onChange={handleInputChange('password')}
                className="mt-4"
                required
              />
            </div>
            
            <div className="flex w-full items-center gap-[40px_100px] text-black justify-between mt-6">
              <CustomCheckbox
                checked={formData.rememberMe}
                onChange={handleRememberMeChange}
                label="Remember me"
              />
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-normal text-center underline hover:opacity-80 transition-opacity"
              >
                Forgot Password?
              </button>
            </div>
            
            <button
              type="submit"
              className="self-stretch bg-amber-700 w-full gap-2.5 text-white font-medium leading-6 mt-6 px-4 py-2 rounded-md hover:bg-amber-800 disabled:opacity-50"
              >
              Sign In
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
