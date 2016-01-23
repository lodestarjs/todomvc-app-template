export function filterItem(item, filter) {

  if ( filter === 'all' ) {
    return item;
  } else if ( !filter && !item.completed ) {
    return item;
  } else if ( filter && item.completed ) {
    return item;
  }

};

export function completed() {
  return this.get('todo.items').filter(function( item ) {
    return item.completed;
  });
}