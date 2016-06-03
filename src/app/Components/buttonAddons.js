class ButtonAddons extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
  }

  onChange(event){
    this.setState({value: event.target.value});
  }

  onClick(event){
    this.props.onClick(this.state.value);

    this.setState({value: ''});
  }

  render(){
    return(
      <div class="input-group">
        <input type="text" class="form-control" placeholder={this.props.placeholder} onChange={this.onChange.bind(this)} value={this.state.value} />
        <span class="input-group-btn">
          <button class="btn" type="button" onClick={this.onClick.bind(this)}>{this.props.text}</button>
        </span>
      </div>
    );
  }
}

export default ButtonAddons;