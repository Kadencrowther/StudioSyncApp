import { ReactNode } from 'react';

export interface SettingsModalProps {
  onClose: () => void;
}

export interface SettingDetails {
  title: string;
  description: string;
  icon: ReactNode;
  modalComponent: React.ComponentType<SettingsModalProps>;
}

export interface SettingsSection {
  section: string;
  items: SettingDetails[];
} 