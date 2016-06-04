import ReactDOM from 'react-dom';
import Header from './Components/header';
import List from './Components/list';
import Calendar from './Components/calendar';
import './other/general.scss';
import './other/font.scss';

class App extends React.Component{
  constructor(props){
    super(props);
    console.log(window.localStorage.getItem('GetItDone'));
  }

  shouldComponentUpdate(nextProps,nextState){
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <Header className="col-xs-12"/>
          <List className="col-xs-12"/>
          <Calendar className="col-xs-12"/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));