import './pagination.scss';
class Pagination extends React.Component{
  constructor(props){
    super(props);
  }

  handlePageChange(event){
    let value = event.target.value;
    let endPage = Math.ceil(this.props.items.length / this.props.itemsPerPage);
    if (value == "+1" && this.props.currentPage < endPage){
      this.props.updateCurrentPage(parseInt(this.props.currentPage)+1);
      return;
    }
    else if (value == "-1" && this.props.currentPage > 1){
      this.props.updateCurrentPage(parseInt(this.props.currentPage)-1);
      return;
    }
    else if (value!="-1" && value!="+1")
      this.props.updateCurrentPage(value);
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
    let disabledBack = this.props.currentPage == 1 ? "disabled" : '';
    let disabledNext = this.props.currentPage == endPage ? "disabled" : '';
    if (!endPage) return [];
    pages.push(
      <button type="button" className="btn pages prev" onClick={this.handlePageChange.bind(this)} value="-1" disabled={disabledBack}> <span className="glyphicon glyphicon-menu-left" value="-1"/> </button>
    );
    while(index <= endPage){
      let className='';
      if (index == this.props.currentPage)
        className='active';
      pages.push(
        <button type="button" className={"btn pages " + className} onClick={this.handlePageChange.bind(this)} value={index}>{index}</button>
      );
      index++;
    }
    pages.push(
      <button type="button" className="btn pages next" onClick={this.handlePageChange.bind(this)} value="+1" disabled={disabledNext}> <span className="glyphicon glyphicon-menu-right" value="+1"/> </button>
    );
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
    this.props.updateCurrentPage(1);
  }

  changeNumItemsPerPage(){
    // TODO: Add all option?
    if (!this.props.items.length) return;
    return(
      <form className="form-inline items-per-page">
        <div className="form-group">
          <label for="itemsPerPage">
            Items Per Page: 
          </label>
          <select className="form-control" name="itemsPerPage" onChange={this.handleItemsPerPageChange.bind(this)} value={this.props.itemsPerPage}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
      </form>
    );
  }

  render(){


    return(
      <div className={"a-pagination " + this.props.className}> 
        <div className="pagination-container row">
          {this.numItemsDisplay()}
          {this.changeNumItemsPerPage()}
          {this.getPageNumbers()}
        </div>
        <div className="items row">
          {this.displayItems()}
        </div>
      </div>
    );
  }
}

Pagination.defaultProps={
  itemsPerPage: 4,
  className: '',
  items: []
};
Pagination.propTypes = {};

export default Pagination;