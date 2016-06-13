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

  render(){
    let currentIndex = (this.props.currentPage -1) * this.props.itemsPerPage + 1;
    let endIndex = (this.props.currentPage)*this.props.itemsPerPage;
    endIndex = endIndex > this.props.items.length ? this.props.items.length : endIndex;

    let numItemsDisplay = this.props.items.length > 0 ? <span>Displaying items: {currentIndex} - {endIndex}</span> : '';
    return(
      <div className={"pagination " + this.props.className}> 
        <div className="pagination-container col-xs-12">
          {numItemsDisplay}
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