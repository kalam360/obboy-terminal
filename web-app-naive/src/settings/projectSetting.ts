const setting = {
  //Vertical navigation mode model horizontal top menu on the left side of the menu
  navMode: 'vertical',
  //Dark dark sidebar navigation style light white sidebar header - dark dark top bar
  navTheme: 'dark',
  //At the top of the
  headerSetting: {
    //The background color
    bgColor: '#fff',
    //Fixed at the top of the
    fixed: true,
    //According to reload button
    isReload: true,
  },
  //The footer
  showFooter: true,
  //More labels
  multiTabsSetting: {
    //The background color
    bgColor: '#fff',
    //Whether or not shown
    show: true,
    //More than a fixed label
    fixed: true,
  },
  //The menu
  menuSetting: {
    //Minimum width
    minMenuWidth: 64,
    //The width of the menu
    menuWidth: 200,
    //Fixed menu
    fixed: true,
    //Split the menu
    mixMenu: false,
  },
  //Bread crumbs
  crumbsSetting: {
    //Whether or not shown
    show: true,
    //Display icon
    showIcon: false,
  },
  //Menu access mode FIXED front FIXED routing dynamic get BACK
  permissionMode: 'FIXED',
  //Whether open routing animation
  isPageAnimate: true,
  //Routing animation types
  pageAnimateType: 'zoom-fade',
};
export default setting;
