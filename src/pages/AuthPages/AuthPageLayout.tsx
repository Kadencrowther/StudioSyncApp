import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

interface StudioBranding {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  studioName?: string;
}

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { studioId } = useParams();
  const [studioBranding, setStudioBranding] = useState<StudioBranding | null>(null);

  useEffect(() => {
    const loadStudioBranding = async () => {
      if (!studioId) return;

      try {
        const studioRef = doc(db, 'Studios', studioId);
        const studioDoc = await getDoc(studioRef);

        if (studioDoc.exists()) {
          const data = studioDoc.data();
          setStudioBranding({
            logoUrl: data.LogoUrl,
            primaryColor: data.PrimaryColor || '#3DCED7',
            secondaryColor: data.SecondaryColor,
            studioName: data.StudioName
          });
        }
      } catch (error) {
        console.error('Error loading studio branding:', error);
      }
    };

    loadStudioBranding();
  }, [studioId]);

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div 
          className="items-center hidden w-full h-full lg:w-1/2 lg:flex relative overflow-hidden"
          style={{ 
            backgroundColor: studioBranding?.primaryColor || '#3DCED7',
          }}
        >
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)'
            }}
          />

          <div className="relative flex flex-col items-center justify-center w-full h-full z-1 px-8">
            {/* Logo Section */}
            <div className="flex flex-col items-center">
              {studioId && studioBranding?.logoUrl ? (
                <img
                  src={studioBranding.logoUrl}
                  alt={`${studioBranding.studioName || 'Studio'} Logo`}
                  className="max-w-[300px] max-h-[200px] object-contain"
                />
              ) : (
                <>
                  <img
                    src="/images/logo/studio-sync-logo.png"
                    alt="Studio Sync"
                    className="max-w-[200px] max-h-[200px] object-contain mb-6"
                  />
                  <h1 className="text-4xl font-bold text-white mt-6">
                    Studio Sync
                  </h1>
                  <p className="text-white/80 mt-2">
                    Redefining Studio Management
                  </p>
                </>
              )}
            </div>

            {/* Powered by Studio Sync */}
            <div className="absolute bottom-8 text-center">
              <p className="text-sm text-white/80">
                Powered by{' '}
                <span className="font-semibold text-white">
                  Studio Sync
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
