export default {
  el: 'main',
  template: document.querySelector('.todoapp').outerHTML,
  data: localStorage.indexData ? JSON.parse(localStorage.indexData) : { 'todo': { 'items': [], 'active': 'all' } },
  transitions: {
    select: function ( el ) {
      setTimeout( function () {
        el.node.select()
      }, 0 );
    }
  }
}