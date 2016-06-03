import React from 'react';

require('./header.scss');

class Header extends React.Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

  render(){
    return(
      <div className="page-header row">
        <h2 class='col-xs-12'>Get It Done</h2>
      </div>
    );
  }
}

export default Header;