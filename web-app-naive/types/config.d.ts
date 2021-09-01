export interface ProjectSettingState {
  //Navigation mode
  navMode: string;
  //Navigation style
  navTheme: string;
  //Top setting
  headerSetting: object;
  //Footage
  showFooter: boolean;
  //Menu Settings
  menuSetting: object;
  //Multi-label
  multiTabsSetting: object;
  //Bread crumbs
  crumbsSetting: object;
  //Permission mode
  permissionMode: string;
}

export interface IheaderSetting {
  bgColor: string;
  fixed: boolean;
  isReload: boolean;
}

export interface ImenuSetting {
  minMenuWidth: number;
  menuWidth: number;
  fixed: boolean;
  mixMenu: boolean;
}

export interface IcrumbsSetting {
  show: boolean;
  showIcon: boolean;
}

export interface ImultiTabsSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
}
export interface GlobConfig {
  title: string;
  apiUrl: string;
  shortName: string;
  urlPrefix?: string;
  uploadUrl?: string;
  prodMock: boolean;
  imgUrl?: string;
}

export interface GlobEnvConfig {
  // title
  VITE_GLOB_APP_TITLE: string;
  // interface address
  VITE_GLOB_API_URL: string;
  // Interface prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Image upload address
  VITE_GLOB_UPLOAD_URL?: string;
  //Picture prefix address
  VITE_GLOB_IMG_URL?: string;
  //Production environment opens Mock
  VITE_GLOB_PROD_MOCK: boolean;
}
