const ServerURI = 'http://192.168.1.101:8090';

// Create Users
const CreateSiteManagerURI = `${ServerURI}/api/siteManagers/`;
const CreateProcurementManagerURI = `${ServerURI}/api/procurementManagers/`;
const CreateManagementURI = `${ServerURI}/api/management/`;
const CreateSupplierURI = `${ServerURI}/api/suppliers/`;

const GetAllSiteManagersURI = `${ServerURI}/api/siteManagers/`;
const GetAllSitesURI = `${ServerURI}/api/sites/`;
const GetAllItemsURI = `${ServerURI}/api/items/`;

export {
  ServerURI,
  CreateSiteManagerURI,
  GetAllSitesURI,
  GetAllItemsURI,
  GetAllSiteManagersURI,
  CreateProcurementManagerURI,
  CreateManagementURI,
  CreateSupplierURI,
};
