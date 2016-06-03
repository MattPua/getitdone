import ReactDOM from 'react-dom';
import Header from './Components/header';
import List from './Components/list';

import './Components/general.scss';

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
        <Header/>
        <List/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));