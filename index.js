const mineflayer = require('mineflayer')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Solvix Bot Running')
})

app.listen(3000, () => {
  console.log('Web server started')
})

const config = {
  host: 'McByte.aternos.me',
  port: 49365,
  username: 'Solvix_bot',
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

    // Small head movement every minute
    setInterval(() => {
      if (!bot.entity) return

      bot.look(
        bot.entity.yaw + 0.2,
        bot.entity.pitch,
        true
      )
    }, 60000)

    // Small jump every 2 minutes
    setInterval(() => {
      if (!bot.entity) return

      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)
    }, 120000)

    // Optional chat every 5 minutes
    setInterval(() => {
      const messages = [
        'hello',
        'afk',
        'hi',
        'checking server'
      ]

      const msg =
        messages[Math.floor(Math.random() * messages.length)]

      bot.chat(msg)
    }, 300000)
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('Error:', err)
  })

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10 seconds...')

    setTimeout(() => {
      createBot()
    }, 10000)
  })
}

createBot()
