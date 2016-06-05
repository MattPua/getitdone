import moment from 'moment';
import UUID from 'node-uuid';
import 'eonasdan-bootstrap-datetimepicker';
import './newItem.scss';

class NewItem extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: UUID.v4(),
      text: '',
      category: this.props.categories[0],
      status: 'incomplete'
    };
  }

  handleTextChange(event){
    this.setState({text:event.target.value});
  }

  handleCategoryChange(event){
    this.setState({category: event.target.value});
  }

  handleNewItem(event){
    event.preventDefault();
    if (this.state.text == '') return;

    let currentDate = moment().format();
    let item = {
      id: this.state.id,
      text: this.state.text,
      deadline: moment(document.querySelector('.new-item input.deadline').value),
      category: this.state.category,
      status: 'incomplete'
    };

    this.props.saveNewItem(item);
    this.setState({text: '',category: ''});
  }

  componentDidMount(){
    $(".new-item .datetimepicker").datetimepicker();
  }

  render(){
    let categories = [];
    for (let index in this.props.categories){
      categories.push(
        <option value={this.props.categories[index]}>{this.props.categories[index]}</option>
        );
    }

    return(
      <div className={"new-item " + this.props.className}>
        <div className="col-xs-12 new-item-container">
          <p>New Item</p>
          <form onSubmit={this.handleNewItem.bind(this)} className='form-inline new-item'>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Task Description" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
            </div>
            <div className="form-group">
              <select className="form-control" onChange={this.handleCategoryChange.bind(this)} value={this.state.category}>
                {categories}
              </select>
            </div>
            <div className="form-group">
              <div className="input-group date datetimepicker">
                <input type="text" className="form-control deadline"  readonly="readonly" />
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-calendar"></span>
                </span>
              </div>
            </div>
            <button className="btn primary" type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

NewItem.defaultProps={};
NewItem.propTypes={};

export default NewItem;