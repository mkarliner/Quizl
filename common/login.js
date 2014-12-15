SinglePageLogin.config({
    loginTitle: 'Quizl login',
    signupTitle: 'Quizl sign up',
    forgotPasswordTitle: 'Retrieve password',
    canRetrievePassword: true,
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
    forbidClientAccountCreation: false,
    routeAfterLogin: '/start',
    routeAfterSignUp: '/help',
    forceLogin: true,
	exceptRoutes: ["signup", "scoreboard", "admin/games"]
});