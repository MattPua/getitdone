import moment from 'moment';
import UUID from 'node-uuid';
class NewItem extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: UUID.v4(),
      text: '',
      deadline: '',
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
      deadline: ""+currentDate,
      category: this.state.category,
      status: 'incomplete'
    };

    this.props.saveNewItem(item);
    this.setState({text: '',category: ''});
  }

  render(){
    let categories = [];
    for (let index in this.props.categories){
      categories.push(
        <option value={this.props.categories[index]}>{this.props.categories[index]}</option>
        );
    }

    return(
      <form onSubmit={this.handleNewItem.bind(this)} className='form-inline'>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Task Description" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
        </div>
        <div className="form-group">
          <select className="form-control" onChange={this.handleCategoryChange.bind(this)} value={this.state.category}>
            {categories}
          </select>
        </div>
        <button class="btn" type="submit">Save</button>
      </form>
    );
  }
}

export default NewItem;