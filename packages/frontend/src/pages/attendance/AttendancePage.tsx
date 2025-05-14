import React, { useState, useEffect } from 'react';
import { DynamicTable } from '../../components/common/DynamicTable';
import { Button } from '../../components/ui/Button';
import { Calendar } from 'lucide-react';
import { useApi } from '../../contexts/ApiContext';
import { useAuth } from '../../contexts/AuthContext';
import { useUi } from '../../contexts/UiContext';

const AttendancePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const api = useApi();
  const { user } = useAuth();
  const { showToast } = useUi();

  const fetchAttendanceData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/attendance', {
        employeeId: user?.id,
        organizationId: user?.organizationId
      });
      setAttendanceData(response.data);
    } catch (error) {
      showToast('Failed to fetch attendance data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const markAttendance = async () => {
    try {
      await api.post('/api/attendance/mark', {
        employeeId: user?.id,
        organizationId: user?.organizationId,
        timestamp: new Date().toISOString()
      });
      showToast('Attendance marked successfully', 'success');
      fetchAttendanceData(); // Refresh the data
    } catch (error) {
      showToast('Failed to mark attendance', 'error');
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Attendance Management</h1>
        <Button 
          variant="primary" 
          className="flex items-center gap-2"
          onClick={markAttendance}
        >
          <Calendar className="w-4 h-4" />
          Mark Attendance
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DynamicTable 
          tableId="attendance_list"
          onRowClick={() => {}}
          initialFilters={{
            employeeId: user?.id,
            organizationId: user?.organizationId
          }}
        />
      </div>
    </div>
  );
};

export default AttendancePage;