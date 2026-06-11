// Complete type definitions for all dependencies
export interface React {}
export interface ReactDOM {}

declare module 'react' {
  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prev: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T>(initialValue: T): { current: T };
  export function useContext<T>(context: any): T;
  export function useReducer(reducer: any, initialState: any): any;
  export function useCallback(callback: any, deps: any[]): any;
  export function useMemo(factory: any, deps: any[]): any;
  export const FC: any;
  export const ReactElement: any;
  export const ReactNode: any;
  export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  export interface SyntheticEvent {}
  export interface ChangeEvent<T = HTMLInputElement> {
    target: T & { value: string };
  }
  export * from 'react';
}

declare module 'react/jsx-runtime' {
  export = JSX;
}

declare module '@mui/material' {
  export * from '@mui/material';
}

declare module '@mui/material/styles' {
  export * from '@mui/material/styles';
}

declare module '@mui/icons-material' {
  export * from '@mui/icons-material';
}

declare module 'react-router-dom' {
  export * from 'react-router-dom';
}

declare module 'react-hook-form' {
  export * from 'react-hook-form';
}

declare module 'axios' {
  export * from 'axios';
}

declare namespace React {
  interface FC<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    displayName?: string;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
  }
  
  interface ReactNode {}
  interface ReactElement<P = any, T extends string | React.JSXElementConstructor<any> = string | React.JSXElementConstructor<any>> {}
  interface PropsWithChildren<P = {}> {
    children?: ReactNode;
  }
  
  interface SyntheticEvent {}
  interface ChangeEvent<T = HTMLInputElement> {
    target: T & { value: string };
  }
  
  type SetStateAction<S> = S | ((prevState: S) => S);
  type Dispatch<A> = (value: A) => void;
  
  function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  
  function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  function useRef<T>(initialValue: T): MutableRefObject<T>;
  function useRef<T>(initialValue: T | null): RefObject<T>;
  
  type EffectCallback = () => void | (() => void | undefined);
  type DependencyList = ReadonlyArray<any>;
  
  interface MutableRefObject<T> {
    current: T;
  }
  
  interface RefObject<T> {
    readonly current: T | null;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element {}
}
