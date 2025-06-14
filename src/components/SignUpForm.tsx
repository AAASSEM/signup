import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  acceptTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  companyName?: string;
  acceptTerms?: string;
}

interface TouchedFields {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  companyName: boolean;
  acceptTerms: boolean;
}

const SignUpForm: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    acceptTerms: false,
  });

  // State for validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  // State to track if the form is currently being submitted (e.g., API call in progress)
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to track which fields the user has interacted with (for displaying errors after blur)
  const [touched, setTouched] = useState<TouchedFields>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    companyName: false,
    acceptTerms: false,
  });
  // State to track overall form validity (used for disabling submit button)
  const [isFormValid, setIsFormValid] = useState(false);

  // Memoized validation function to avoid re-creating on every render
  // It takes the current formData and returns an errors object
  const validateForm = useCallback((currentFormData: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!currentFormData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!currentFormData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!currentFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(currentFormData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!currentFormData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (currentFormData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!currentFormData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!currentFormData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    return newErrors;
  }, []); // Empty dependency array means this function is created once

  // useEffect to re-validate the form whenever formData changes
  useEffect(() => {
    const currentErrors = validateForm(formData);
    setErrors(currentErrors);
    setIsFormValid(Object.keys(currentErrors).length === 0);
  }, [formData, validateForm]); // Depend on formData and the memoized validateForm

  // Handler for input changes (text fields and checkbox)
  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement> | boolean // Accept boolean for checkbox directly
  ) => {
    // Determine the value based on input type or direct boolean from checkbox
    const value = typeof e === 'boolean' ? e : (e as React.ChangeEvent<HTMLInputElement>).target.type === 'checkbox' ? (e as React.ChangeEvent<HTMLInputElement>).target.checked : (e as React.ChangeEvent<HTMLInputElement>).target.value;

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Mark the field as touched immediately when input changes
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Handler for input blur (when a field loses focus)
  const handleBlur = (field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched to display all errors immediately on submit attempt
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      companyName: true,
      acceptTerms: true,
    });

    // Run validation to get the most current errors before submitting
    const currentErrors = validateForm(formData);
    setErrors(currentErrors); // Update errors state with current validation result

    // If there are any errors, prevent submission
    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    setIsSubmitting(true); // Start submission process

    try {
      // Simulate API call (replace with actual API call later)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      console.log('Form submitted successfully:', formData);
      // You can add logic here for success (e.g., redirect, show success message)
      // alert('Account created successfully!'); // Replaced by a more subtle UI message if possible
    } catch (error) {
      console.error('Submission error:', error);
      // Handle submission error (e.g., display error message to user)
      // alert('Failed to create account. Please try again.'); // Replaced by a more subtle UI message
    } finally {
      setIsSubmitting(false); // End submission process
    }
  };

  // Helper function to determine if an error should be displayed for a field
  const showFieldError = (field: keyof FormData) =>
    errors[field] && (touched[field] || isSubmitting);

  return (
    <div className="w-96 max-w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
      <header className="text-[rgba(53,80,78,1)] text-2xl font-bold text-center mb-8">
        Sign Up
      </header>

      <form onSubmit={handleSubmit} className="flex w-full flex-col items-stretch text-sm space-y-4">
        {/* First Name & Last Name row */}
        <div className="flex w-full gap-4 max-sm:flex-col"> {/* Responsive layout: side-by-side on large, stacked on small */}
          <div className="flex flex-col items-stretch flex-1">
            <label htmlFor="firstName" className="text-slate-900 font-medium leading-none mb-1.5">
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName')(e)} // Pass event object
              onBlur={handleBlur('firstName')}
              className={showFieldError('firstName') ? 'border-red-500' : ''}
              aria-invalid={!!showFieldError('firstName')}
              aria-describedby={showFieldError('firstName') ? 'firstName-error' : undefined}
            />
            {showFieldError('firstName') && (
              <span id="firstName-error" className="text-red-500 text-xs mt-1">
                {errors.firstName}
              </span>
            )}
          </div>

          <div className="flex flex-col items-stretch flex-1">
            <label htmlFor="lastName" className="text-slate-900 font-medium leading-none mb-1.5">
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName')(e)} // Pass event object
              onBlur={handleBlur('lastName')}
              className={showFieldError('lastName') ? 'border-red-500' : ''}
              aria-invalid={!!showFieldError('lastName')}
              aria-describedby={showFieldError('lastName') ? 'lastName-error' : undefined}
            />
            {showFieldError('lastName') && (
              <span id="lastName-error" className="text-red-500 text-xs mt-1">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex w-full flex-col items-stretch">
          <label htmlFor="email" className="text-slate-900 font-medium leading-none mb-1.5">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@company.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email')(e)} // Pass event object
            onBlur={handleBlur('email')}
            className={showFieldError('email') ? 'border-red-500' : ''}
            aria-invalid={!!showFieldError('email')}
            aria-describedby={showFieldError('email') ? 'email-error' : undefined}
          />
          {showFieldError('email') && (
            <span id="email-error" className="text-red-500 text-xs mt-1">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex w-full flex-col items-stretch">
          <label htmlFor="password" className="text-slate-900 font-medium leading-none mb-1.5">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Type here..."
            value={formData.password}
            onChange={(e) => handleInputChange('password')(e)} // Pass event object
            onBlur={handleBlur('password')}
            className={showFieldError('password') ? 'border-red-500' : ''}
            aria-invalid={!!showFieldError('password')}
            aria-describedby={showFieldError('password') ? 'password-error' : undefined}
          />
          {showFieldError('password') && (
            <span id="password-error" className="text-red-500 text-xs mt-1">
              {errors.password}
            </span>
          )}
        </div>

        {/* Company Name */}
        <div className="flex w-full flex-col items-stretch">
          <label htmlFor="companyName" className="text-slate-900 font-medium leading-none mb-1.5">
            Company Name
          </label>
          <Input
            id="companyName"
            type="text"
            placeholder="Type here..."
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName')(e)} // Pass event object
            onBlur={handleBlur('companyName')}
            className={showFieldError('companyName') ? 'border-red-500' : ''}
            aria-invalid={!!showFieldError('companyName')}
            aria-describedby={showFieldError('companyName') ? 'companyName-error' : undefined}
          />
          {showFieldError('companyName') && (
            <span id="companyName-error" className="text-red-500 text-xs mt-1">
              {errors.companyName}
            </span>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex gap-2 text-black font-medium leading-none mt-6 items-start">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            // For shadcn/ui checkbox, onCheckedChange typically passes a boolean directly
            onCheckedChange={(checked: boolean) => handleInputChange('acceptTerms')(checked)}
            onBlur={handleBlur('acceptTerms')} // Add onBlur for checkbox
            className={showFieldError('acceptTerms') ? 'border-red-500' : ''}
            aria-invalid={!!showFieldError('acceptTerms')}
            aria-describedby={showFieldError('acceptTerms') ? 'terms-error' : undefined}
          />
          <label htmlFor="acceptTerms" className="cursor-pointer">
            I agree to the{" "}
            <a href="/terms" className="text-[rgba(146,71,14,1)] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[rgba(146,71,14,1)] hover:underline">
              Privacy Policy
            </a>
            .
          </label>
        </div>
        {showFieldError('acceptTerms') && (
          <span id="terms-error" className="text-red-500 text-xs">
            {errors.acceptTerms}
          </span>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="self-stretch bg-amber-700 w-full gap-2.5 text-white font-medium leading-6 mt-6 px-4 py-2 rounded-md hover:bg-amber-800 disabled:opacity-50"
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>

        {/* Link to Sign In page */}
        <div className="text-center mt-4">
          <span className="text-slate-900 text-sm">Already have an account? </span>
          <a href="/signin" className="text-amber-700 hover:underline text-sm font-medium">Sign In</a>
        </div>
      </form>
    </div>
  );
};

// Export the component AFTER its definition
export default SignUpForm;
