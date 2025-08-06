import { Boom } from '@hapi/boom'
import { makeInMemoryStore, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys'
import { COMMANDS, PREFIX } from '../config.js'

// Initialize store for messages
const store = makeInMemoryStore({ logger: console })
store?.readFromFile('./baileys_store.json')
setInterval(() => store.writeToFile('./baileys_store.json'), 10_000)

// Connection handler with proper types
async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')
  
  const sock = makeWASocket({
    logger: console,
    printQRInTerminal: true,
    auth: state,
    getMessage: async (key) => {
      return store.loadMessage(key.remoteJid, key.id) || {}
    }
  })

  store.bind(sock.ev)

  // Handle connection updates
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
      console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
      if (shouldReconnect) {
        startSock()
      }
    } else if (connection === 'open') {
      console.log('opened connection')
    }
  })

  // Handle message events
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const text = (m.message.conversation || m.message.extendedTextMessage?.text || '').toLowerCase()
    const sender = m.key.remoteJid
    const pushName = m.pushName || 'User'

    try {
      // Handle button responses
      if (m.message.buttonsResponseMessage) {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId
        await handleButtonResponse(sock, sender, buttonId, pushName)
        return
      }

      // Handle regular commands
      if (text.startsWith(PREFIX)) {
        const cmd = text.replace(PREFIX, '').split(' ')[0]
        const args = text.split(' ').slice(1)
        
        await handleCommand(sock, m, cmd, args, pushName)
      }
    } catch (error) {
      console.error('Message processing error:', error)
      await sock.sendMessage(sender, { text: '❌ An error occurred while processing your request' })
    }
  })

  return sock
}

// Command handler
async function handleCommand(sock, m, cmd, args, pushName) {
  const sender = m.key.remoteJid
  
  switch(cmd) {
    case 'menu':
      await showMainMenu(sock, sender, pushName)
      break
      
    case 'owner':
      await showOwnerMenu(sock, sender)
      break
      
    case 'contactowner':
      await sendOwnerContact(sock, sender)
      break
      
    default:
      await sock.sendMessage(sender, { text: '⚠️ Unknown command. Type .menu for options' })
  }
}

// Button response handler
async function handleButtonResponse(sock, sender, buttonId, pushName) {
  switch(buttonId) {
    case 'menu':
      await showMainMenu(sock, sender, pushName)
      break
      
    case 'owner':
      await showOwnerMenu(sock, sender)
      break
      
    case 'contactowner':
      await sendOwnerContact(sock, sender)
      break
      
    default:
      await sock.sendMessage(sender, { text: '⚠️ Unknown button selection' })
  }
}

// Menu templates
async function showMainMenu(sock, sender, pushName) {
  const menuText = `🌟 *Main Menu* 🌟\n\n` +
                  `Hello ${pushName}! I'm ${COMMANDS.botName}.\n` +
                  `Here's what I can do:\n\n` +
                  `• Prefix: ${PREFIX}\n` +
                  `• Commands: ${Object.keys(COMMANDS).length}\n` +
                  `• Owner: ${COMMANDS.ownerName}`

  await sock.sendMessage(sender, {
    text: menuText,
    footer: 'Select an option below',
    buttons: [
      { buttonId: 'menu', buttonText: { displayText: '🏠 Main Menu' }, type: 1 },
      { buttonId: 'owner', buttonText: { displayText: '👑 Owner' }, type: 1 },
      { buttonId: 'contactowner', buttonText: { displayText: '📱 Contact' }, type: 1 }
    ],
    headerType: 1
  })
}

async function showOwnerMenu(sock, sender) {
  await sock.sendMessage(sender, {
    text: '👑 *Owner Information* 👑\n\nSelect an option:',
    footer: COMMANDS.botName,
    buttons: [
      { buttonId: 'contactowner', buttonText: { displayText: '📱 Contact Owner' }, type: 1 },
      { buttonId: 'menu', buttonText: { displayText: '🔙 Main Menu' }, type: 1 }
    ],
    headerType: 1
  })
}

async function sendOwnerContact(sock, sender) {
  await sock.sendMessage(sender, {
    contacts: {
      displayName: COMMANDS.ownerName,
      contacts: [{
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${COMMANDS.ownerName}\nTEL:${COMMANDS.ownerNumber}\nEND:VCARD`
      }]
    }
  })
}

// Start the connection
startSock().catch(err => console.error('Initialization error:', err))
