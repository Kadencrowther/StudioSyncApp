import React, { useEffect, useState, useMemo } from 'react';
import Table, { Column } from '../table/Table';
import TableActions from '../table/TableActions';
import { ClassData } from '../../types/class.types';
import { Instructor, instructorService } from '../../services/instructorService';
import { timeUtils } from '../../utils/timeUtils';
import { dayUtils } from '../../utils/dayUtils';
import { useUserStore } from '../../store/useUserStore';

interface ClassesTableProps {
  data: ClassData[];
  isLoading?: boolean;
  onEdit: (classId: string) => void;
  onDelete: (classId: string) => void;
  onRowClick: (classData: ClassData) => void;
  searchQuery: string;
}

const ClassesTable: React.FC<ClassesTableProps> = ({
  data,
  isLoading = false,
  onEdit,
  onDelete,
  onRowClick,
  searchQuery
}) => {
  const [instructors, setInstructors] = useState<Map<string, Instructor>>(new Map());
  const currentStudio = useUserStore(state => state.currentStudio);
  const [loadingInstructors, setLoadingInstructors] = useState(false);

  useEffect(() => {
    const loadInstructors = async () => {
      if (!currentStudio) return;
      
      setLoadingInstructors(true);
      try {
        const instructorsMap = await instructorService.fetchInstructors(currentStudio);
        setInstructors(instructorsMap);
      } catch (error) {
        console.error('Error loading instructors:', error);
      } finally {
        setLoadingInstructors(false);
      }
    };

    loadInstructors();
  }, [currentStudio]);

  const getInstructorName = (instructorId: string): string => {
    const instructor = instructors.get(instructorId);
    return instructor ? instructorService.getInstructorFullName(instructor) : 'Unknown Instructor';
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase().trim();
    return data.filter(classItem => {
      // Get all searchable values
      const searchableValues = [
        classItem.ClassName.toLowerCase(),
        classItem.ClassType.toLowerCase(),
        dayUtils.formatDays(classItem.Days).toLowerCase(),
        timeUtils.formatTimeRange(classItem.StartTime, classItem.EndTime).toLowerCase(),
        getInstructorName(classItem.InstructorId).toLowerCase(),
        classItem.Description?.toLowerCase() || '',
        `${classItem.Students?.length || 0}/${classItem.MaxSize}`,
        classItem.EnforceAgeLimit ? `${classItem.MinAge}-${classItem.MaxAge}` : ''
      ];

      // Check if any value contains the search query
      return searchableValues.some(value => value.includes(query));
    });
  }, [data, searchQuery, instructors]);

  const columns: Column<ClassData>[] = [
    {
      header: 'Class Name',
      accessor: 'ClassName',
      className: 'font-medium cursor-pointer'
    },
    {
      header: 'Type',
      accessor: 'ClassType',
      className: 'cursor-pointer'
    },
    {
      header: 'Days',
      accessor: (row: ClassData) => dayUtils.formatDays(row.Days),
      className: 'cursor-pointer'
    },
    {
      header: 'Time',
      accessor: (row: ClassData) => timeUtils.formatTimeRange(row.StartTime, row.EndTime),
      className: 'cursor-pointer'
    },
    {
      header: 'Instructor',
      accessor: (row: ClassData) => getInstructorName(row.InstructorId),
      className: 'cursor-pointer'
    },
    {
      header: 'Students',
      accessor: (row: ClassData) => {
        const currentStudents = row.Students?.length || 0;
        return `${currentStudents}/${row.MaxSize}`;
      },
      className: 'cursor-pointer'
    },
    {
      header: 'Actions',
      accessor: (row: ClassData) => (
        <TableActions
          onEdit={() => onEdit(row.ClassId)}
          onDelete={() => onDelete(row.ClassId)}
        />
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="p-6">
        <div className="relative rounded-lg">
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
            <Table 
              columns={columns}
              data={filteredData}
              isLoading={isLoading || loadingInstructors}
              emptyMessage="No classes found. Click 'Add Class' to create one."
              onRowClick={onRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesTable; 