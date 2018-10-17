const path = require("path");

module.exports = function(app,passport,express){

	
	app.post('/signin', passport.authenticate('local-signin',  
			 { successRedirect: '/',
			   failureRedirect: '/signin'}
			 ));

/*
	app.post('/signup', (req, res) => {
		console.log(req.body);
		res.send('sent')
	})
	*/
	app.get('/signin', (req, res) => {
		res.send('signin!!!')
	})
			
	app.post('/signup', passport.authenticate('local-signup',  
			 { successRedirect: '/', 
			   failureRedirect: '/signup'} ));

	app.get('/logout', function (req, res) {
		req.session.destroy(function(err) {
			res.redirect('/');
		});
	});

	/*app.get('/profile.html', function(req, res) {
		res.redirect('/profile');
	});*/

	
	app.use('/profile', isLoggedIn);
	//app.use('/profile', express.static(path.join(__dirname, 'profile')));
	app.use('/profile', function(req,res){
		res.sendFile(path.resolve('profile/index.html'));
	});

	
	/*app.use('/profile', function(req,res,next){
		 if(req.user)
		 {
		   return express.static(path.join(__dirname, 'profile'));
		 } 
		 else 
		 {
		   res.render(403, 'login', {message:'Please, login!'});
		 }
	});*/

	app.get('/session', function(req,res){
		//for testing
		res.json(req.user);

	});
	
	app.get('/himom', function (req, res) {
		res.send("himom");
	});


	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
		{
			return next();
		}
		
		res.redirect('/signin');
	}
}
