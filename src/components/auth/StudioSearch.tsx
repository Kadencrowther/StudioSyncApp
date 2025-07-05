import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Input from '../form/input/InputField';
import Label from '../form/Label';

interface Studio {
  id: string;
  StudioName: string;
  LogoUrl?: string;
  Industry?: string;
  StudioCity?: string;
  StudioState?: string;
  AccountIsActive: boolean;
}

export default function StudioSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [studios, setStudios] = useState<Studio[]>([]);
  const [filteredStudios, setFilteredStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Load all studios and filter active ones in memory
  useEffect(() => {
    const loadStudios = async () => {
      try {
        const studiosRef = collection(db, 'Studios');
        const querySnapshot = await getDocs(studiosRef);
        
        const studioList: Studio[] = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            StudioName: doc.data().StudioName || '',
            LogoUrl: doc.data().LogoUrl,
            Industry: doc.data().Industry,
            StudioCity: doc.data().StudioCity,
            StudioState: doc.data().StudioState,
            AccountIsActive: doc.data().AccountIsActive
          }))
          .filter(studio => studio.AccountIsActive) // Filter active studios
          .sort((a, b) => a.StudioName.localeCompare(b.StudioName)); // Sort by name
        
        setStudios(studioList);
        setFilteredStudios(studioList);
      } catch (err) {
        console.error('Error loading studios:', err);
        setError('Failed to load studios. Please try again.');
      }
      setLoading(false);
    };

    loadStudios();
  }, []);

  // Filter studios based on search term
  useEffect(() => {
    const filtered = studios.filter(studio => {
      const searchLower = searchTerm.toLowerCase();
      return (
        studio.StudioName.toLowerCase().includes(searchLower) ||
        studio.id.toLowerCase().includes(searchLower) ||
        (studio.StudioCity && studio.StudioCity.toLowerCase().includes(searchLower)) ||
        (studio.StudioState && studio.StudioState.toLowerCase().includes(searchLower))
      );
    });
    setFilteredStudios(filtered);
  }, [searchTerm, studios]);

  const handleStudioSelect = (studioId: string) => {
    navigate(`/signin/${studioId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-error-500 py-4">
        {error}
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-brand-500 hover:text-brand-600 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Find Your Studio
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Search by studio name, location, or ID
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Search Studios</Label>
          <Input
            type="text"
            placeholder="Enter studio name, city, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {filteredStudios.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No studios found
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
              {filteredStudios.map((studio) => (
                <li
                  key={studio.id}
                  onClick={() => handleStudioSelect(studio.id)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center p-4">
                    {studio.LogoUrl && (
                      <img
                        src={studio.LogoUrl}
                        alt={`${studio.StudioName} logo`}
                        className="h-10 w-10 object-contain rounded"
                      />
                    )}
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {studio.StudioName}
                        </h3>
                        {studio.Industry && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {studio.Industry}
                          </span>
                        )}
                      </div>
                      {(studio.StudioCity || studio.StudioState) && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {[studio.StudioCity, studio.StudioState]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 