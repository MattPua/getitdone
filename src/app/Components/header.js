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
      <div className="title">
        <h2>Get It Done</h2>
        <hr/>
      </div>
    );
  }
}

export default Header;