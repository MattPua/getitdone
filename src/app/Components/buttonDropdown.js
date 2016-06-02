import DropDownItem from './dropDownItem';
import Button from './Button';
import 'bootstrap';

class ButtonDropdown extends React.Component{
  render(){
    let items = [];
    for (let item of this.props.items){
      items.push(
        <DropDownItem value={item} text={item} className={this.props.activeItem.toLowerCase() == item.toLowerCase() ? "active" : ''}
          handleOnClick={this.props.handleOnClick} />
      );
    }

    return(
      <div className="btn-group">
        <Button className="btn primary">{this.props.activeItem}</Button>
        <Button className="dropdown-toggle btn primary" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false">
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
        </Button>
        <ul className="dropdown-menu">
          {items}
        </ul>
      </div>
    );
  }
}

export default ButtonDropdown;