import {
  BuildingOffice2Icon,
  UserCircleIcon,
  CreditCardIcon as SubscriptionIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  LanguageIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  AcademicCapIcon as SkillsIcon,
  TagIcon,
  VideoCameraIcon,
  ArrowDownTrayIcon,
  CommandLineIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  BanknotesIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import { SettingsSection } from '../types/settings';
import StudioInformationModal from '../components/settings/modals/StudioInformationModal';
import SecurityModal from '../components/settings/modals/SecurityModal';
import SubscriptionBillingModal from '../components/settings/modals/SubscriptionBillingModal';
import StaffSettingsModal from '../components/settings/modals/StaffSettingsModal';
import AppearanceModal from '../components/settings/modals/AppearanceModal';
import ProfileInformationModal from '../components/settings/modals/ProfileInformationModal';
import PaymentSettingsModal from '../components/settings/modals/PaymentSettingsModal';
import PaymentProcessingModal from '../components/settings/modals/PaymentProcessingModal';
// Import other modals here...

const iconClasses = "w-6 h-6 text-gray-600 dark:text-gray-300";

export const settingsConfig: SettingsSection[] = [
  {
    section: "Business Settings",
    items: [
      {
        title: "Studio Information",
        description: "Update your studio's basic information, contact details, and business hours",
        icon: <BuildingOffice2Icon className={iconClasses} />,
        modalComponent: StudioInformationModal,
      },
      {
        title: "Staff Settings",
        description: "Manage staff roles, permissions, and access levels",
        icon: <UserGroupIcon className={iconClasses} />,
        modalComponent: StaffSettingsModal,
      },
      {
        title: "Subscriptions & Billing",
        description: "Manage your subscription plan and billing preferences",
        icon: <SubscriptionIcon className={iconClasses} />,
        modalComponent: SubscriptionBillingModal,
      },
      {
        title: "Payment Settings",
        description: "Configure general payment settings, currency, and tax rates",
        icon: <BanknotesIcon className={iconClasses} />,
        modalComponent: PaymentSettingsModal,
      },
      {
        title: "Payment Processing",
        description: "Set up payment gateways and processing configurations",
        icon: <CreditCardIcon className={iconClasses} />,
        modalComponent: PaymentProcessingModal,
      },
    ],
  },
  {
    section: "Profile Settings",
    items: [
      {
        title: "Profile Information",
        description: "Manage your personal profile and contact information",
        icon: <UserCircleIcon className={iconClasses} />,
        modalComponent: ProfileInformationModal,
      },
      {
        title: "Security",
        description: "Manage your account security and authentication settings",
        icon: <ShieldCheckIcon className={iconClasses} />,
        modalComponent: SecurityModal,
      },
    ],
  },
  {
    section: "Other Settings",
    items: [
      {
        title: "Appearance",
        description: "Customize the look and feel of your application",
        icon: <PaintBrushIcon className={iconClasses} />,
        modalComponent: AppearanceModal,
      },
      {
        title: "Language",
        description: "Set your preferred language and regional settings",
        icon: <LanguageIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with LanguageModal when created
      },
      {
        title: "Policies",
        description: "Configure studio policies and terms of service",
        icon: <DocumentTextIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with PoliciesModal when created
      },
      {
        title: "Studio Rooms",
        description: "Manage your studio rooms and facilities",
        icon: <BuildingOfficeIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with StudioRoomsModal when created
      },
      {
        title: "Skills Management",
        description: "Configure skill levels and progression tracking",
        icon: <SkillsIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with SkillsManagementModal when created
      },
      {
        title: "Tags",
        description: "Manage tags for organizing classes and content",
        icon: <TagIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with TagsModal when created
      },
      {
        title: "Videos",
        description: "Configure video storage and playback settings",
        icon: <VideoCameraIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with VideosModal when created
      },
      {
        title: "Import Data",
        description: "Import data from external sources",
        icon: <ArrowDownTrayIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with ImportDataModal when created
      },
      {
        title: "Function Logs",
        description: "View system logs and activity history",
        icon: <CommandLineIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with FunctionLogsModal when created
      },
      {
        title: "Support",
        description: "Get help and contact support",
        icon: <QuestionMarkCircleIcon className={iconClasses} />,
        modalComponent: AppearanceModal, // Replace with SupportModal when created
      },
    ],
  },
]; 