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
      <div className="page-header">
        <h2>Get It Done</h2>
      </div>
    );
  }
}

export default Header;