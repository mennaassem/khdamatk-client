declare module 'react-router-dom' {
  export const BrowserRouter: any;
  export const Router: any;
  export const Routes: any;
  export const Route: any;
  export const Link: any;
  export const NavLink: any;
  export const Navigate: any;
  export const Outlet: any;
  export function useParams<T = any>(): T;
  export function useNavigate(): any;
  export function useLocation(): any;
  export function useSearchParams(): any;
  export function useMatch(pattern: any): any;
}
