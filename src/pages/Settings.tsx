import React, { useState, useMemo } from 'react';
import SettingsCard from '../components/settings/SettingsCard';
import SettingsSection from '../components/settings/SettingsSection';
import SettingsSearch from '../components/settings/SettingsSearch';
import { Modal } from '../components/ui/modal';
import { useModal } from '../hooks/useModal';
import { settingsConfig } from '../config/settingsConfig';
import { SettingDetails } from '../types/settings';

const Settings: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedSetting, setSelectedSetting] = useState<SettingDetails | null>(null);

  const handleSettingClick = (setting: SettingDetails) => {
    setSelectedSetting(setting);
    openModal();
  };

  // Filter settings based on search query
  const filteredSettings = useMemo(() => {
    if (!searchQuery) return settingsConfig;

    const query = searchQuery.toLowerCase();
    return settingsConfig.map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      ),
    })).filter(section => section.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <SettingsSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search settings..."
        />
      </div>

      {filteredSettings.map((section) => (
        <SettingsSection
          key={section.section}
          title={section.section}
          description={section.items.length === 0 ? "No matching settings found" : undefined}
        >
          {section.items.map((item, itemIndex) => (
            <SettingsCard
              key={`${section.section}-${itemIndex}`}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onClick={() => handleSettingClick(item)}
            />
          ))}
        </SettingsSection>
      ))}

      {filteredSettings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No settings match your search
          </p>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        {selectedSetting && (
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {selectedSetting.icon}
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                    {selectedSetting.title}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedSetting.description}
                  </p>
                </div>
              </div>
              <selectedSetting.modalComponent onClose={closeModal} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Settings; 