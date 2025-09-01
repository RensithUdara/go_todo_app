// This is a workaround for React type issues in this project
// These declarations add missing React types

declare namespace React {
  // Add React hooks types
  function useState<T>(initialState: T | (() => T)): [T, any];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  
  // Add basic component types
  type FC<P = {}> = React.ComponentType<P>;
  type ReactNode = React.ReactElement | string | number | boolean | null | undefined;
  type ReactElement = any;
}

// Add Event types
declare namespace React {
  interface FormEvent<T = Element> {
    preventDefault(): void;
    target: T;
  }
  
  interface ChangeEvent<T = Element> {
    target: T;
    preventDefault(): void;
  }
  
  interface MouseEvent<T = Element> {
    preventDefault(): void;
    target: T;
  }
}

// Add HTML Element types
interface HTMLInputElement extends HTMLElement {
  value: string;
}

interface HTMLFormElement extends HTMLElement {
}

interface HTMLElement {
  value?: string;
}
