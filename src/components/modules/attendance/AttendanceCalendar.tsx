import React from 'react';
import Card from '../../common/Card';
import { Attendance } from '../../../types';

interface AttendanceCalendarProps {
  month: string;
  year: number;
  attendanceData: Attendance[];
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  month,
  year,
  attendanceData
}) => {
  // Get days in month
  const daysInMonth = new Date(year, parseInt(month), 0).getDate();
  
  // Get first day of month
  const firstDay = new Date(year, parseInt(month) - 1, 1).getDay();
  
  // Generate calendar days
  const calendarDays: Array<number | null> = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }
  
  // Group attendance data by date
  const attendanceByDate: Record<string, Attendance> = {};
  attendanceData.forEach(attendance => {
    const date = attendance.date.split('-')[2]; // Extract day from date
    attendanceByDate[date] = attendance;
  });
  
  // Status color mapping
  const statusColors: Record<string, string> = {
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    'half-day': 'bg-orange-100 text-orange-800',
    weekend: 'bg-blue-50 text-blue-400',
    holiday: 'bg-purple-100 text-purple-800'
  };
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <Card title={`Attendance Calendar - ${month}/${year}`} className="h-full">
      <div className="grid grid-cols-7 gap-2">
        {weekdays.map((day, index) => (
          <div key={index} className="text-center font-medium text-sm text-gray-500">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="p-2"></div>;
          }
          
          const dayStr = day.toString().padStart(2, '0');
          const attendance = attendanceByDate[dayStr];
          const isWeekend = (index % 7 === 0) || (index % 7 === 6); // Sunday or Saturday
          
          let statusClass = isWeekend ? statusColors.weekend : 'bg-gray-100 text-gray-500';
          if (attendance) {
            statusClass = statusColors[attendance.status];
          }
          
          return (
            <div
              key={`day-${day}`}
              className={`p-2 rounded-md text-center relative ${statusClass} transition-all hover:shadow-md cursor-pointer`}
            >
              <div className="text-sm font-medium">{day}</div>
              {attendance?.checkIn && (
                <div className="text-xs mt-1">{attendance.checkIn}</div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AttendanceCalendar;