const mineflayer = require('mineflayer')

function createBot() {

const bot = mineflayer.createBot({
  host: 'McByte.aternos.me',
  port: 49365,
  username: 'Solvixafk',
  version: false
})

bot.on('login', () => {
  console.log('Logged In')
})

bot.on('spawn', () => {
  console.log('Joined Server')

  // Random movement
  setInterval(() => {

    const actions = ['jump', 'forward', 'back', 'left', 'right']

    const randomAction =
      actions[Math.floor(Math.random() * actions.length)]

    bot.setControlState(randomAction, true)

    setTimeout(() => {
      bot.setControlState(randomAction, false)
    }, 2000)

  }, 30000)

})

bot.on('kicked', console.log)
bot.on('error', console.log)

bot.on('end', () => {
  console.log('Reconnecting...')
  setTimeout(createBot, 5000)
})

}

createBot()