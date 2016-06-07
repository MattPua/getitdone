import Moment from 'moment';
require ('./calendar.scss');

class Calendar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: Moment(),
      days: ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'],
      viewMode: 'month'
    }
  }
  getDayNames(){
    let dayNames = [];
    for(let day of this.state.days)
      dayNames.push(<th className="day-name">{day}</th>);

    return dayNames;
  }

  getItemsDueOnDay(day,items){
    let count = 0;
    for (let item of items){
      if (Moment(item.deadline).isSame(day,'day'))
        count++;
    }
    return count;
  }
  // TODO: Combine these two together
  getItemsDueOnMonth(month,items){
    let count = 0;
    for (let item of items){
      if (Moment(item.deadline).isSame(month,'month'))
        count++;
    }
    return count++;
  }

  getDays(){
    // TODO: Looks pretty ugly
    let days = [ [],[],[],[],[],[]];
    let todaysDate = Moment();
    let startDate = Moment(this.state.date).startOf('month');
    let numDays = Moment(this.state.date).endOf('month').date();
    let beginCounting = false;
    for (let i =0;i< 6;i ++){
      for (let j = 0; j < 7;j++){
        let className = "";
        let value = '';
        let numDue = 0;
        if (startDate.isAfter(Moment(this.state.date).endOf('month'))) {
          break;        
        }
        // TODO: Maybe make all this className stuff into a function
        if (startDate.isSame(todaysDate,'day') ) className+=" today";
        else if (startDate.isBefore(todaysDate,'day'))
          className+= " past-due"
        else if (startDate.isBetween(todaysDate,Moment().add(3,'days')))
          className+=" almost-due"
        if (!beginCounting && j == startDate.day())
          beginCounting = true;

        if (beginCounting){
          value=startDate.date();
          numDue = this.getItemsDueOnDay(startDate,this.props.items);
          startDate.add(1,'day');
        }
        else value = '';
        days[i].push(
          <td className={"day " + className}>{value}
            <span className={numDue>0 ? "count" : ''}>{numDue>0 ? numDue: ''}</span>
          </td>
        );
      }
      if (startDate.isAfter(Moment(this.state.date).endOf('month'))) break;
    }

    return days;
  }

  nextMonth(){
    let date = this.state.date.add(1,'month').startOf('month');
    this.setState({date: date});
  }

  prevMonth(){
    let date = this.state.date.subtract(1,'month').startOf('month');
    this.setState({date: date});
  }

  switchViewMode(event){
    this.setState({viewMode: event.target.value});
  }

  getViewButtons(){
    return(
      <div className="btn-group">
        <button className={"btn "} type="button" value="month" onClick={this.switchViewMode}>MONTH</button>
        <button className={"btn "} type="button" value="day" onClick={this.switchViewMode}>DAY</button>
      </div>
    );
  }
  getMonthContainer(){
    let viewButtons = this.getViewButtons();
    let numDue = this.getItemsDueOnMonth(Moment(this.state.date),this.props.items);
    return(
      <div className="month-year-container col-xs-12">
        <div className="month-action">
          <span className="prev action" onClick={this.prevMonth.bind(this)}>{'<'}</span>
        </div>
        <div className="month-year">
          <div>{this.state.date.format("MMMM")}</div>
          <div>{this.state.date.format("YYYY")}</div>
          <span className={numDue>0 ? "count" : ''}>{numDue>0 ? numDue: ''}</span>
        </div>
        <div className="month-action">
          <span className="next action" onClick={this.nextMonth.bind(this)}>{'>'}</span>
        </div>
        {viewButtons}
      </div>
    );
  }
  render(){
    let dayNames = this.getDayNames()
    let days = this.getDays();
    let month = this.getMonthContainer();
    return(
      <div className={"calendar-container " +this.props.className} >
        {month}
        <table className="day-container col-xs-12">
          <thead className="day-names">
            <tr>
              {dayNames}
            </tr>
          </thead>
          <tbody>
            <tr className="week row">{days[0]}</tr>
            <tr className="week row">{days[1]}</tr>
            <tr className="week row">{days[2]}</tr>
            <tr className="week row">{days[3]}</tr>
            <tr className="week row">{days[4]}</tr>
            <tr className="week row">{days[5]}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Calendar.defaultProps = {
  items: [],
  className: '',
  viewMode: 'month'
};
Calendar.propTypes ={
  items: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  viewMode: React.PropTypes.string
};

export default Calendar;