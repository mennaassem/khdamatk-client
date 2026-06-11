// Type declarations for React
declare module 'react' {
  export = React;
}

declare module 'react/jsx-runtime' {
  export = JSX;
}

declare namespace React {
  interface FC<P = {}> {
    (props: P): ReactElement<any, any> | null;
  }
  
  interface ReactNode {}
  interface ReactElement<P = any, T extends string | React.JSXElementConstructor<any> = string | React.JSXElementConstructor<any>> {}
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
