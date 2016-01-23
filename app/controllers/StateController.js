export default {

  controller: function( data ) {
    this.getParent().set('todo.active', data.state === 'completed' ? true : false);
  }

};