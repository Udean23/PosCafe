import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

const Shift = () => {
  const shifts = [
    { id: 1, name: 'Shift Pagi', avatar: 'SP', color: 'bg-orange-500' },
    { id: 2, name: 'Shift Siang', avatar: 'SS', color: 'bg-blue-500' },
  ];

  const days = [
    { date: 12, day: 'Senin', month: 'Aug' },
    { date: 13, day: 'Selasa', month: 'Aug' },
    { date: 14, day: 'Rabu', month: 'Aug' },
    { date: 15, day: 'Kamis', month: 'Aug' },
    { date: 16, day: 'Jumat', month: 'Aug' },
    { date: 17, day: 'Sabtu', month: 'Aug' },
    { date: 18, day: 'Minggu', month: 'Aug' },
  ];

  const initialScheduleData = {
    1: {
      12: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'adrian-1', name: 'Adrian G.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=adrian' },
          { id: 'jennifer-1', name: 'Jennifer M.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=jennifer' },
          { id: 'rachel-1', name: 'Rachel L.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=rachel' },
          { id: 'mark-1', name: 'Mark S.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=mark' },
          { id: 'carmen-1', name: 'Carmen R.', role: 'Kasir', image: 'https://i.pravatar.cc/40?u=carmen' },
        ],
      },
      13: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'dwayne-1', name: 'Dwayne S.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=dwayne' },
          { id: 'sharon-1', name: 'Sharon N.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=sharon' },
          { id: 'roger-1', name: 'Roger P.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=roger' },
          { id: 'adrian-2', name: 'Adrian G.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=adrian2' },
        ],
      },
      14: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'jennifer-2', name: 'Jennifer M.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=jennifer2' },
          { id: 'rachel-2', name: 'Rachel L.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=rachel2' },
          { id: 'mark-2', name: 'Mark S.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=mark2' },
          { id: 'carmen-2', name: 'Carmen R.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=carmen2' },
          { id: 'sharon-2', name: 'Sharon N.', role: 'Kasir', image: 'https://i.pravatar.cc/40?u=sharon2' },
        ],
      },
      15: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'roger-2', name: 'Roger P.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=roger2' },
          { id: 'dwayne-2', name: 'Dwayne S.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=dwayne2' },
          { id: 'adrian-3', name: 'Adrian G.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=adrian3' },
          { id: 'jennifer-3', name: 'Jennifer M.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=jennifer3' },
        ],
      },
      16: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'rachel-3', name: 'Rachel L.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=rachel3' },
          { id: 'mark-3', name: 'Mark S.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=mark3' },
          { id: 'carmen-3', name: 'Carmen R.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=carmen3' },
        ],
      },
      17: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'adrian-4', name: 'Adrian G.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=adrian4' },
          { id: 'jennifer-4', name: 'Jennifer M.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=jennifer4' },
        ],
      },
      18: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'rachel-4', name: 'Rachel L.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=rachel4' },
          { id: 'sharon-4', name: 'Sharon N.', role: 'Kasir', image: 'https://i.pravatar.cc/40?u=sharon4' },
        ],
      },
    },
    2: {
      12: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'mark-4', name: 'Mark S.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=mark' },
          { id: 'carmen-4', name: 'Carmen R.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=carmen' },
          { id: 'dwayne-3', name: 'Dwayne S.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=dwayne' },
          { id: 'sharon-3', name: 'Sharon N.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=sharon' },
          { id: 'roger-3', name: 'Roger P.', role: 'Kasir', image: 'https://i.pravatar.cc/40?u=roger' },
        ],
      },
      13: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'rachel-5', name: 'Rachel L.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=rachel' },
          { id: 'mark-5', name: 'Mark S.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=mark' },
          { id: 'carmen-5', name: 'Carmen R.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=carmen' },
          { id: 'jennifer-5', name: 'Jennifer M.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=jennifer' },
        ],
      },
      14: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'adrian-5', name: 'Adrian G.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=adrian' },
          { id: 'roger-4', name: 'Roger P.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=roger' },
          { id: 'dwayne-4', name: 'Dwayne S.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=dwayne' },
          { id: 'rachel-6', name: 'Rachel L.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=rachel' },
          { id: 'sharon-5', name: 'Sharon N.', role: 'Kasir', image: 'https://i.pravatar.cc/40?u=sharon' },
        ],
      },
      15: {
        type: 'understaffed',
        status: 'understaffed',
        employees: [
          { id: 'mark-6', name: 'Mark S.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=mark' },
          { id: 'carmen-6', name: 'Carmen R.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=carmen' },
        ],
        note: 'Kekurangan Staff',
      },
      16: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'roger-5', name: 'Roger P.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=roger5' },
          { id: 'sharon-6', name: 'Sharon N.', role: 'Kasir', image: 'https://i.pravatar.cc/40?u=sharon5' },
        ],
      },
      17: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'carmen-7', name: 'Carmen R.', role: 'Barista', image: 'https://i.pravatar.cc/40?u=carmen4' },
          { id: 'jennifer-6', name: 'Jennifer M.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=jennifer5' },
        ],
      },
      18: {
        type: 'shift',
        status: 'active',
        employees: [
          { id: 'dwayne-5', name: 'Dwayne S.', role: 'Waiter', image: 'https://i.pravatar.cc/40?u=dwayne5' },
          { id: 'rachel-7', name: 'Rachel L.', role: 'Koki', image: 'https://i.pravatar.cc/40?u=rachel5' },
        ],
      },
    },
  };

  const [scheduleData, setScheduleData] = useState(initialScheduleData);
  const [draggedEmployee, setDraggedEmployee] = useState(null);
  const [dragOverInfo, setDragOverInfo] = useState(null);

  const getRoleColor = (role) => {
    switch (role) {
      case 'Koki': return 'bg-orange-200 text-orange-900 border-orange-300';
      case 'Barista': return 'bg-purple-200 text-purple-900 border-purple-300';
      case 'Waiter': return 'bg-blue-200 text-blue-900 border-blue-300';
      case 'Kasir': return 'bg-green-200 text-green-900 border-green-300';
      default: return 'bg-gray-200 text-gray-900 border-gray-300';
    }
  };

  const handleDragStart = (e, employee, sourceShiftId, sourceDate) => {
    setDraggedEmployee({
      employee,
      sourceShiftId,
      sourceDate
    });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, targetShiftId, targetDate) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const scrollContainer = e.currentTarget.closest('.overflow-x-auto.w-full');
    if (scrollContainer) {
      const rect = scrollContainer.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const scrollThreshold = 50;
      const scrollSpeed = 10;

      if (offsetY < scrollThreshold) {
        scrollContainer.scrollTop = Math.max(scrollContainer.scrollTop - scrollSpeed, 0);
      } else if (offsetY > rect.height - scrollThreshold) {
        scrollContainer.scrollTop = Math.min(scrollContainer.scrollTop + scrollSpeed, scrollContainer.scrollHeight);
      }
    }
    
    if (draggedEmployee && 
        draggedEmployee.sourceDate === targetDate && 
        draggedEmployee.sourceShiftId !== targetShiftId) {
      
      const targetEmployees = scheduleData[targetShiftId]?.[targetDate]?.employees || [];
      const employeeAlreadyExists = targetEmployees.some(emp => emp.name === draggedEmployee.employee.name);
      
      if (!employeeAlreadyExists) {
        setDragOverInfo({ shiftId: targetShiftId, date: targetDate });
      }
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverInfo(null);
    }
  };

  const handleDrop = (e, targetShiftId, targetDate) => {
    e.preventDefault();
    setDragOverInfo(null);

    if (!draggedEmployee) return;

    const { employee, sourceShiftId, sourceDate } = draggedEmployee;

    if (sourceDate !== targetDate || sourceShiftId === targetShiftId) {
      setDraggedEmployee(null);
      return;
    }

    const targetEmployees = scheduleData[targetShiftId]?.[targetDate]?.employees || [];
    const employeeAlreadyExists = targetEmployees.some(emp => emp.name === employee.name);

    if (employeeAlreadyExists) {
      setDraggedEmployee(null);
      alert(`${employee.name} sudah ada di ${shifts.find(s => s.id === targetShiftId)?.name} pada hari ini!`);
      return;
    }

    setScheduleData(prev => {
      const newData = { ...prev };

      if (newData[sourceShiftId]?.[sourceDate]?.employees) {
        newData[sourceShiftId][sourceDate].employees = 
          newData[sourceShiftId][sourceDate].employees.filter(emp => emp.id !== employee.id);
      }

      if (!newData[targetShiftId]) {
        newData[targetShiftId] = {};
      }
      if (!newData[targetShiftId][targetDate]) {
        newData[targetShiftId][targetDate] = {
          type: 'shift',
          status: 'active',
          employees: []
        };
      }
      if (!newData[targetShiftId][targetDate].employees) {
        newData[targetShiftId][targetDate].employees = [];
      }

      if (!newData[targetShiftId][targetDate].employees.some(emp => emp.id === employee.id)) {
        newData[targetShiftId][targetDate].employees.push(employee);
      }

      return newData;
    });

    setDraggedEmployee(null);
  };

  const handleDragEnd = () => {
    setDraggedEmployee(null);
    setDragOverInfo(null);
  };

  const renderScheduleCell = (shiftId, dayDate) => {
    const schedule = scheduleData[shiftId]?.[dayDate];
    const isDropTarget = dragOverInfo?.shiftId === shiftId && dragOverInfo?.date === dayDate;
    const canDrop = draggedEmployee && 
                   draggedEmployee.sourceDate === dayDate && 
                   draggedEmployee.sourceShiftId !== shiftId;

    return (
      <div 
        className={`p-2 space-y-2 min-h-[120px] transition-colors duration-200 ${
          isDropTarget ? 'bg-green-50 border-2 border-green-300 border-dashed' : ''
        } ${canDrop ? 'border-2 border-gray-300 border-dashed' : ''}`}
        onDragOver={(e) => handleDragOver(e, shiftId, dayDate)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, shiftId, dayDate)}
      >
        {schedule?.employees?.map((emp, idx) => (
          <div
            key={emp.id}
            draggable
            onDragStart={(e) => handleDragStart(e, emp, shiftId, dayDate)}
            onDragEnd={handleDragEnd}
            className={`border rounded-lg p-2 shadow-sm min-w-[180px] h-20 flex items-center gap-2 cursor-move transition-all duration-200 hover:shadow-md ${getRoleColor(emp.role)} ${
              draggedEmployee?.employee.id === emp.id ? 'opacity-50 scale-95' : ''
            }`}
          >
            <img src={emp.image} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">{emp.name}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium">{emp.role}</span>
              </div>
            </div>
          </div>
        ))}
        {schedule?.status === 'understaffed' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2">
            <div className="text-xs font-medium text-red-800 text-center">{schedule.note}</div>
          </div>
        )}
        {!schedule && (
          <div className="flex items-center justify-center h-20 text-gray-400 text-sm">
            Tidak ada jadwal
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Shift Schedule</span>
        </div>
        <div className="text-sm text-gray-500">
          💡 Drag karyawan untuk memindahkan antar shift pada hari yang sama
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden relative">
        <div className="flex w-280">
          <div className="sticky left-0 z-10 bg-white border-r border-gray-200">
            <div className="p-4 font-medium text-gray-700 border-b border-gray-200 w-[200px] h-[72px] flex items-center bg-white">
              Pembagian Shift
            </div>
            {shifts.map((shift, shiftIndex) => {
              const maxEmployeesInShift = Math.max(
                ...days.map(day => scheduleData[shift.id]?.[day.date]?.employees?.length || 0)
              );
              const shiftHeight = Math.max(maxEmployeesInShift * 88 + 32, 120);

              return (
                <div
                  key={shift.id}
                  className={`p-4 flex items-start gap-3 border-b border-gray-200 last:border-b-0 w-[200px] ${shiftIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  style={{ height: `${shiftHeight}px` }}
                >
                  <div className={`w-10 h-10 ${shift.color} rounded-full flex items-center justify-center text-white text-sm font-bold mt-2`}>
                    {shift.avatar}
                  </div>
                  <span className="font-semibold text-gray-900 mt-3">{shift.name}</span>
                </div>
              );
            })}
          </div>

          <div className="overflow-x-auto w-full">
            <div className="min-w-[1400px]">
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`p-4 text-center border-r border-gray-200 last:border-r-0 min-w-[200px] ${day.day === 'Senin' ? 'bg-blue-50' : ''}`}
                  >
                    <div className={`text-xl font-bold ${day.day === 'Senin' ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day.day}
                    </div>
                  </div>
                ))}
              </div>

              {shifts.map((shift, shiftIndex) => {
                const maxEmployeesInShift = Math.max(
                  ...days.map(day => scheduleData[shift.id]?.[day.date]?.employees?.length || 0)
                );
                const shiftHeight = Math.max(maxEmployeesInShift * 88 + 32, 120);

                return (
                  <div
                    key={shift.id}
                    className={`grid grid-cols-7 border-b border-gray-200 last:border-b-0 ${shiftIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    style={{ height: `${shiftHeight}px` }}
                  >
                    {days.map((day, dayIndex) => (
                      <div key={dayIndex} className="border-r border-gray-200 last:border-r-0 min-w-[200px]">
                        {renderScheduleCell(shift.id, day.date)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shift;