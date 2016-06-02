require('./button.scss');
require('./colours.scss');

class Button extends React.Component{
  constructor(props){
    super(props);
  }

  handleOnClick(event){
    this.props.handleOnClick(event.target.value);
  }
  handleOnDelete(event){
    this.props.handleOnDelete(event.target.value);
  }

/*  render(){
    return(
      <div className="btn-group">
        <button className={this.props.className + " btn"} onClick={this.handleOnClick.bind(this)} value={this.props.value}>
          {this.props.text}
        </button>
        <button className="delete btn" onClick={this.handleOnDelete.bind(this)} value={this.props.value}>
          X
        </button>
      </div>
    );
  }*/
  render(){
    return(
      <button type="button"  {...this.props}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;