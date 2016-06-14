class ToggleSectionButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let text = this.props.isShown ? "-" : "+";
    return <button className="btn basic toggle pull-right rounded" type="button" onClick={this.props.toggle}>{text}</button>
      ;
  }
}

export default ToggleSectionButton;