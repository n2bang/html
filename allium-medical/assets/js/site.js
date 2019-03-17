$(document).ready(function() {
  Site.run();
});

var Site = {

  handleClickIconSearch: function() {
    $(document).on('click', '.icon-search', function(e){
      e.preventDefault();
      var p = $(this).parent();
      if (!p.hasClass('menu-search-open')) {
        p.addClass('menu-search-open');
      } else {
        p.removeClass('menu-search-open');
      }
    });
  },

  setup: function() {
    this.handleClickIconSearch();
  },
  
  run: function() {
    this.setup();
  }
}