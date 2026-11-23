// This file provides compatibility for React hooks with strict TypeScript

import * as React from 'react';

// Extend React with custom hooks
export const useState = React.useState;
export const useEffect = React.useEffect;
export const useRef = React.useRef;
export const createElement = React.createElement;
export const Fragment = React.Fragment;

// Types
export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

// Default export for React
export default React;
