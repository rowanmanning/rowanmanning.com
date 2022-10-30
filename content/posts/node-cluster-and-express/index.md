---
# Post title and metadata
# -----------------------
title: "Node.js Cluster and Express"
aliases:
  - /posts/node.js-cluster-and-express/
date: 2013-01-10T20:18:00
lastmod: 2013-09-21T13:54:00
description: "A simple tutorial on using Node.js 0.8+'s Cluster module with Express to dramatically improve app performance."
cta: "Learn about clustering and express"
tags: ["Node.js", "JavaScript", "Express", "Cluster"]

# Post display
# ------------
highlight: "lime"

# Links
# -----
syndication:
  links:
    - url: https://twitter.com/rowanmanning/status/289643542429696001
      name: Twitter
---


Over the last couple of evenings, I've been playing with the [Node.js Cluster module][cluster] and using it to dramatically improve the amount of load Express apps can handle. The results have been amazing.

The Cluster module is fairly easy to pick up if you're used to working with Node.js, but I thought I'd blog about my experience – hopefully it will help you either understand or see the benefit of clustering!


What Does Cluster Do?
---------------------

Node.js runs in a single thread. While it's still very fast in most cases, this really doesn't take advantage of multiple processors if they're available. The Cluster module allows you to create a small network of separate processes which can share server ports; this gives your Node.js app access to the full power of your server.


Learn By Example
----------------

Let's build a simple Express application to start with. Then we'll add clustering. If you'd like to follow along, you'll need to [install Node.js][node-install] 0.10+. This tutorial also assumes a moderate amount of JavaScript, Node.js and [Express][express] knowledge.

All of the source code for the application we're creating here is [available on GitHub][source].

Create a new directory for this tutorial, and add a file called `package.json` with the following code:

```json
{
    "name": "learning-express-cluster",
    "version": "1.0.0",
    "dependencies": {
        "express": "^4"
    }
}
```

Run `npm install` from within your project directory, this will install Express. Now we can create a new file, `app.js`:

```js
// Include Express
var express = require('express');

// Create a new Express application
var app = express();

// Add a basic route – index page
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Bind to a port
app.listen(3000);
console.log('Application running!');
```

Now we have a basic Express app, you can run it from the command line with `node app.js`. When you go to http://localhost:3000/, you should see the message "Hello world!" in your browser.

That's all well and good, but let's get down to the point of this post – clustering! It's surprisingly simple; we'll update `app.js` line by line and explain the process.

First, we add a new line at the very top of the file:

```js
// Include the cluster module
var cluster = require('cluster');

...
```

Now we're going to add a conditional to `app.js` which wraps all of our Express application functionality. Update your file to look like this:

```js
// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    ...

// Code to run if we're in a worker process
} else {

    // Include Express
    var express = require('express');

    // Create a new Express application
    var app = express();

    // Add a basic route – index page
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    // Bind to a port
    app.listen(3000);
    console.log('Application running!');

}
```

What we're doing here is detecting whether the application is being run in the 'master' process (the one you start from the command line) or a 'worker' process (a process created by the master).

Your application code can stay pretty much the same, which makes it fairly easy to add clustering to an existing application.

Let's write the code for the master process, we're almost done! Fill out the first half of the conditional to look like this:

```js
...

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

// Code to run if we're in a worker process
} else {

...
```

All we're doing above is counting the number of CPUs your machine has, and calling `cluster.fork` for each. For example, If your machine has four CPUs then `cluster.fork` will be called four times, creating four new processes.

The new worker processes we create will run the same `app.js` JavaScript file as the master, except it will use the code in the `else` statement. This is obviously because `cluster.isMaster` is `false` within a worker.

If you run `node app.js` now, nothing will look different. The only thing you'll notice is that the message "Application running!" will appear more than once in your command line.

Before we finish up, let's output the worker ID so you can tell which worker is serving your page each time it loads. Replace the following lines:

```js
res.send('Hello World!');

...

console.log('Application running!');
```

with these:

```js
res.send('Hello from Worker ' + cluster.worker.id);

...

console.log('Worker %d running!', cluster.worker.id);
```

Now when you run the application, you should see the workers being started in your command line. When you revisit http://localhost:3000/ you should see the message "Hello from Worker X" where X is the ID of the worker serving you.

Try opening the page in multiple tabs and browsers – you should see varying workers.


The Proof Is In The Pudding
---------------------------

So far, you've taken my word for it that clustering is fast. The last thing I'm going to do here is run some benchmarks on the application before and after adding clustering.

Because the application is so minimal now, I added a long loop to the index route to help illustrate how a clustered application performs better under heavy load.

Without clustering:

```sh
$ siege -c100 -t1M http://localhost:3000/
#> Transactions:                263 hits
#> Availability:                100.00 %
#> Elapsed time:                59.50 secs
#> Data transferred:            849.99 MB
#> Response time:               19.41 secs
#> Transaction rate:            4.42 trans/sec
#> Throughput:                  14.29 MB/sec
#> Concurrency:                 85.79
#> Successful transactions:     263
#> Failed transactions:         0
#> Longest transaction:         34.57
#> Shortest transaction:        10.07
```

With clustering:

```sh
$ siege -c100 -t1M http://localhost:3000/
#> Transactions:                811 hits
#> Availability:                100.00 %
#> Elapsed time:                59.25 secs
#> Data transferred:            2621.08 MB
#> Response time:               6.50 secs
#> Transaction rate:            13.69 trans/sec
#> Throughput:                  44.24 MB/sec
#> Concurrency:                 88.96
#> Successful transactions:     811
#> Failed transactions:         0
#> Longest transaction:         16.47
#> Shortest transaction:        0.54
```

I think you'll agree that that's a worthwhile performance increase for only a few lines of code :wink:


Bonus Code: Coping With Death
-----------------------------

Last but not least, there's one last thing that would be useful to add to our application. In the (hopefully unlikely) event that one of our worker processes dies, we'll want to make sure we spawn another; otherwise we could eventually end up just running an empty master process and losing all our requests!

This is also incredibly easy to do by binding to the cluster 'exit' event. Add the following code directly beneath the loop which creates our initial workers. It's fairly self-explanatory:

```js
...

// Listen for dying workers
cluster.on('exit', function (worker) {

    // Replace the dead worker,
    // we're not sentimental
    console.log('Worker %d died :(', worker.id);
    cluster.fork();

});

...
```

Now we don't have to worry as much if something goes horribly wrong in one of our workers!

I hope you enjoyed this tutorial. As mentioned above, you can get a hold of the [source code for the examples on GitHub][source]. For more information, check out the [Node.js Cluster module documentation][cluster].

Thanks for reading.


For further reading on this subject, see:

  * [Node.js Cluster module documentation][cluster]
  * [Express documentation][express]



[cluster]: http://nodejs.org/api/cluster.html
[express]: http://expressjs.com/
[node-install]: https://nodejs.org/
[source]: https://github.com/rowanmanning/learning-express-cluster
