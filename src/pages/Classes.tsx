import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Table, { Column } from '../components/table/Table';
import TableActions from '../components/table/TableActions';
import SettingsSearch from '../components/settings/SettingsSearch';
import CreateButton from '../components/ui/button/CreateButton';
import CreateClassModal from '../components/classes/modals/CreateClassModal';
import ClassDetailsModal from '../components/classes/modals/ClassDetailsModal';
import EditClassModal from '../components/classes/modals/EditClassModal';
import DeleteClassModal from '../components/classes/modals/DeleteClassModal';
import { NewClassData, ClassData } from '../types/class.types';
import { classService } from '../services/classService';
import { useUserStore } from '../store/useUserStore';
import { dayUtils } from '../utils/dayUtils';
import { timeUtils } from '../utils/timeUtils';
import { instructorService } from '../services/instructorService';

const Classes: React.FC = () => {
  const { studioId: urlStudioId } = useParams();
  const currentStudio = useUserStore(state => state.currentStudio);
  const studioId = urlStudioId || currentStudio;
  
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [returnToDetails, setReturnToDetails] = useState(false);
  const [instructors, setInstructors] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      if (!studioId) {
        console.error('No studio ID available from URL or store');
        setError('Studio not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [classesData, instructorsMap] = await Promise.all([
          classService.fetchClasses(studioId),
          instructorService.fetchInstructors(studioId)
        ]);
        setClasses(classesData);
        setInstructors(instructorsMap);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studioId]);

  const handleRowClick = (classData: ClassData) => {
    setSelectedClass(classData);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = async (classId: string, updatedData: Partial<ClassData>) => {
    if (!studioId) return;
    
    try {
      await classService.updateClass(studioId, classId, updatedData);
      setClasses(prevClasses =>
        prevClasses.map(c =>
          c.id === classId ? { ...c, ...updatedData } : c
        )
      );
      setIsEditModalOpen(false);
      setReturnToDetails(false);
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const handleDelete = async (classId: string) => {
    if (!studioId) return;
    
    try {
      await classService.deleteClass(studioId, classId);
      setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
      setIsDeleteModalOpen(false);
      setIsDetailsModalOpen(false);
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleCreateClass = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateClassSubmit = async (classData: NewClassData) => {
    if (!studioId) return;

    try {
      const newClassId = await classService.createClass(studioId, classData);
      const newClass = await classService.fetchClassById(studioId, newClassId);
      
      if (newClass) {
        setClasses(prevClasses => [...prevClasses, newClass]);
      }
      
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    if (returnToDetails) {
      setIsDetailsModalOpen(true);
    }
    setReturnToDetails(false);
  };

  const getInstructorName = (instructorId: string): string => {
    const instructor = instructors.get(instructorId);
    return instructor ? instructorService.getInstructorFullName(instructor) : 'Unknown Instructor';
  };

  const filteredClasses = useMemo(() => {
    return classes.filter(classItem => 
      classItem.ClassName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.ClassType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dayUtils.formatDays(classItem.Days).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getInstructorName(classItem.InstructorId).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [classes, searchQuery, instructors]);

  const columns: Column<ClassData>[] = [
    {
      header: 'Class Name',
      accessor: 'ClassName',
      className: 'font-medium'
    },
    {
      header: 'Type',
      accessor: 'ClassType'
    },
    {
      header: 'Days',
      accessor: (row: ClassData) => dayUtils.formatDays(row.Days)
    },
    {
      header: 'Time',
      accessor: (row: ClassData) => timeUtils.formatTimeRange(row.StartTime, row.EndTime)
    },
    {
      header: 'Instructor',
      accessor: (row: ClassData) => getInstructorName(row.InstructorId)
    },
    {
      header: 'Students',
      accessor: (row: ClassData) => `${row.Students?.length || 0}/${row.MaxSize}`
    },
    {
      header: 'Actions',
      accessor: (row: ClassData) => (
        <TableActions
          onEdit={() => {
            setSelectedClass(row);
            setIsEditModalOpen(true);
            setReturnToDetails(false);
          }}
          onDelete={() => {
            setSelectedClass(row);
            setIsDeleteModalOpen(true);
          }}
        />
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Classes</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CreateButton 
                onClick={handleCreateClass}
                label="Add Class +"
                className="w-full sm:w-auto whitespace-nowrap"
              />
              <div className="w-full sm:w-[300px] mt-4 sm:mt-0">
                <SettingsSearch
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search classes..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
            <div className="overflow-hidden">
              <Table 
                columns={columns}
                data={filteredClasses}
                isLoading={loading}
                defaultRowsPerPage={25}
                onRowClick={handleRowClick}
                emptyMessage={
                  error 
                    ? `Error: ${error}`
                    : "No classes found. Click 'Add Class' to create one."
                }
              />
            </div>
          </div>
        </div>
      </div>

      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateClassSubmit}
      />

      <ClassDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        classData={selectedClass}
        onEdit={() => {
          setIsDetailsModalOpen(false);
          setIsEditModalOpen(true);
          setReturnToDetails(true);
        }}
        onDelete={() => {
          setIsDetailsModalOpen(false);
          setIsDeleteModalOpen(true);
        }}
      />

      <EditClassModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEdit}
        classData={selectedClass}
      />

      <DeleteClassModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        classData={selectedClass}
      />
    </div>
  );
};

export default Classes; 