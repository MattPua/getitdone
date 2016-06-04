import './button.scss';
import '../other/colours.scss';

class Button extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <button type="button"  {...this.props}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;