import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import { initialChats } from './data.js'

const now = () =>
  new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

export default function App() {
  const [chats, setChats] = useState(initialChats)
  const [activeId, setActiveId] = useState(null)
  const active = chats.find((c) => c.id === activeId)

  const openChat = (id) => {
    setActiveId(id)
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
  }

  const addMessage = (chatId, msg) =>
    setChats((cs) =>
      cs.map((c) => (c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c))
    )

  const sendMessage = (text) => {
    const id = Date.now()
    addMessage(activeId, { id, text, from: 'me', time: now(), status: 'sent' })
    const chatId = activeId
    // Réponse automatique simulée
    setTimeout(() => {
      setChats((cs) =>
        cs.map((c) =>
          c.id === chatId
            ? { ...c, messages: c.messages.map((m) => (m.id === id ? { ...m, status: 'read' } : m)) }
            : c
        )
      )
    }, 1200)
    setTimeout(() => {
      addMessage(chatId, { id: id + 1, text: 'D’accord 👍', from: 'them', time: now() })
    }, 2500)
  }

  return (
    <div className="wa-app">
      <div className="wa-container">
        <div className={`wa-side ${active ? 'hide-mobile' : ''}`}>
          <Sidebar chats={chats} activeId={activeId} onSelect={openChat} />
        </div>
        <div className={`wa-main ${active ? '' : 'hide-mobile'}`}>
          {active ? (
            <ChatWindow chat={active} onSend={sendMessage} onBack={() => setActiveId(null)} />
          ) : (
            <div className="wa-empty">
              <i className="bi bi-whatsapp" />
              <h2>WhatsApp Web</h2>
              <p>Envoyez et recevez des messages sans garder votre téléphone connecté.</p>
              <small><i className="bi bi-lock-fill" /> Chiffrement de bout en bout</small>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
