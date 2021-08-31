export default {
  table: {
    apiSetting: {
      // The field name of the current page
      pageField: 'page',
      // Each page number field name
      sizeField: 'pageSize',
      // Interface data returned by the field name
      listField: 'list',
      // Interface returns the total number of pages the field name
      totalField: 'pageCount',
    },
    //The default number of pages
    defaultPageSize: 10,
    //The swappable collection each page number
    pageSizes: [10, 20, 30, 40, 50],
  },
  upload: {
    //Considering the interface specification is different
    apiSetting: {
      // Set the field name
      infoField: 'data',
      // Picture address field name
      imgField: 'photo',
    },
    //The maximum upload the image size
    maxSize: 2,
    //Image upload type
    fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml'],
  },
};
