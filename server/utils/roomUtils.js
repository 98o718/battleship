const { uuid, isUuid } = require('uuidv4')

module.exports = {
  roomGenerator: () => uuid(),

  roomChecker: room => isUuid(room),
}
