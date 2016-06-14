import FirebaseWrapper from './FirebaseWrapper';
class StorageWrapper {
  static getInitialData(storageType,state){
    if (storageType == 'cache'){
      // Check if LocalStorage "GetItDone" exists, if not , create
      if (window.localStorage.getItem("GetItDone") != null)
        return StorageWrapper.getData(storageType);
      else{
        window.localStorage.setItem("GetItDone",
          JSON.stringify(state)
        );
        return StorageWrapper.getData(storageType);
      }

    }
    else if (storageType == 'firebase'){
      FirebaseWrapper.watchNode('/',function(data){
        console.log(data);
      });
    }
    else console.error("invalid filestorage type!");
  }

  static getData(storageType){
    if (storageType=='cache'){
      let localStorage = JSON.parse(window.localStorage.getItem("GetItDone"));
      return localStorage;
    }
    else if (storageType == 'firebase'){
    }
    else console.error("invalid filestorage type!");
  }

  static saveData(storageType,state){
    if (storageType == 'cache')
      window.localStorage.setItem("GetItDone",JSON.stringify(state));
    else if (storageType == 'firebase'){
    }
    else console.error("invalid filestorage type!");
  }


}

export default StorageWrapper;