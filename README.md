
# Rowan's Website

The source code for [rowanmanning.com](https://rowanmanning.com/).


## Running locally

  1. Install [Hugo](https://gohugo.io/) (>= 0.97.3) and [Node.js](https://nodejs.org/)

  2. Clone this repo locally:

     ```bash
     git clone https://github.com/rowanmanning/rowanmanning.com.git && cd rowanmanning.com
     ```

  3. Install npm dependencies with `npm install`

  4. Generate processed webmentions with `npm run wm:process`

  5. Run `npm start`

  6. Visit [http://localhost:1313/](http://localhost:1313/)


## Writing new content

Use Hugo archetypes to write new content:

  * To write a post:

    ```bash
    hugo new posts/<slug>
    ```

  * To write a weeknote:

    ```bash
    npm run create:weeknote
    ```

  * To write a note:

    ```bash
    npm run create:note
    ```

    ```bash
    npm run create:like https://example.com/
    ```

    ```bash
    npm run create:reply https://example.com/
    ```

    ```bash
    npm run create:repost https://example.com/
    ```


## Licence

Site content is copyright Rowan Manning. You may not use any of the page content, posts, or images without permission.

The site design, CSS and markup (excluding actual content) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB). It would still be polite not to completely rip off my site – if you're going to use the design, make enough changes to differentiate from mine.

[![Creative Commons Licence](http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB)
