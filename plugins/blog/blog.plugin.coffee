
# Export Plugin
module.exports = (BasePlugin) ->
    class BlogPlugin extends BasePlugin

        # Plugin Name
        name: 'blog'

        # Before everything
        generateBefore: ({}, next) ->

            # Extend default template data with ability to get blog posts by directory
            @docpad.config.templateData.blogPosts = (directory, count) ->
                posts = []
                for document in @getCollection('documents').toArray()
                    if document.get('url').indexOf('/' + directory + '/') == 0 && document.private != true
                        posts.push document.toJSON()
                if typeof count == 'number' then posts[0...count] else posts

            # Done! On to the next task!
            return next?()
