require('./header.scss');

class Header extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className={"page-head " + this.props.className}>
        <h1 class='col-xs-12'>Get It Done</h1>
      </div>
    );
  }
}

export default Header;