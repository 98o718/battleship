const db = {
  url:
    'mongodb+srv://battleship:pvGmmZu21FwfEidr@cluster0-ohatu.mongodb.net/battleship?retryWrites=true&w=majority&authSource=admin',
}

const bcrypt = {
  saltRounds: 10,
}

const jwt = {
  secret: 'jT%F8LHy@Loy0HV%3ELZn*0hQNGr7oKAiIyiZoWzdIoh5tapf!',
}

module.exports = {
  db,
  bcrypt,
  jwt,
}
