import firebase from 'firebase';

class ExternalScripts extends React.Component {
  componentDidMount(){
    let config = {
      apiKey: "AIzaSyCP6kSnQR7RS2JQF4xIPiaoAHmPxOfv7eA",
      authDomain: "getitdone-fb729.firebaseapp.com",
      databaseURL: "https://getitdone-fb729.firebaseio.com",
      storageBucket: "getitdone-fb729.appspot.com",
    };
    // Initialize Firebase
    firebase.initializeApp(config);
    var database = firebase.database();
  }

  render(){

    return(
      <div>
        <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>
        <script>

        </script>
      </div>
    );
  }
}


export default ExternalScripts;