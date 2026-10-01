import { useEffect, useRef, useState } from 'react'
import { Form, Image } from 'react-bootstrap'

const Ticks = ({ status }) => {
  if (status === 'sent') return <i className="bi bi-check2 ms-1" />
  return <i className={`bi bi-check2-all ms-1 ${status === 'read' ? 'wa-blue' : ''}`} />
}

export default function ChatWindow({ chat, onSend, onBack }) {
  const [text, setText] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.messages.length, chat.id])

  const submit = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    onSend(t)
    setText('')
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="wa-header">
        <i className="bi bi-arrow-left back-btn me-2" onClick={onBack} />
        <Image roundedCircle src={chat.avatar} width={40} height={40} />
        <div className="ms-3">
          <div>{chat.name}</div>
          <small className="text-muted">
            {chat.group ? 'cliquez ici pour les infos du groupe' : chat.online ? 'en ligne' : 'vu récemment'}
          </small>
        </div>
        <div className="ms-auto d-flex gap-4 wa-icons">
          <i className="bi bi-camera-video" />
          <i className="bi bi-search" />
          <i className="bi bi-three-dots-vertical" />
        </div>
      </div>

      <div className="wa-messages">
        {chat.messages.map((m) => (
          <div key={m.id} className={`wa-row ${m.from}`}>
            <div className={`wa-bubble ${m.from}`}>
              {chat.group && m.from === 'them' && <div className="wa-author">{m.author}</div>}
              <span>{m.text}</span>
              <span className="wa-meta">
                {m.time}
                {m.from === 'me' && <Ticks status={m.status} />}
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <Form onSubmit={submit} className="wa-composer">
        <i className="bi bi-emoji-smile" />
        <i className="bi bi-paperclip" />
        <Form.Control
          placeholder="Écrivez un message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="wa-send" aria-label="Envoyer">
          <i className={`bi ${text.trim() ? 'bi-send-fill' : 'bi-mic-fill'}`} />
        </button>
      </Form>
    </div>
  )
}
