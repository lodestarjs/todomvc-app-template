export function removeAll(className) {

  [].forEach.call(document.querySelectorAll(className), function(el) {
      el.classList.remove(className.replace('.', ''));
  });

}