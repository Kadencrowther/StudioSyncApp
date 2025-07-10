import React, { useEffect, useState } from 'react';
import ViewDropdown from '../ui/dropdown/ViewDropdown';
import { Season, seasonService } from '../../services/seasonService';

interface SeasonFilterProps {
  studioId: string;
  currentSeasonId: string[];
  onSeasonChange: (seasonIds: string[]) => void;
  className?: string;
}

const SeasonIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const SeasonFilter: React.FC<SeasonFilterProps> = ({
  studioId,
  currentSeasonId,
  onSeasonChange,
  className = '',
}) => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSeasons = async () => {
      console.log('Loading seasons for studio:', studioId);
      try {
        const seasonsMap = await seasonService.fetchSeasons(studioId);
        console.log('Fetched seasons:', seasonsMap);
        
        const seasonsList = Array.from(seasonsMap.values())
          .filter(season => season.IsActive)
          .sort((a, b) => {
            // Sort by start date, most recent first
            const dateA = new Date(b.StartDate).getTime();
            const dateB = new Date(a.StartDate).getTime();
            if (dateA !== dateB) return dateA - dateB;
            // If same date, sort by name
            return a.Name.localeCompare(b.Name);
          });
        
        console.log('Processed seasons list:', seasonsList);
        setSeasons(seasonsList);
      } catch (error) {
        console.error('Error loading seasons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (studioId) {
      loadSeasons();
    } else {
      console.warn('No studioId provided to SeasonFilter');
    }
  }, [studioId]);

  const seasonOptions = seasons.map(season => ({
    label: season.Name,
    value: season.id
  }));

  console.log('Season options:', seasonOptions);
  console.log('Current season IDs:', currentSeasonId);

  return (
    <ViewDropdown<string[]>
      value={currentSeasonId}
      options={seasonOptions}
      onViewChange={onSeasonChange}
      className={className}
      defaultLabel="Season"
      isLoading={isLoading}
      isMulti={true}
      allItemsLabel="All Seasons"
      icon={<SeasonIcon />}
    />
  );
};

export default SeasonFilter; 