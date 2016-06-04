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
    let days = [ [],[],[],[],[] ];
    for (let i =0;i< 5;i ++){
      for (let j = 0; j < 7;j++){
        days[i].push(
          <td className="day">{i}{j}</td>
        );
      }
    }

    return days;
  }

  render(){
    let dayNames = this.getDayNames()
    let days = this.getDays();
    return(
      <div className={"calendar-container " +this.props.className} >
        <div className="month-year-container col-xs-12">
          <div className="month-year">
            <div>{this.state.date.format("MMMM")}</div>
            <div>{this.state.date.format("YYYY")}</div>
          </div>
        </div>
        <table className="day-container col-xs-12">
          <tr className="day-names">
            {dayNames}
          </tr>
          <tr className="week row">{days[0]}</tr>
          <tr className="week row">{days[1]}</tr>
          <tr className="week row">{days[2]}</tr>
          <tr className="week row">{days[3]}</tr>
          <tr className="week row">{days[4]}</tr>
        </table>
      </div>
    );
  }




}

export default Calendar;