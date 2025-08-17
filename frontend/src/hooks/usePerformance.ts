
import { useEffect } from 'react';

export const usePerformance = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      if (loadTime > 100) { // Log slow components
        console.warn(`${componentName} took ${loadTime.toFixed(2)}ms to load`);
      }
    };
  }, [componentName]);
};

export const logPageLoad = (pageName: string) => {
  if (typeof window !== 'undefined' && window.performance) {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log(`${pageName} page loaded in ${loadTime}ms`);
  }
};
