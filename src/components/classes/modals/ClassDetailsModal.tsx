import React, { useEffect, useState, useRef } from 'react';
import { Modal } from '../../ui/modal';
import { Link } from 'react-router-dom';
import { ClassData } from '../../../types/class.types';
import { Instructor, instructorService } from '../../../services/instructorService';
import { ClassStyle, classStyleService } from '../../../services/classStyleService';
import { Season, seasonService } from '../../../services/seasonService';
import { StudioRoom, studioRoomService } from '../../../services/studioRoomService';
import { Student, studentService } from '../../../services/studentService';
import { familyService } from '../../../services/familyService';
import { timeUtils } from '../../../utils/timeUtils';
import { useUserStore } from '../../../store/useUserStore';
import { RatePlan, ratePlanService } from '../../../services/ratePlanService';
import Spinner from '../../ui/spinner/Spinner';

type TabType = 'details' | 'students' | 'attendance' | 'costumes' | 'notes' | 'payment';

interface ClassDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassData | null;
  onEdit: (classId: string) => void;
  onDelete: (classId: string) => void;
}

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
    {children}
  </h6>
);

const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  classData,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [classStyle, setClassStyle] = useState<ClassStyle | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  const [room, setRoom] = useState<StudioRoom | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [loadingStudents, setLoadingStudents] = useState(false);
  const currentStudio = useUserStore(state => state.currentStudio);
  const currentUserDoc = useUserStore(state => state.currentUserDoc);
  const [ratePlans, setRatePlans] = useState<Map<string, RatePlan>>(new Map());

  useEffect(() => {
    const loadData = async () => {
      if (!classData || !currentStudio) return;
      
      try {
        // Load instructor
        const instructorsMap = await instructorService.fetchInstructors(currentStudio);
        const classInstructor = instructorsMap.get(classData.InstructorId);
        if (classInstructor) {
          setInstructor(classInstructor);
        }

        // Load class style
        const stylesMap = await classStyleService.fetchClassStyles(currentStudio);
        const style = stylesMap.get(classData.ClassStyleId);
        if (style) {
          setClassStyle(style);
        }

        // Load season
        const seasonsMap = await seasonService.fetchSeasons(currentStudio);
        const classSeason = seasonsMap.get(classData.SeasonId);
        if (classSeason) {
          setSeason(classSeason);
        }

        // Load room
        const roomsMap = await studioRoomService.fetchStudioRooms(currentStudio);
        const classRoom = roomsMap.get(classData.RoomId);
        if (classRoom) {
          setRoom(classRoom);
        }

        // Load rate plans
        const ratePlansMap = await ratePlanService.fetchRatePlans(currentStudio);
        setRatePlans(ratePlansMap);
      } catch (error) {
        console.error('Error loading class details:', error);
      }
    };

    loadData();
  }, [classData, currentStudio]);

  // Separate effect for loading students and families when the students tab is activated
  useEffect(() => {
    const loadStudents = async () => {
      if (!classData?.Students?.length || !currentStudio || activeTab !== 'students') return;
      
      setLoadingStudents(true);
      try {
        const classStudents = await studentService.fetchStudentsByIds(currentStudio, classData.Students);
        setStudents(classStudents);
        
        // Load families for all students
        await familyService.fetchFamilies(currentStudio);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        setLoadingStudents(false);
      }
    };

    loadStudents();
  }, [classData?.Students, currentStudio, activeTab]);

  if (!classData) return null;

  const formatDays = (days: string[]) => {
    return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'details', label: 'Details' },
    { id: 'students', label: 'Students' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'costumes', label: 'Costumes' },
    { id: 'payment', label: 'Payment' },
    { id: 'notes', label: 'Notes' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <SectionHeader>Schedule</SectionHeader>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {formatDays(classData.Days)}
                  <br />
                  {timeUtils.formatTimeRange(classData.StartTime, classData.EndTime)}
                  <br />
                  {/* Calculate duration from start and end time */}
                  Duration: {timeUtils.calculateDurationInMinutes(classData.StartTime, classData.EndTime)} minutes
                </p>
              </div>

              <div>
                <SectionHeader>Instructor</SectionHeader>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {instructor ? instructorService.getInstructorFullName(instructor) : 'Loading...'}
                </p>
              </div>

              <div>
                <SectionHeader>Class Information</SectionHeader>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  Style: {classStyle ? classStyle.StyleName : 'Loading...'}<br />
                  Type: {classData.ClassType}<br />
                  Room: {room ? room.Name : 'Loading...'}<br />
                  Season: {season ? season.Name : 'Loading...'}
                </p>
              </div>

              <div>
                <SectionHeader>Class Size</SectionHeader>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {classData.Students?.length || 0} / {classData.MaxSize} students
                </p>
              </div>

              <div>
                <SectionHeader>Age Requirements</SectionHeader>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {classData.EnforceAgeLimit ? (
                    <>Age Range: {classData.MinAge} - {classData.MaxAge} years<br />
                    <span className="text-xs text-brand-500">(Age limit enforced)</span></>
                  ) : (
                    'No age restrictions'
                  )}
                </p>
              </div>
            </div>

            {classData.Description && (
              <div>
                <SectionHeader>Description</SectionHeader>
                <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                  {classData.Description}
                </p>
              </div>
            )}
          </div>
        );
      
      case 'students':
        return (
          <div className="min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <SectionHeader>Enrolled Students</SectionHeader>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                + Add Student
              </button>
            </div>
            
            {loadingStudents ? (
              <div className="flex h-full items-center justify-center min-h-[200px]">
                <Spinner size="md" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Age</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Family</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {studentService.getStudentFullName(student)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {student.Age}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {student.Gender}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {familyService.getFamilyName(student.FamilyId)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Link
                            ref={linkRef}
                            to={`/students/${currentStudio}/${currentUserDoc?.Uid}/${student.id}`}
                            className="hidden"
                          />
                          <button 
                            onClick={() => {
                              if (currentStudio && currentUserDoc?.Uid) {
                                onClose();
                                setTimeout(() => {
                                  linkRef.current?.click();
                                }, 0);
                              }
                            }}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    {students.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                          No students enrolled in this class
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'attendance':
        return (
          <div className="min-h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-sm font-medium text-gray-700 dark:text-gray-400">Attendance Records</h6>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Take Attendance
              </button>
            </div>
            {/* Attendance records will go here */}
            <p className="text-sm text-gray-500">Attendance tracking coming soon...</p>
          </div>
        );

      case 'costumes':
        return (
          <div className="min-h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-sm font-medium text-gray-700 dark:text-gray-400">Costume Information</h6>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                + Add Costume
              </button>
            </div>
            {/* Costume information will go here */}
            <p className="text-sm text-gray-500">Costume management coming soon...</p>
          </div>
        );

      case 'payment':
        return (
          <div className="min-h-[400px]">
            <SectionHeader>Payment Information</SectionHeader>
            <div className="space-y-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mt-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Payment Method</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {classData.PaymentMethod || 'Not set'}
                  </p>
                </div>

                {(classData.PaymentMethod === 'tuition' || classData.PaymentMethod === 'both') && (
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Rate Plan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {ratePlanService.getRatePlanName(ratePlans, classData.RatePlanId || '')}
                    </p>
                  </div>
                )}

                {(classData.PaymentMethod === 'onetime' || classData.PaymentMethod === 'both') && (
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">One Time Fee</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${classData.OneTimeFee?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="min-h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-sm font-medium text-gray-700 dark:text-gray-400">Class Notes</h6>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                + Add Note
              </button>
            </div>
            {classData.Description ? (
              <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                {classData.Description}
              </p>
            ) : (
              <p className="text-sm text-gray-500">No notes added yet.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[900px] p-0"
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-xl lg:text-2xl">
              {classData.ClassName}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {classData.ClassType}
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors
                  ${activeTab === tab.id
                    ? 'border-brand-500 text-brand-500 dark:text-brand-400 dark:border-brand-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {renderTabContent()}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(classData.ClassId)}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors rounded-lg border border-blue-200 hover:border-blue-300 dark:border-blue-900 dark:hover:border-blue-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => onDelete(classData.ClassId)}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors rounded-lg border border-red-200 hover:border-red-300 dark:border-red-900 dark:hover:border-red-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ClassDetailsModal; 