/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been 
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object 
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a URL', function() {
            allFeeds.forEach(function(feed) {
               expect(feed.url).toBeDefined(); 
               expect(feed.url).not.toBe('');
            });
        });

        /* Loops through each feed in the allFeeds object 
         * and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name', function() {
            allFeeds.forEach(function(feed) {
               expect(feed.name).toBeDefined(); 
               expect(feed.name).not.toBe('');
            });
        });
         
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        
    
        /* Menu element is hidden by default.
         */
            
        it('is hidden by default', function() {
            const body = document.querySelector('body');
            expect(body.classList[0]).toBe('menu-hidden');
        });  
            
         /* Menu changes visibility when the menu icon is clicked.
          */
          
        it('changes visibility when clicked', function() {
            const hamburger = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');
            hamburger.click();
            expect(body.classList[0]).toBeUndefined();
            hamburger.click();
            expect(body.classList[0]).toBe('menu-hidden');
        });  
          
    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
            
        });
        /* Ensures when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        
        it('load in the feed', function(done) {
            const entries = document.querySelectorAll('.entry');
            expect(entries[0]).toBeDefined();
            done();
        });
        
    });
    /* Test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        let firstFeed, secondFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();    
                });
                
            });    
        });        
    

        /* Ensures when a new feed is loaded by the loadFeed 
         * function that the content actually changes.
         */
        
        it('changes page content', function(done) {
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());
