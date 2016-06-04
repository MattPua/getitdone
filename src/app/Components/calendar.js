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
      dayNames.push(<div className="day-name">{day}</div>);

    return dayNames;
  }

  render(){
    let dayNames = this.getDayNames()

    return(
      <div className={"calendar-container " +this.props.className} >
        <div className="month-year-container col-xs-12">
          <div className="month-year">
            <div>{this.state.date.format("MMMM")}</div>
            <div>{this.state.date.format("YYYY")}</div>
          </div>
        </div>
        <div className="day-container col-xs-12">
          <div className="day-names">
            {dayNames}
          </div>
          <div className="days col-xs-12">
            <div className="week row">{}</div>
            <div className="week row">{}</div>
            <div className="week row">{}</div>
            <div className="week row">{}</div>
            <div className="week row">{}</div>
          </div>
        </div>
      </div>
    );
  }




}

export default Calendar;