
# Export Plugin
module.exports = (BasePlugin) ->
    class MomentPlugin extends BasePlugin

        # Plugin Name
        name: 'moment'

        # After file parsing is complete
        parseAfter: ({}, next) ->

            # Dependencies
            fs = require 'fs'
            moment = require 'moment'

            # Loop documents and momentize... yes, it is a word.
            @docpad.documents.forEach (document) ->
                fileStats = fs.statSync document.get('fullPath')
                date = document.get 'date'
                dateModified = fileStats.mtime
                document.set 'moment', moment(date)
                document.set 'momentModified', moment(dateModified)

            # Done! On to the next task!
            return next?()
