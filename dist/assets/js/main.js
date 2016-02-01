(function () {
  'use strict';

  function filterItem(item, filter) {

    if (filter === 'all') {
      return item;
    } else if (!filter && !item.completed) {
      return item;
    } else if (filter && item.completed) {
      return item;
    }
  };

  function completed() {
    return this.get('todo.items').filter(function (item) {
      return item.completed;
    });
  }

var helpers = Object.freeze({
    filterItem: filterItem,
    completed: completed
  });

  var IndexView = {
    el: 'main',
    template: document.querySelector('.todoapp').outerHTML,
    data: localStorage.indexData ? JSON.parse(localStorage.indexData) : { 'todo': { 'items': [], 'active': 'all' } },
    transitions: {
      select: function select(el) {
        setTimeout(function () {
          el.node.select();
        }, 0);
      }
    }
  };

  function removeAll(className) {

    [].forEach.call(document.querySelectorAll(className), function (el) {
      el.classList.remove(className.replace('.', ''));
    });
  }

  var IndexController = {

    controller: function controller() {
      var _this = this;

      removeAll('.hide');
      removeAll('.cloak');
      this.set('todo.active', 'all');
      window.addEventListener("beforeunload", function () {
        localStorage.indexData = JSON.stringify(_this.get());
      });
    },

    actions: {

      add: function add(event, inputVal) {
        if (inputVal.length) {
          this.push('todo.items', { task: inputVal });
          this.set('todo.input', '');
        }

        this.fire('lengthCheck');

        return false;
      },

      clear: function clear() {
        var items = this.get('todo.items'),
            i = items.length;
        while (i--) {
          if (items[i].completed) {
            items.splice(i, 1);
          }
        }
      },

      editFocus: function editFocus(el) {
        this.toggle(el.keypath + '.editing');
        el.node.parentNode.querySelector('.edit').focus();
        return false;
      },

      toggleChecked: function toggleChecked(event) {
        var i = this.get('todo.items').length;
        while (i--) {
          this.set('todo.items.' + i + '.completed', event.node.checked);
        }
      },

      lengthCheck: function lengthCheck() {

        this.set('todo.currentLength', this.get('todo.items').filter(function (item) {
          return item.completed !== true;
        }).length);

        this.set('todo.finishedLength', this.get('todo.items').filter(function (item) {
          return item.completed === true;
        }).length);
      }

    },

    observe: {

      '*.completed todo.items': function completed() {
        this.fire('lengthCheck');
      }

    }

  };

  var StateController = {

    controller: function controller(data) {
      this.getParent().set('todo.active', data.state === 'completed' ? true : false);
    }

  };

  // Main - init and routes
  var App = new LodeRactive({ DEBUG: false, useHistory: true, basePath: '/todomvc-app-template' });
  Ractive.defaults.data = helpers;

  App.createRoute({
    path: '/',
    controller: IndexController,
    view: IndexView
  });

  App.createRoute({
    path: '[/]:state',
    controller: StateController
  });

}());
//# sourceMappingURL=main.js.map
