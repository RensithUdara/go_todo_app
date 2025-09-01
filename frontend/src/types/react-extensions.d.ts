import React from 'react';

declare module 'react' {
  function useState<T>(initialState: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>];
  function useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  
  interface Dispatch<A> {
    (value: A): void;
  }
  
  type SetStateAction<S> = S | ((prevState: S) => S);
  type EffectCallback = () => void | (() => void);
  type DependencyList = ReadonlyArray<any>;

  interface FC<P = {}> {
    (props: P): React.ReactElement | null;
  }
}
