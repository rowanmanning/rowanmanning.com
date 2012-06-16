
# Track external link clicks
$ ->
  $('body').on 'click', 'a[href^="http"]', (event) ->
    event.preventDefault()

    # Get link details
    link = $ this
    href = link.attr 'href'
    text = link.text()

    # Track event
    _gaq.push ['_trackEvent', 'External Links', 'Click', href]
    setTimeout ->
      document.location = href
    , 100
