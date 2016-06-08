import './pagination.scss';
class Pagination extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  handlePageChange(event){
    this.setState({currentPage: event.target.value});
  }

  displayItems(){
    let currentIndex = (this.state.currentPage -1) * this.props.itemsPerPage;
    let endIndex = (this.state.currentPage)*this.props.itemsPerPage;

    let itemsToShow = this.props.items.slice(currentIndex,endIndex);
    return itemsToShow;
  }

  getPageNumbers(){
    let index = 1;
    let endPage = this.props.items.length / this.props.itemsPerPage;
    let pages = [];
    while(index <= endPage){
      let className='';
      if (index == this.state.currentPage)
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
    return(
      <div className={"pagination " + this.props.className}> 
        <div className="pagination-container col-xs-12">
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