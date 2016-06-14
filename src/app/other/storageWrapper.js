import FirebaseWrapper from './FirebaseWrapper';
import C from './../other/_constants';
class StorageWrapper {
  static getInitialData(storageType,state,callback){
    if (storageType == C.FileStorageType.CACHE){
      // Check if LocalStorage C.APPNAME exists, if not , create
      if (window.localStorage.getItem(C.APPNAME) != null){
        let data= StorageWrapper.getData(storageType);
        callback(data);
      }
      else
        window.localStorage.setItem(C.APPNAME,
          JSON.stringify(state)
        );
    }
    else if (storageType == C.FileStorageType.FIREBASE){
      FirebaseWrapper.watchNode('/',function(data){
        callback(data);
        console.log(data);
      });
    }
    else console.error("invalid filestorage type!");
  }

  static getData(storageType){
    if (storageType==C.FileStorageType.CACHE){
      let localStorage = JSON.parse(window.localStorage.getItem(C.APPNAME));
      return localStorage;
    }
    else if (storageType == C.FileStorageType.FIREBASE){
    }
    else console.error("invalid filestorage type!");
  }

  static saveData(storageType,state){
    if (storageType == C.FileStorageType.CACHE)
      window.localStorage.setItem(C.APPNAME,JSON.stringify(state));
    else if (storageType == C.FileStorageType.FIREBASE){
    }
    else console.error("invalid filestorage type!");
  }


}

export default StorageWrapper;