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
    let cloneDate = Moment(this.state.date);
    let startDate = cloneDate.startOf('month').format('ddd');
    let numDays = cloneDate.endOf('month').date();
    let currentDay = 1;
    let beginCounting = false;
    let value = '';
    for (let i =0;i< 5;i ++){
      for (let j = 0; j < 7;j++){
        if (!beginCounting && this.state.days[j].toLowerCase() == startDate.toLowerCase()){
          value = currentDay++;
          beginCounting = true;
        }
        else if (beginCounting)
          value=currentDay++;

        if (numDays < currentDay -1) value =''; 

        days[i].push(
          <td className="day">{value}</td>
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
          <span className="prev">{'<'}</span>
          <div className="month-year">
            <div>{this.state.date.format("MMMM")}</div>
            <div>{this.state.date.format("YYYY")}</div>
          </div>
          <span className="next">{'>'}</span>
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
          </tbody>
        </table>
      </div>
    );
  }




}

export default Calendar;