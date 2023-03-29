export interface NavbarSmallLinkData {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}
export interface NavbarLinkData {
  icon: React.FC<any>;
  label: string;
  link: string;
}
