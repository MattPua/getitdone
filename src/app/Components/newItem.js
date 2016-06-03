import moment from 'moment';
class NewItem extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      deadline: '',
      category: '',
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
      id: Math.floor(Math.random() * 100),
      text: this.state.text,
      deadline: ""+currentDate,
      category: this.state.category,
      status: 'incomplete'
    };

    this.props.saveNewItem(item);
    this.setState({text: '',category: ''});
  }

  render(){
    return(
      <form onSubmit={this.handleNewItem.bind(this)} className='col-xs-12'>
        <input type="text" placeholder="Task Description" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
        <input type="text" placeholder="Category" value={this.state.category} onChange={this.handleCategoryChange.bind(this)} />
        <input type="submit" value="Save"/>
      </form>
    );
  }
}

export default NewItem;