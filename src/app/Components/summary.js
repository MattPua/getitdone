import Moment from 'moment';
import './summary.scss';
import Item from './item';
import Header from './header';
class Summary extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      datetime: Moment()
    };
    let that = this;
  }

  componentDidMount(){
    this.startTimeUpdater();
  }

  startTimeUpdater(){
    let that = this;
    setInterval(function(){
      that.setState({datetime: Moment()});
    },60000);
  }

  getSummaryDetails(){
    let items = this.props.items;
    let dueToday = [];
    let overDueItems = [];
    let dueThisWeek = [];
    let nextDue = null;
    let itemsDue = [];
    for (let item of items){
      if (item.status == 'complete') continue;
      if (Item.isDueOn(this.state.datetime,item.deadline,'day'))
        dueToday.push(item);
      if (Item.isDueOn(this.state.datetime,item.deadline,'week'))
        dueThisWeek.push(item);
      if (Item.isOverdue(this.state.datetime,item.deadline))
        overDueItems.push(item);
      if (nextDue == null)
        nextDue = item;
      else
        nextDue = Moment(nextDue.deadline).isAfter(Moment(item.deadline)) ? item : nextDue;
      itemsDue.push(item);
    }
    nextDue = nextDue!=null ?  [
      <p>Your next item is:</p>,
      <Item className="col-xs-12" id={nextDue.id} text={nextDue.text} deadline={nextDue.deadline} category={nextDue.category} key={nextDue.id} status={nextDue.status}
        categories={this.props.categories}
        deleteItem={this.props.deleteItem}
        editItem={this.props.editItem}
      /> ] : '';
    let dueTodayText = dueToday.length > 0 ? <li className="tag due-today">{dueToday.length} items due today</li> : '';
    let dueThisWeekText = dueThisWeek.length > 0 ? <li className="tag due-week">{dueThisWeek.length} items due this week</li> : '';
    let overDueText = overDueItems.length>0 ? <li className="tag overdue">{overDueItems.length} items overdue</li> : '';
    return(
      <div className="summary-details">
        <p className="total-due">You have {itemsDue.length} items due:</p>
        <ul>
          {dueTodayText}
          {dueThisWeekText}
          {overDueText}
        </ul>
        {nextDue}        


      </div>
    );
  }

  render(){
    return(
      <div className={"summary " + this.props.className}>
        <div className="summary-container col-xs-12">
          <Header text="Get It Done" className="col-xs-12"/>
          <p className="time">{this.state.datetime.format("hh:mm A")}</p>
          <p className="date">{this.state.datetime.format("dddd MMMM Do, YYYY")}</p>
          <br/>
          {this.getSummaryDetails()}
        </div>
      </div>
      );
  }
}
Summary.defaultProps = {
};
Summary.propTypes={};

export default Summary;