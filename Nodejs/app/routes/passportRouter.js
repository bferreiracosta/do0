module.exports = function(app, passport){
    app.get('/login', function(req, res) {
        res.render('site/login.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/login', passport.authenticate('local-login', {
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
            req.session.cookie.expires = false;
            }
            
            res.send(req.user);
    });

    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('site/signup.ejs', { message: req.flash('signupMessage') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('site/profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on
if (req.isAuthenticated())
    return next();

// if they aren't redirect them to the home page
res.redirect('/home');
}