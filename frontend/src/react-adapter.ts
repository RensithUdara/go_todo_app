// This file provides compatibility for React hooks with strict TypeScript

import * as React from 'react';

// Re-export all of React's public API
export * from 'react';

// Extend React with custom hooks
export const useState: typeof React.useState = React.useState;
export const useEffect: typeof React.useEffect = React.useEffect;

// Default export for React
export default React;
