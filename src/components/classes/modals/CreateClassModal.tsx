import React, { useState, useEffect } from 'react';
import { Modal } from '../../ui/modal';
import { NewClassData } from '../../../types/class.types';
import { useUserStore } from '../../../store/useUserStore';
import { classStyleService, ClassStyle } from '../../../services/classStyleService';
import { seasonService, Season } from '../../../services/seasonService';
import { studioRoomService, StudioRoom } from '../../../services/studioRoomService';
import { instructorService, Instructor } from '../../../services/instructorService';
import { ratePlanService, RatePlan } from '../../../services/ratePlanService';
import { BasicClassInfo } from '../forms/BasicClassInfo';
import { PaymentMethodSelector, PaymentMethod } from '../forms/PaymentMethodSelector';
import { RatePlanSelector } from '../forms/RatePlanSelector';
import { FeeInput } from '../forms/FeeInput';
import { AgeRestrictionSection } from '../forms/AgeRestrictionSection';

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (classData: NewClassData) => Promise<void>;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<NewClassData>({
    ClassName: '',
    ClassType: 'Regular',
    Days: [],
    StartTime: '',
    EndTime: '',
    MaxSize: 20,
    EnforceAgeLimit: false,
    MinAge: 0,
    MaxAge: 99,
    Description: '',
    InstructorId: '',
    ClassStyleId: '',
    SeasonId: '',
    RoomId: '',
    PaymentMethod: undefined,
    RatePlanId: '',
    OneTimeFee: 0,
    Students: [], // Initialize empty students array
  });

  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [classStyles, setClassStyles] = useState<ClassStyle[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [rooms, setRooms] = useState<StudioRoom[]>([]);
  const [ratePlans, setRatePlans] = useState<RatePlan[]>([]);
  const [loading, setLoading] = useState(false);
  const currentStudio = useUserStore(state => state.currentStudio);

  useEffect(() => {
    const loadData = async () => {
      if (!currentStudio) return;
      
      try {
        const instructorsMap = await instructorService.fetchInstructors(currentStudio);
        setInstructors(Array.from(instructorsMap.values()));

        const stylesMap = await classStyleService.fetchClassStyles(currentStudio);
        setClassStyles(Array.from(stylesMap.values()));

        const seasonsMap = await seasonService.fetchSeasons(currentStudio);
        setSeasons(Array.from(seasonsMap.values()));

        const roomsMap = await studioRoomService.fetchStudioRooms(currentStudio);
        setRooms(Array.from(roomsMap.values()));

        const ratePlansMap = await ratePlanService.fetchRatePlans(currentStudio);
        setRatePlans(Array.from(ratePlansMap.values()));
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    loadData();
  }, [currentStudio]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
      setFormData({
        ClassName: '',
        ClassType: 'Regular',
        Days: [],
        StartTime: '',
        EndTime: '',
        MaxSize: 20,
        EnforceAgeLimit: false,
        MinAge: 0,
        MaxAge: 99,
        Description: '',
        InstructorId: '',
        ClassStyleId: '',
        SeasonId: '',
        RoomId: '',
        PaymentMethod: undefined,
        RatePlanId: '',
        OneTimeFee: 0,
        Students: [], // Reset students array
      });
    } catch (error) {
      console.error('Error creating class:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    name: keyof NewClassData,
    value: string | number | boolean | string[] | PaymentMethod
  ) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBasicInfoChange = (
    name: string,
    value: string | number | string[]
  ) => {
    handleInputChange(name as keyof NewClassData, value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[800px] p-6 lg:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Create New Class
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fill in the details below to create a new class.
          </p>
        </div>

        <BasicClassInfo
          className={formData.ClassName || ''}
          classType={formData.ClassType || 'Regular'}
          days={formData.Days || []}
          startTime={formData.StartTime || ''}
          endTime={formData.EndTime || ''}
          maxSize={formData.MaxSize || 20}
          instructorId={formData.InstructorId || ''}
          classStyleId={formData.ClassStyleId || ''}
          seasonId={formData.SeasonId || ''}
          roomId={formData.RoomId || ''}
          onInputChange={handleBasicInfoChange}
          instructors={instructors}
          classStyles={classStyles}
          seasons={seasons}
          rooms={rooms}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <PaymentMethodSelector
            value={formData.PaymentMethod}
            onChange={(value) => handleInputChange('PaymentMethod', value)}
          />

          {(formData.PaymentMethod === 'tuition' || formData.PaymentMethod === 'both') && (
            <RatePlanSelector
              value={formData.RatePlanId || ''}
              onChange={(value) => handleInputChange('RatePlanId', value)}
              ratePlans={ratePlans}
              required={formData.PaymentMethod === 'tuition' || formData.PaymentMethod === 'both'}
            />
          )}

          {(formData.PaymentMethod === 'onetime' || formData.PaymentMethod === 'both') && (
            <FeeInput
              value={formData.OneTimeFee || 0}
              onChange={(value) => handleInputChange('OneTimeFee', value)}
              required={formData.PaymentMethod === 'onetime' || formData.PaymentMethod === 'both'}
            />
          )}
        </div>

        <AgeRestrictionSection
          enforceAgeLimit={formData.EnforceAgeLimit || false}
          minAge={formData.MinAge || 0}
          maxAge={formData.MaxAge || 99}
          onEnforceChange={(value) => handleInputChange('EnforceAgeLimit', value)}
          onMinAgeChange={(value) => handleInputChange('MinAge', value)}
          onMaxAgeChange={(value) => handleInputChange('MaxAge', value)}
        />

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Description
          </label>
          <textarea
            value={formData.Description || ''}
            onChange={(e) => handleInputChange('Description', e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition-colors duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-brand-400 dark:hover:bg-brand-500 transition-colors duration-200"
          >
            {loading ? 'Creating...' : 'Create Class'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateClassModal; 