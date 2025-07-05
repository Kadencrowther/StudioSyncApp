import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface MetricCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

// Default data for testing UI
const defaultMetrics: MetricCard[] = [
  {
    title: 'Total Students',
    value: 248,
    icon: (
      <svg className="fill-brand-500 dark:fill-brand-400" width="22" height="22" viewBox="0 0 22 22">
        <path d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zm0 16.5c-2.75 0-5.5-1.375-5.5-3.575 0-1.375 1.375-2.75 2.75-2.75h5.5c1.375 0 2.75 1.375 2.75 2.75 0 2.2-2.75 3.575-5.5 3.575zM11 4.95c1.925 0 3.575 1.65 3.575 3.575S12.925 12.1 11 12.1 7.425 10.45 7.425 8.525 9.075 4.95 11 4.95z" />
      </svg>
    )
  },
  {
    title: 'Total Families',
    value: 156,
    icon: (
      <svg className="fill-brand-500 dark:fill-brand-400" width="22" height="22" viewBox="0 0 22 22">
        <path d="M16.975 11.888c-.555 0-1.027.195-1.414.582a1.926 1.926 0 00-.582 1.414c0 .555.194 1.027.582 1.414.387.388.859.582 1.414.582.554 0 1.026-.194 1.413-.582.388-.387.582-.859.582-1.414 0-.555-.194-1.026-.582-1.414a1.926 1.926 0 00-1.413-.582z" />
        <path d="M20.85 14.888l-3.45-.01v-1.99c0-.555-.194-1.027-.582-1.414a1.926 1.926 0 00-1.414-.582h-2.99V8.902c1.11-.555 1.989-1.414 2.583-2.583.594-1.169.841-2.428.742-3.777-.099-1.35-.545-2.558-1.337-3.627C13.61-2.153 12.322-2.847 10.733-3c-1.588-.153-3.053.243-4.394 1.188-1.34.945-2.178 2.203-2.513 3.777-.334 1.573-.064 3.102.811 4.589.875 1.486 2.133 2.468 3.777 2.945v1.99H5.425c-.555 0-1.027.194-1.414.582-.388.387-.582.859-.582 1.414v1.99l-3.43.01C-.334 14.485 0 15.332 0 16.277v3.48c0 .357.119.655.357.894.238.238.536.357.894.357h19.498c.357 0 .655-.12.893-.357.238-.239.358-.537.358-.894v-3.48c0-.944.333-1.791-.15-2.389z" />
      </svg>
    )
  },
  {
    title: 'Total Instructors',
    value: 12,
    icon: (
      <svg className="fill-brand-500 dark:fill-brand-400" width="22" height="22" viewBox="0 0 22 22">
        <path d="M21.12 7.15c-.457-.457-1.003-.686-1.637-.686h-3.273V3.19c0-.635-.229-1.18-.686-1.637C15.067 1.096 14.521.867 13.887.867H3.19c-.635 0-1.18.229-1.637.686C1.096 2.01.867 2.556.867 3.19v10.697c0 .635.229 1.18.686 1.637.457.457 1.003.686 1.637.686h3.273v3.273c0 .635.229 1.18.686 1.637.457.457 1.003.686 1.637.686h10.697c.635 0 1.18-.229 1.637-.686.457-.457.686-1.003.686-1.637V8.787c0-.635-.229-1.18-.686-1.637z" />
      </svg>
    )
  },
  {
    title: 'New Students',
    value: 18,
    icon: (
      <svg className="fill-brand-500 dark:fill-brand-400" width="22" height="22" viewBox="0 0 22 22">
        <path d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zm5.5 12.375h-4.125V16.5c0 .688-.687 1.375-1.375 1.375s-1.375-.688-1.375-1.375v-4.125H5.5c-.688 0-1.375-.688-1.375-1.375s.687-1.375 1.375-1.375h4.125V5.5c0-.688.687-1.375 1.375-1.375s1.375.688 1.375 1.375v4.125H16.5c.688 0 1.375.688 1.375 1.375s-.688 1.375-1.375 1.375z" />
      </svg>
    ),
    trend: {
      value: 18,
      isPositive: true
    }
  },
  {
    title: 'Waitlisted Classes',
    value: 3,
    icon: (
      <svg className="fill-brand-500 dark:fill-brand-400" width="22" height="22" viewBox="0 0 22 22">
        <path d="M13.75 0H1.375C.619 0 0 .619 0 1.375v13.75c0 .756.619 1.375 1.375 1.375h12.375c.756 0 1.375-.619 1.375-1.375V1.375C15.125.619 14.506 0 13.75 0zM4.125 12.375v-1.375c0-.756.619-1.375 1.375-1.375s1.375.619 1.375 1.375v1.375c0 .756-.619 1.375-1.375 1.375s-1.375-.619-1.375-1.375z" />
      </svg>
    )
  },
  {
    title: 'Unfinished Registrations',
    value: 7,
    icon: (
      <svg className="fill-brand-500 dark:fill-brand-400" width="22" height="22" viewBox="0 0 22 22">
        <path d="M20.625 5.5h-1.375V3.438c0-.756-.619-1.375-1.375-1.375H1.375C.619 2.063 0 2.681 0 3.438v13.75c0 .756.619 1.375 1.375 1.375H2.75v1.375c0 .756.619 1.375 1.375 1.375h16.5c.756 0 1.375-.619 1.375-1.375V6.875c0-.756-.619-1.375-1.375-1.375zM2.75 16.5V4.813h13.75V5.5H4.125c-.756 0-1.375.619-1.375 1.375V16.5H2.75zm16.5 2.063H4.813V7.563h14.438v10.999z" />
      </svg>
    ),
    trend: {
      value: 7,
      isPositive: false
    }
  }
];

const StudioMetrics: React.FC = () => {
  const { studioId } = useParams();
  const [metrics, setMetrics] = useState<MetricCard[]>(defaultMetrics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!studioId) return;
      
      try {
        const usersRef = collection(db, `Studios/${studioId}/Users`);
        const classesRef = collection(db, `Studios/${studioId}/Classes`);
        const registrationsRef = collection(db, `Studios/${studioId}/Registrations`);
        
        // Get total students
        const studentsQuery = query(usersRef, where('role', '==', 'student'), where('isActive', '==', true));
        const studentsSnapshot = await getDocs(studentsQuery);
        const totalStudents = studentsSnapshot.size;

        // Get total families (unique households)
        const familyIds = new Set(
          studentsSnapshot.docs.map(doc => doc.data().familyId).filter(Boolean)
        );
        const totalFamilies = familyIds.size;

        // Get total instructors
        const instructorsQuery = query(usersRef, where('role', '==', 'instructor'), where('isActive', '==', true));
        const instructorsSnapshot = await getDocs(instructorsQuery);
        const totalInstructors = instructorsSnapshot.size;

        // Get new students this week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newStudentsQuery = query(
          usersRef,
          where('role', '==', 'student'),
          where('createdAt', '>=', oneWeekAgo.toISOString())
        );
        const newStudentsSnapshot = await getDocs(newStudentsQuery);
        const newStudentsCount = newStudentsSnapshot.size;

        // Get classes with waitlists
        const classesSnapshot = await getDocs(classesRef);
        const waitlistedClasses = classesSnapshot.docs.filter(doc => {
          const data = doc.data();
          return data.currentEnrollment >= data.maxCapacity;
        }).length;

        // Get unfinished registrations
        const unfinishedQuery = query(registrationsRef, where('status', '==', 'incomplete'));
        const unfinishedSnapshot = await getDocs(unfinishedQuery);
        const unfinishedCount = unfinishedSnapshot.size;

        const updatedMetrics = [...defaultMetrics];
        updatedMetrics[0].value = totalStudents;
        updatedMetrics[1].value = totalFamilies;
        updatedMetrics[2].value = totalInstructors;
        updatedMetrics[3].value = newStudentsCount;
        updatedMetrics[3].trend = {
          value: newStudentsCount,
          isPositive: true
        };
        updatedMetrics[4].value = waitlistedClasses;
        updatedMetrics[5].value = unfinishedCount;
        updatedMetrics[5].trend = {
          value: unfinishedCount,
          isPositive: false
        };

        setMetrics(updatedMetrics);
        setError(null);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setError('Unable to load metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [studioId]);

  return (
    <>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="relative rounded-xl border border-stroke bg-white py-6 px-7.5 shadow-default hover:shadow-lg transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-dark-shadow"
        >
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-gray-800">
            {metric.icon}
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
              ) : (
                <>
                  <h4 className="text-2xl font-bold text-black dark:text-white">
                    {error ? '--' : metric.value}
                  </h4>
                  <span className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {metric.title}
                  </span>
                  {error && (
                    <p className="text-xs text-meta-1 mt-1">Error loading data</p>
                  )}
                </>
              )}
            </div>

            {metric.trend && !loading && !error && (
              <span className={`flex items-center gap-1 text-sm font-medium ${
                metric.trend.isPositive ? 'text-meta-3' : 'text-meta-1'
              }`}>
                {metric.trend.value}
                {metric.trend.isPositive ? (
                  <svg
                    className="fill-meta-3"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                  >
                    <path
                      d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="fill-meta-1"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                  >
                    <path
                      d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848689L5.64284 0.0848689L5.64284 7.69237Z"
                    />
                  </svg>
                )}
              </span>
            )}
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 rounded-sm hover:opacity-5 dark:hover:opacity-10"></div>
        </div>
      ))}
    </>
  );
}

export default StudioMetrics; 