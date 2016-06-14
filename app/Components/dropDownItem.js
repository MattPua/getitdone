class DropDownItem extends React.Component{
  constructor(props){
    super(props);
  }

  handleOnClick(event){
    event.preventDefault();
    this.props.handleOnClick(event.target.value);
  }

  render(){
    return(
      <li className={this.props.className}
        onClick={this.handleOnClick.bind(this)}>
        <a href="#" value={this.props.value}>{this.props.text}</a>
      </li>
    );
  }

}

export default DropDownItem;