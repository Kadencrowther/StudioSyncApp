import React from 'react';
import { CalendarApi, ViewApi } from '@fullcalendar/core';
import CalendarFilters from './CalendarFilters';
import ViewDropdown from '../ui/dropdown/ViewDropdown';

interface CustomToolbarProps {
  calendar: CalendarApi;
  view: ViewApi;
  onSeasonFilter: () => void;
  onRoomFilter: () => void;
}

const CalendarToolbar: React.FC<CustomToolbarProps> = ({
  calendar,
  view,
  onSeasonFilter,
  onRoomFilter,
}) => {
  const viewOptions = [
    { label: 'Month', value: 'dayGridMonth' },
    { label: 'Week', value: 'timeGridWeek' },
    { label: 'Day', value: 'timeGridDay' },
  ];

  return (
    <div className="fc-header-toolbar fc-toolbar flex flex-col gap-4 w-full">
      <div className="fc-toolbar-chunk flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="fc-button-group">
            <button
              type="button"
              className="fc-prev-button fc-button fc-button-primary"
              onClick={() => calendar.prev()}
            >
              <span className="fc-icon fc-icon-chevron-left"></span>
            </button>
            <button
              type="button"
              className="fc-next-button fc-button fc-button-primary"
              onClick={() => calendar.next()}
            >
              <span className="fc-icon fc-icon-chevron-right"></span>
            </button>
          </div>
          <ViewDropdown<string>
            value={view.type}
            options={viewOptions}
            onViewChange={(newView) => calendar.changeView(newView)}
            defaultLabel="View"
            isMulti={false}
            className="w-full max-w-[200px]"
          />
        </div>
      </div>
      <div className="fc-toolbar-chunk text-center w-full">
        <h2 className="fc-toolbar-title">{view.title}</h2>
      </div>
      <div className="fc-toolbar-chunk w-full">
        <CalendarFilters
          onSeasonFilter={onSeasonFilter}
          onRoomFilter={onRoomFilter}
        />
      </div>
    </div>
  );
};

export default CalendarToolbar; 