import { useState, useEffect } from 'react';
import { isMobile as isMobileComplete } from 'react-device-detect';

export default function useDeviceDetect(): { isMobile: boolean } {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (typeof isMobileComplete !== 'undefined') setMobile(isMobileComplete);
    const userAgent = navigator?.userAgent;
    const mobile =
      !userAgent ||
      Boolean(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
          userAgent,
        ),
      );
    setMobile(mobile);
  }, []);

  return { isMobile };
}
