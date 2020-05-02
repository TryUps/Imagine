jQuery.fn.extend({
    shadowRoot: function() {
       return $(this.get(0).shadowRoot)
    }
})