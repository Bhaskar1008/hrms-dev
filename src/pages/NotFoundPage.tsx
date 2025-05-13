import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
      <p className="mt-2 text-base text-gray-600 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8">
        <Button
          onClick={() => navigate('/')}
          leftIcon={<Home className="h-5 w-5" />}
          size="lg"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;