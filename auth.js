const jwt = require("jsonwebtoken");
const secret = "CourseBookingAPI";

module.exports.createAccessToken = (user) => {
	const data = {
		id : user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}
	return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if(typeof token !== "undefined"){
		console.log(token);
		// bearer <actual-token>
		token = token.slice(7, token.lenght);
		// <actual-token>

		return jwt.verify(token, secret, (error,data) => {
			if(error){
				return response.send({
					auth: "Failed."
				});
			}
			else{
				next();
			}
		})
	}
	else{
		return null;
	}
}

module.exports.decode = (token) => {
	if(typeof token !== "undefined"){
		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (error, data) => {
			if(error){
				return null 
			} else {
				return jwt.decode(token, {complete: true}).payload
			}
		})
	} 
	else {
		return null
	}
}

