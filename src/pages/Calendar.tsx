import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";
import CalendarViewSelector from "../components/calendar/CalendarViewSelector";
import SeasonFilter from "../components/calendar/SeasonFilter";
import StudioRoomFilter from "../components/calendar/StudioRoomFilter";
import CalendarNavigation from "../components/calendar/CalendarNavigation";
import CreateButton from "../components/ui/button/CreateButton";
import CreateClassModal from "../components/classes/modals/CreateClassModal";
import { NewClassData } from "../types/class.types";
import { CalendarEvent } from "../types/calendar.types";
import { classService } from "../services/classService";
import { useUserStore } from "../store/useUserStore";
import CalendarWrapper from "../components/calendar/CalendarWrapper";
import MoreEventsModal from "../components/calendar/MoreEventsModal";
import Spinner from "../components/ui/spinner/Spinner";

export default function Calendar() {
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const [currentSeasonIds, setCurrentSeasonIds] = useState<string[]>(['all']);
  const [currentRoomIds, setCurrentRoomIds] = useState<string[]>(['all']);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentStudio = useUserStore(state => state.currentStudio);
  const [moreEventsData, setMoreEventsData] = useState<{
    date: Date;
    events: any[];
    isOpen: boolean;
  } | null>(null);

  const fetchEvents = async () => {
    if (!currentStudio) {
      console.error('No studio ID available');
      return;
    }

    try {
      setIsLoading(true);
      const calendarEvents = await classService.fetchFilteredCalendarEvents(
        currentStudio,
        currentSeasonIds.includes('all') ? [] : currentSeasonIds,
        currentRoomIds.includes('all') ? [] : currentRoomIds
      );
      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentStudio, currentSeasonIds, currentRoomIds]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    const startTime = selectInfo.start.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const endTime = selectInfo.end.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    const selectedDays = new Set<string>();
    let currentDate = new Date(selectInfo.start);
    const endDate = new Date(selectInfo.end);

    if (currentView === 'timeGridDay') {
      const dayOfWeek = currentDate.getDay();
      selectedDays.add(dayMap[dayOfWeek]);
    } else {
      if (currentView === 'dayGridMonth') {
        endDate.setDate(endDate.getDate() - 1);
      }

      while (currentDate <= endDate) {
        const currentDayOfWeek = currentDate.getDay();
        selectedDays.add(dayMap[currentDayOfWeek]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    setSelectedDays(Array.from(selectedDays));
    setIsCreateModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    openModal();
  };

  const handleCreateClass = async (classData: NewClassData) => {
    if (!currentStudio) return;

    try {
      await classService.createClass(currentStudio, classData);
      await fetchEvents();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const handleMoreEventsClose = () => {
    setMoreEventsData(null);
  };

  return (
    <>
      <PageMeta title="Calendar" description="Studio Sync Calendar" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-full flex flex-col w-full">
        <div className="custom-calendar flex flex-col h-full w-full">
          <CalendarNavigation calendarRef={calendarRef} currentView={currentView} />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
            <CreateButton
              onClick={() => setIsCreateModalOpen(true)}
              label="Add Class +"
              className="w-full sm:w-auto order-2 sm:order-1"
            />
            
            <div className="w-full sm:w-auto flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 justify-end order-1 sm:order-2">
              <CalendarViewSelector
                currentView={currentView}
                onViewChange={setCurrentView}
                className="w-full sm:w-36"
              />
              <SeasonFilter
                studioId={currentStudio || ''}
                currentSeasonId={currentSeasonIds}
                onSeasonChange={setCurrentSeasonIds}
                className="w-full sm:w-32"
              />
              <StudioRoomFilter
                studioId={currentStudio || ''}
                currentRoomId={currentRoomIds}
                onRoomChange={setCurrentRoomIds}
                className="w-full sm:w-32"
              />
            </div>
          </div>

          {/* Modified calendar container structure */}
          <div className="flex-1 h-full min-h-0 w-full relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 z-10">
                <Spinner size="lg" />
              </div>
            )}
            <CalendarWrapper
              ref={calendarRef}
              events={events}
              onDateSelect={handleDateSelect}
              onEventClick={handleEventClick}
              currentView={currentView}
            />
          </div>
          
          {moreEventsData && (
            <MoreEventsModal
              date={moreEventsData.date}
              events={moreEventsData.events}
              onClose={handleMoreEventsClose}
              onEventClick={(event) => {
                handleEventClick({ event } as EventClickArg);
                handleMoreEventsClose();
              }}
              isOpen={moreEventsData.isOpen}
            />
          )}
        </div>

        <CreateClassModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setSelectedStartTime("");
            setSelectedEndTime("");
            setSelectedDays([]);
          }}
          onSubmit={handleCreateClass}
          initialStartTime={selectedStartTime}
          initialEndTime={selectedEndTime}
          initialDays={selectedDays}
        />

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          {selectedEvent?.extendedProps.classData && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">
                {selectedEvent.title}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p>{selectedEvent.extendedProps.classData.ClassType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p>{selectedEvent.extendedProps.classData.Students?.length || 0}/{selectedEvent.extendedProps.classData.MaxSize}</p>
                </div>
                {selectedEvent.extendedProps.classData.EnforceAgeLimit && (
                  <div>
                    <p className="text-sm text-gray-500">Age Range</p>
                    <p>{selectedEvent.extendedProps.classData.MinAge} - {selectedEvent.extendedProps.classData.MaxAge} years</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}