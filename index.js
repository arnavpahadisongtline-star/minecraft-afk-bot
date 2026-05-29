const mineflayer = require('mineflayer')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('AFK Bot Running')
})

app.listen(3000, () => {
  console.log('Web server started')
})

const config = {
  host: 'McByte.aternos.me',
  port: 49365,
  username: 'Solvix_AFK_BOT',
  password: 'mypass@123'
}

function createBot() {

  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: false
  })

  bot.on('spawn', () => {

    console.log('Bot joined server')

    setTimeout(() => {

      bot.chat(`/register ${config.password} ${config.password}`)

      setTimeout(() => {
        bot.chat(`/login ${config.password}`)
      }, 3000)

    }, 5000)

    setInterval(() => {

      const actions = [
        'forward',
        'back',
        'left',
        'right',
        'jump'
      ]

      const action =
        actions[Math.floor(Math.random() * actions.length)]

      bot.setControlState(action, true)

      bot.look(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        true
      )

      setTimeout(() => {
        bot.setControlState(action, false)
      }, 2000)

    }, 30000)

    setInterval(() => {

      const messages = [
        'hello',
        'afk',
        'hi',
        'lol',
        'checking server',
        'nice server'
      ]

      const msg =
        messages[Math.floor(Math.random() * messages.length)]

      bot.chat(msg)

    }, 180000)

  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('Error:', err)
  })

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting...')

    setTimeout(() => {
      createBot()
    }, 10000)
  })

}

createBot()
