import DropDownItem from './dropDownItem';
import AppHelper from '../other/AppHelper';
import 'bootstrap';
class ButtonDropdown extends React.Component{
  render(){
    let items = [];
    for (let item of this.props.items){
      items.push(
        <DropDownItem value={item} text={AppHelper.toUpperOne(item)} className={this.props.activeItem.toLowerCase() == item.toLowerCase() ? "active" : ''}
          handleOnClick={this.props.handleOnClick} />
      );
    }
    return(
      <div className="btn-group">
        <button type="button" className="btn">{AppHelper.toUpperOne(this.props.activeItem)}</button>
        <button type="button" className="dropdown-toggle btn" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false">
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
          {items}
        </ul>
      </div>
    );
  }
}
ButtonDropdown.defaultProps={};
ButtonDropdown.propTypes={};

export default ButtonDropdown;