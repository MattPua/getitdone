import Moment from 'moment';
require ('./calendar.scss');

class Calendar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view: {default: 'month'},
      date: Moment(),
      days: ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat']
    }
  }
  getDayNames(){
    let dayNames = [];
    for(let day of this.state.days)
      dayNames.push(<th className="day-name">{day}</th>);

    return dayNames;
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
        if (startDate.isAfter(Moment(this.state.date).endOf('month'))) {
          break;        
        }
        if (startDate.isSame(todaysDate,'day') ) className="today";
        if (!beginCounting && j == startDate.day())
          beginCounting = true;

        if (beginCounting){
          value=startDate.date();
          startDate.add(1,'day');
        }
        else value = '';

        days[i].push(
          <td className={"day " + className}>{value}</td>
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

  render(){
    let dayNames = this.getDayNames()
    let days = this.getDays();
    return(
      <div className={"calendar-container " +this.props.className} >
        <div className="month-year-container col-xs-12">
          <div className="month-action">
            <span className="prev action" onClick={this.prevMonth.bind(this)}>{'<'}</span>
          </div>
          <div className="month-year">
            <div>{this.state.date.format("MMMM")}</div>
            <div>{this.state.date.format("YYYY")}</div>
          </div>
          <div className="month-action">
            <span className="next action" onClick={this.nextMonth.bind(this)}>{'>'}</span>
          </div>
        </div>
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

export default Calendar;