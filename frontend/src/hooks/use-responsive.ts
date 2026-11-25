import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const gridCols = isMobile ? 2 : isTablet ? 3 : 4;
  const containerPadding = isMobile ? 14 : isTablet ? 20 : 32;
  const spacing = isMobile ? 12 : isTablet ? 16 : 20;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    gridCols,
    containerPadding,
    spacing,
  };
}
