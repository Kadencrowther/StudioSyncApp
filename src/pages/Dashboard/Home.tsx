import PageMeta from "../../components/common/PageMeta";
import UpcomingClasses from "../../components/studio/UpcomingClasses";
import StudioAnnouncements from "../../components/studio/StudioAnnouncements";
import StudioCapacity from "../../components/studio/StudioCapacity";
import StudioMetrics from "../../components/studio/StudioMetrics";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Studio Dashboard | Studio Sync"
        description="Studio Sync Dashboard - Manage your dance studio efficiently"
      />
      
      {/* Top Row - Capacity and Metrics */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 mb-6">
        {/* Studio Capacity Chart - Left Side */}
        <div className="col-span-12 xl:col-span-4">
          <div className="h-full flex flex-col">
            <StudioCapacity />
          </div>
        </div>

        {/* Studio Metrics Cards - Right Side */}
        <div className="col-span-12 xl:col-span-8">
          <div className="h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <StudioMetrics />
          </div>
        </div>
      </div>

      {/* Bottom Row - Upcoming Classes */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Upcoming Classes - Full Width */}
        <div className="col-span-12">
          <UpcomingClasses />
        </div>

        {/* Studio Announcements - Full Width */}
        <div className="col-span-12">
          <StudioAnnouncements />
        </div>
      </div>
    </>
  );
}
