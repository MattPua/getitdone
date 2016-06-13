import './pagination.scss';
class Pagination extends React.Component{
  constructor(props){
    super(props);
  }

  handlePageChange(event){
    this.props.updateCurrentPage(event.target.value);
  }

  displayItems(){
    let currentIndex = (this.props.currentPage -1) * this.props.itemsPerPage;
    let endIndex = (this.props.currentPage)*this.props.itemsPerPage;

    let itemsToShow = this.props.items.slice(currentIndex,endIndex);
    return itemsToShow;
  }

  getPageNumbers(){
    let index = 1;
    let endPage = Math.ceil(this.props.items.length / this.props.itemsPerPage);
    let pages = [];
    while(index <= endPage){
      let className='';
      if (index == this.props.currentPage)
        className='active';
      pages.push(
        <button type="button" className={"btn pages " + className} onClick={this.handlePageChange.bind(this)} value={index}>{index}</button>
      );
      index++;
    }
    pages.reverse();

    return pages;
  }

  numItemsDisplay(){
    let currentIndex = (this.props.currentPage -1) * this.props.itemsPerPage + 1;
    let endIndex = (this.props.currentPage)*this.props.itemsPerPage;
    endIndex = endIndex > this.props.items.length ? this.props.items.length : endIndex;

    let numItemsDisplay = this.props.items.length > 0 ? <span>Items: {currentIndex} - {endIndex}</span> : '';
    return numItemsDisplay;
  }

  handleItemsPerPageChange(event){
    this.props.changeNumberItemsPerPage(event.target.value);
  }

  changeNumItemsPerPage(){
    return(
      <form className="form-inline items-per-page">
        <div className="form-group">
          <label for="itemsPerPage">
            Items Per Page: 
          </label>
          <select className="form-control" name="itemsPerPage" onChange={this.handleItemsPerPageChange.bind(this)} value={this.props.itemsPerPage}>
            <option value={1}>1</option>
            <option value={3}>4</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </form>
    );
  }

  render(){


    return(
      <div className={"pagination " + this.props.className}> 
        <div className="pagination-container">
          {this.numItemsDisplay()}
          {this.changeNumItemsPerPage()}
          {this.getPageNumbers()}
        </div>
        <div className="items">
          {this.displayItems()}
        </div>
      </div>
    );
  }
}

Pagination.defaultProps={
  itemsPerPage: 5,
  className: '',
  items: []
};
Pagination.propTypes = {};

export default Pagination;