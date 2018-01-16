class API {
  // static register = 'users/register'
  // static login = 'users/login'

  // Routes needed for registration
  static activate = 'api/activate'
  static register = 'api/register'
  static geo_locations = 'api/geo_locations'
  static floors = 'api/floors'
  static offices = 'api/offices'


  //Login routes
  static login = 'oauth/token'
  static userData = 'api/user'


  //Authenticated routes
  static submitTicket = 'api/submitTicket'
  static getPendingTickets = 'api/getPendingTickets'
  static getTicket = 'api/getTicket'
  static getCompletedTickets = 'api/getCompletedTickets'
  static postReply = 'api/postReply'




}

export default API
