import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  priority: 'high' | 'medium' | 'low';
}

export default function StudioAnnouncements() {
  const { studioId } = useParams();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      if (!studioId) return;
      
      try {
        const announcementsRef = collection(db, `Studios/${studioId}/Announcements`);
        const q = query(
          announcementsRef,
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        
        const querySnapshot = await getDocs(q);
        const announcementData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Announcement[];
        
        setAnnouncements(announcementData);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [studioId]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-meta-1/10 text-meta-1';
      case 'medium':
        return 'bg-meta-3/10 text-meta-3';
      default:
        return 'bg-meta-4/10 text-meta-4';
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-stroke bg-white shadow-default transition-all duration-300 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-full items-center justify-center p-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stroke bg-white shadow-default transition-all duration-300 dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-stroke px-4 py-4 dark:border-gray-800 sm:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Studio Announcements
        </h4>
      </div>

      <div className="p-4 sm:p-6 xl:p-7.5">
        {announcements.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No announcements to display</p>
        ) : (
          <div className="flex flex-col gap-6">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-xl border border-stroke bg-gray-50 p-4 transition-all duration-300 dark:border-gray-800 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h5 className="text-lg font-medium text-black dark:text-white">
                      {announcement.title}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      By {announcement.createdBy} • {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {announcement.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 