
# Export Plugin
module.exports = (BasePlugin) ->
    class MomentPlugin extends BasePlugin

        # Plugin Name
        name: 'moment'

        # After file parsing is complete
        parseAfter: ({}, next) ->

            # Dependencies
            moment = require 'moment'

            # Loop documents and momentize... yes, it is a word.
            @docpad.documents.forEach (document) ->
                date = document.get 'date'
                document.set 'moment', moment(date)

            # Done! On to the next task!
            return next?()
