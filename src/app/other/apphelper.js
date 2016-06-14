class AppHelper{
  static notInitialized(){
    console.error('[INIT ERROR] IS NOT INITIALIZED!');
  }

  static toUpperOne(word){
    return word[0].toUpperCase() + word.substring(1,word.length);
  }

}

export default AppHelper;