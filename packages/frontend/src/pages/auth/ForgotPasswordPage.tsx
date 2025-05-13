import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { MailIcon, ArrowLeft } from 'lucide-react';
import { useApi } from '../../contexts/ApiContext';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await api.post('/auth/forgot-password', { email: data.email });
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-primary">HR<span className="text-secondary">MS</span></h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSubmitted
              ? "We've sent you an email with instructions to reset your password."
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>
        
        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
              >
                Send reset link
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-6">
            <p className="text-center text-green-600 text-sm font-medium">
              Check your email for a link to reset your password.
            </p>
            <p className="text-center text-gray-500 text-sm mt-1">
              If you don't receive an email, please check your spam folder or try again.
            </p>
            <div className="mt-6">
              <Button
                variant="outline"
                fullWidth
                size="lg"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                onClick={() => setIsSubmitted(false)}
              >
                Try again
              </Button>
            </div>
          </div>
        )}
        
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;