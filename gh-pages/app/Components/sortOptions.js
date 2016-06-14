class SortOptions extends React.Component{
  constructor(props){
    super(props);
  }

  changeActiveOption(value){
    if (this.props.activeOption.toLowerCase() == value.toLowerCase()) return;

    this.props.updateActiveOption(value);

  }


  render(){
    let options = [];
    for (let option of this.props.sortOptions){
      let className = "";
      if (option.toLowerCase() == this.props.activeOption.toLowerCase()) className="active";
      options.push(
        <button type="button" className={className} text={option} value={option} handleOnClick={this.changeActiveOption.bind(this)}/>
        );
    }

    return(
      <div className="sort-options">
        {options}
      </div>
    );
  }
}


export default SortOptions;