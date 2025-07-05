import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface ClassSession {
  id: string;
  className: string;
  instructor: string;
  startTime: string;
  endTime: string;
  room: string;
  currentEnrollment: number;
  maxCapacity: number;
}

export default function UpcomingClasses() {
  const { studioId } = useParams();
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingClasses = async () => {
      if (!studioId) return;
      
      try {
        const today = new Date();
        const classesRef = collection(db, `Studios/${studioId}/Classes`);
        const q = query(
          classesRef,
          where('startTime', '>=', today.toISOString()),
          orderBy('startTime', 'asc'),
          limit(5)
        );
        
        const querySnapshot = await getDocs(q);
        const classData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ClassSession[];
        
        setClasses(classData);
      } catch (error) {
        console.error('Error fetching upcoming classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingClasses();
  }, [studioId]);

  if (loading) {
    return (
      <div className="rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 sm:px-7.5 xl:pb-1">
        <div className="flex h-full items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Upcoming Classes
      </h4>

      <div className="flex flex-col gap-5">
        {classes.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming classes scheduled</p>
        ) : (
          classes.map((classSession) => (
            <div
              key={classSession.id}
              className="flex items-center justify-between rounded-xl border border-stroke bg-gray-50 p-4 transition-all duration-300 dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 dark:bg-gray-700">
                  <svg
                    className="fill-primary dark:fill-gray-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"
                    />
                    <path
                      d="M16.5 12.75h-4.5V6a.75.75 0 00-1.5 0v7.5c0 .414.336.75.75.75h5.25a.75.75 0 000-1.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {classSession.className}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {classSession.instructor}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-black dark:text-white">
                  {new Date(classSession.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Room {classSession.room}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {classSession.currentEnrollment}/{classSession.maxCapacity} enrolled
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 