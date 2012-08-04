
# Export Plugin
module.exports = (BasePlugin) ->
    class MomentPlugin extends BasePlugin

        # Plugin Name
        name: 'moment'

        # Before rendering
        renderBefore: ({collection, templateData}, next) ->

            # Dependencies
            fs = require 'fs'
            moment = require 'moment'

            # Loop documents and momentize... yes, it is a word.
            collection.forEach (document) ->
                date = document.get 'date'
                dateModified = document.get('modified') || date
                document.set 'moment', moment.utc(date)
                document.set 'momentModified', moment.utc(dateModified)

            # Done! On to the next task!
            return next?()
