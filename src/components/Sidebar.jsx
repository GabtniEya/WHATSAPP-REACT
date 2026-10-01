import { useState } from 'react'
import { Form, InputGroup, ListGroup, Image, Dropdown } from 'react-bootstrap'
import profileIcon from '../assets/profile-icon.png'

export default function Sidebar({ chats, activeId, onSelect }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const list = chats
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    .filter((c) => (filter === 'unread' ? c.unread > 0 : filter === 'groups' ? c.group : true))

  return (
    <div className="d-flex flex-column h-100">
      <div className="wa-header">
        <Image roundedCircle src={profileIcon} width={40} height={40} />
        <div className="ms-auto d-flex gap-3 wa-icons">
          <i className="bi bi-people" title="Communautés" />
          <i className="bi bi-chat-left-text" title="Nouvelle discussion" />
          <Dropdown align="end">
            <Dropdown.Toggle as="i" className="bi bi-three-dots-vertical no-caret" />
            <Dropdown.Menu>
              <Dropdown.Item>Nouveau groupe</Dropdown.Item>
              <Dropdown.Item>Messages importants</Dropdown.Item>
              <Dropdown.Item>Paramètres</Dropdown.Item>
              <Dropdown.Item>Déconnexion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="wa-search">
        <InputGroup>
          <InputGroup.Text><i className="bi bi-search" /></InputGroup.Text>
          <Form.Control
            placeholder="Rechercher ou démarrer une discussion"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <div className="wa-filters">
          {[['all', 'Toutes'], ['unread', 'Non lues'], ['groups', 'Groupes']].map(([k, label]) => (
            <button key={k} className={filter === k ? 'active' : ''} onClick={() => setFilter(k)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <ListGroup variant="flush" className="wa-chatlist">
        {list.map((c) => {
          const last = c.messages[c.messages.length - 1]
          return (
            <ListGroup.Item
              key={c.id}
              action
              active={c.id === activeId}
              onClick={() => onSelect(c.id)}
              className="wa-chat-item"
            >
              <Image roundedCircle src={c.avatar} width={49} height={49} />
              <div className="flex-grow-1 overflow-hidden ms-3">
                <div className="d-flex justify-content-between">
                  <span className="fw-normal text-truncate">{c.name}</span>
                  <small className={c.unread ? 'wa-green' : 'text-muted'}>{last.time}</small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted text-truncate">
                    {last.from === 'me' && <i className={`bi bi-check2-all me-1 ${last.status === 'read' ? 'wa-blue' : ''}`} />}
                    {last.text}
                  </small>
                  {c.unread > 0 && <span className="wa-badge">{c.unread}</span>}
                </div>
              </div>
            </ListGroup.Item>
          )
        })}
        {list.length === 0 && <p className="text-center text-muted mt-4">Aucune discussion trouvée</p>}
      </ListGroup>
    </div>
  )
}
