import React from 'react';
import DynamicTable from '../../components/common/DynamicTable';
import { Button } from '../../components/ui/Button';
import { Calendar } from 'lucide-react';

const AttendancePage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Attendance Management</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Mark Attendance
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DynamicTable 
          columns={[
            { header: 'Employee', accessor: 'employee' },
            { header: 'Date', accessor: 'date' },
            { header: 'Check In', accessor: 'checkIn' },
            { header: 'Check Out', accessor: 'checkOut' },
            { header: 'Status', accessor: 'status' }
          ]}
          data={[]}
          isLoading={false}
          onSort={() => {}}
        />
      </div>
    </div>
  );
};

export default AttendancePage;