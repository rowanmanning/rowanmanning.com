(function() {

  $(function() {
    return $('body').on('click', 'a[href^="http"]', function(event) {
      var href, link, text;
      event.preventDefault();
      link = $(this);
      href = link.attr('href');
      text = link.text();
      _gaq.push(['_trackEvent', 'External Links', 'Click', href]);
      return setTimeout(function() {
        return document.location = href;
      }, 100);
    });
  });

}).call(this);
