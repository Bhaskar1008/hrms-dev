import React, { useState } from 'react';
import { Fingerprint, CheckCircle, Clock, XCircle } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';

interface BiometricAttendanceProps {
  isCheckedIn: boolean;
  lastCheckIn?: string;
  lastCheckOut?: string;
}

const BiometricAttendance: React.FC<BiometricAttendanceProps> = ({
  isCheckedIn,
  lastCheckIn,
  lastCheckOut
}) => {
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  
  const handleScan = () => {
    setScanning(true);
    
    // Simulate biometric scan
    setTimeout(() => {
      setScanning(false);
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }, 2000);
  };
  
  return (
    <Card title="Biometric Attendance" className="h-full">
      <div className="flex flex-col items-center justify-center py-6">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${scanning ? 'animate-pulse bg-blue-100' : 'bg-gray-100'}`}>
          <Fingerprint className={`h-16 w-16 ${scanning ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>
        
        {success === true && (
          <div className="flex items-center text-green-600 mb-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Successfully recorded!</span>
          </div>
        )}
        
        {success === false && (
          <div className="flex items-center text-red-600 mb-4">
            <XCircle className="h-5 w-5 mr-2" />
            <span>Failed to recognize fingerprint</span>
          </div>
        )}
        
        <Button
          variant={isCheckedIn ? 'danger' : 'primary'}
          size="lg"
          onClick={handleScan}
          isLoading={scanning}
          icon={<Clock className="h-5 w-5" />}
        >
          {isCheckedIn ? 'Check Out' : 'Check In'}
        </Button>
        
        <div className="mt-8 text-sm text-gray-500 space-y-2">
          {lastCheckIn && (
            <p className="flex items-center">
              <span className="font-medium mr-2">Last Check In:</span>
              {lastCheckIn}
            </p>
          )}
          {lastCheckOut && (
            <p className="flex items-center">
              <span className="font-medium mr-2">Last Check Out:</span>
              {lastCheckOut}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BiometricAttendance;