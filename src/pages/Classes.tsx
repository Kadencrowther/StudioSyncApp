import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Table, { Column } from '../components/table/Table';
import TableActions from '../components/table/TableActions';
import SettingsSearch from '../components/settings/SettingsSearch';
import CreateButton from '../components/ui/button/CreateButton';

interface ClassData {
  id: string;
  ClassName: string;
  ClassType: string;
  Days: string[];
  StartTime: string;
  EndTime: string;
  Duration: number;
  MaxSize: number;
  InstructorId: string;
  RoomId: string;
}

// Mock data for development
const mockClasses: ClassData[] = [
  {
    id: '1',
    ClassName: 'Hip Hop Advanced',
    ClassType: 'Recreational',
    Days: ['mon', 'wed'],
    StartTime: '17:45',
    EndTime: '18:45',
    Duration: 60,
    MaxSize: 15,
    InstructorId: 'inst1',
    RoomId: 'room1'
  },
  {
    id: '2',
    ClassName: 'Ballet Beginners',
    ClassType: 'Recreational',
    Days: ['tue', 'thu'],
    StartTime: '16:00',
    EndTime: '17:00',
    Duration: 60,
    MaxSize: 12,
    InstructorId: 'inst2',
    RoomId: 'room2'
  },
  {
    id: '3',
    ClassName: 'Jazz Intermediate',
    ClassType: 'Competition',
    Days: ['fri'],
    StartTime: '18:00',
    EndTime: '19:30',
    Duration: 90,
    MaxSize: 20,
    InstructorId: 'inst3',
    RoomId: 'room1'
  },
  {
    id: '4',
    ClassName: 'Contemporary Advanced',
    ClassType: 'Competition',
    Days: ['mon', 'wed', 'fri'],
    StartTime: '19:00',
    EndTime: '20:30',
    Duration: 90,
    MaxSize: 15,
    InstructorId: 'inst4',
    RoomId: 'room3'
  },
  {
    id: '5',
    ClassName: 'Tap Beginners',
    ClassType: 'Recreational',
    Days: ['sat'],
    StartTime: '10:00',
    EndTime: '11:00',
    Duration: 60,
    MaxSize: 10,
    InstructorId: 'inst5',
    RoomId: 'room2'
  }
];

const Classes: React.FC = () => {
  const { studioId } = useParams();
  const [classes, setClasses] = useState<ClassData[]>(mockClasses);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      if (!studioId) return;

      try {
        const classesRef = collection(db, `Studios/${studioId}/Classes`);
        const querySnapshot = await getDocs(classesRef);
        
        const classesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ClassData[];

        setClasses(classesData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    // Comment out the fetch for now to use mock data
    // fetchClasses();
  }, [studioId]);

  const handleEdit = (classId: string) => {
    console.log('Edit class:', classId);
    // TODO: Implement edit functionality
  };

  const handleDelete = async (classId: string) => {
    console.log('Delete class:', classId);
    // TODO: Implement delete functionality
  };

  const handleCreateClass = () => {
    // TODO: Implement class creation
    console.log('Create new class');
  };

  const filteredClasses = useMemo(() => {
    return classes.filter(classItem => 
      classItem.ClassName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.ClassType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.Days.some(day => day.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [classes, searchQuery]);

  const formatDays = (days: string[]) => {
    return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
  };

  const columns: Column<ClassData>[] = [
    {
      header: 'Class Name',
      accessor: 'ClassName' as keyof ClassData,
      className: 'font-medium'
    },
    {
      header: 'Type',
      accessor: 'ClassType' as keyof ClassData
    },
    {
      header: 'Days',
      accessor: (row: ClassData) => formatDays(row.Days)
    },
    {
      header: 'Time',
      accessor: (row: ClassData) => `${row.StartTime} - ${row.EndTime}`
    },
    {
      header: 'Duration',
      accessor: (row: ClassData) => `${row.Duration} min`
    },
    {
      header: 'Capacity',
      accessor: 'MaxSize' as keyof ClassData
    },
    {
      header: 'Actions',
      accessor: (row: ClassData) => (
        <TableActions
          onEdit={() => handleEdit(row.id)}
          onDelete={() => handleDelete(row.id)}
        />
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
          Classes
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CreateButton 
            onClick={handleCreateClass}
            label="Add Class +"
            className="w-full sm:w-auto whitespace-nowrap"
          />
          <SettingsSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search classes..."
          />
        </div>
      </div>
      
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="p-6">
          <Table 
            columns={columns}
            data={filteredClasses}
            isLoading={loading}
            emptyMessage="No classes found. Click 'Add Class' to create one."
          />
        </div>
      </div>
    </div>
  );
};

export default Classes; 