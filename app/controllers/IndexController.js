import { removeAll } from '../helpers/helpers.js';

export default {

  controller: function() {
    removeAll('.hide');
    removeAll('.cloak');
    this.set('todo.active', 'all');
    window.addEventListener("beforeunload", () =>  {
      localStorage.indexData = JSON.stringify(this.get());
    });
  },

  actions: {

    add: function( event, inputVal ) {
      if ( inputVal.length ) {
        this.push( 'todo.items', { task: inputVal } );
        this.set('todo.input', '');
      }

      this.fire('lengthCheck');

      return false;
    },

    clear: function() {
      var items = this.get('todo.items'), i = items.length;
      while ( i-- ) {
        if (items[i].completed) {
          items.splice(i, 1);
        }
      }
    },

    editFocus: function(el) {
      this.toggle(el.keypath + '.editing');
      el.node.parentNode.querySelector('.edit').focus();
      return false;
    },

    toggleChecked: function ( event ) {
      var i = this.get( 'todo.items' ).length;
      while ( i-- ) {
        this.set('todo.items.' + i + '.completed', event.node.checked);
      }
    },

    lengthCheck: function() {

      this.set('todo.currentLength', this.get('todo.items').filter(function(item) {
        return item.completed !== true;
      }).length);

      this.set('todo.finishedLength', this.get('todo.items').filter(function(item) {
        return item.completed === true;
      }).length);

    }

  },

  observe: {

    '*.completed': function() {
      this.fire('lengthCheck');
    }

  }

};