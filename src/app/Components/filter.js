import UUID from 'node-uuid';
import ButtonDropDown from './buttonDropDown';
require('./filter.scss');

class Filter extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let categories = [];

    //TODO: PREVENT DELETING 'ALL' FILTER
/*    for (let category of this.props.categories){
      let className = "";
      if (category.toLowerCase() == this.props.activeCategory.toLowerCase()) className="active";
      categories.push(
        <Button key={UUID.v4()} className={className} text={category} value={category}
          handleOnClick={this.changeActiveFilter.bind(this)}
          handleOnDelete={this.deleteFilter.bind(this)}
        />
        );
    }*/

    return(
      <div className="filter">
        <ButtonDropDown items={this.props.categories} activeItem={this.props.activeCategory} 
          handleOnClick={this.props.updateActiveCategory}/>
      </div>
    );
  }
}


export default Filter;