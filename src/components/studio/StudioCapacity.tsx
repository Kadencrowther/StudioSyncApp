import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Placeholder data
const placeholderData = {
  currentStudents: 185,
  maxCapacity: 250,
  percentageFull: 74
};

export default function StudioCapacity() {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar' as const,
      height: 220,
      background: 'transparent',
      foreColor: '#667085', // Default text color that works in both light/dark modes
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        track: {
          background: '#f2f4f7',
          dropShadow: {
            enabled: true,
            opacity: 0.15,
            blur: 3,
            left: 0,
            top: 0
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#667085',
            fontSize: '13px'
          },
          value: {
            color: '#101828',
            fontSize: '30px',
            show: true,
            formatter: function (val: number) {
              return Math.round(val) + '%';
            }
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#465fff'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Capacity']
  };

  return (
    <div className="h-full rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Studio Capacity
      </h4>

      <div className="flex flex-col items-center">
        <div className="mb-4 w-full max-w-[220px]">
          <ReactApexChart
            options={{
              ...chartOptions,
              theme: {
                mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
              }
            }}
            series={[placeholderData.percentageFull]}
            type="radialBar"
            height={220}
          />
        </div>

        <div className="mt-2 grid grid-cols-2 gap-4 w-full">
          <div className="rounded-xl border border-stroke bg-gray-50 p-4 transition-all duration-300 dark:border-gray-800 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Students</p>
            <h5 className="text-2xl font-bold text-black dark:text-white">
              {placeholderData.currentStudents}
            </h5>
          </div>
          <div className="rounded-xl border border-stroke bg-gray-50 p-4 transition-all duration-300 dark:border-gray-800 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Max Capacity</p>
            <h5 className="text-2xl font-bold text-black dark:text-white">
              {placeholderData.maxCapacity}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
} 