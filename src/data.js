const avatar = (n) => `https://i.pravatar.cc/100?img=${n}`

export const initialChats = [
  {
    id: 1, name: 'Amine', avatar: avatar(12), online: true, unread: 2,
    messages: [
      { id: 1, text: 'Salut ! Tu es dispo ce soir ?', from: 'them', time: '18:02' },
      { id: 2, text: 'Oui, vers 20h ça marche', from: 'me', time: '18:05', status: 'read' },
      { id: 3, text: 'Parfait, on se retrouve au café', from: 'them', time: '18:06' },
    ],
  },
  {
    id: 2, name: 'Famille ❤️', avatar: avatar(47), group: true, unread: 0,
    messages: [
      { id: 1, text: 'Qui vient dimanche ?', from: 'them', author: 'Maman', time: '09:12' },
      { id: 2, text: 'Moi !', from: 'me', time: '09:20', status: 'delivered' },
    ],
  },
  {
    id: 3, name: 'Sarra', avatar: avatar(32), online: false, unread: 0,
    messages: [{ id: 1, text: 'Merci pour hier 😊', from: 'them', time: 'Hier' }],
  },
  {
    id: 4, name: 'Équipe projet', avatar: avatar(15), group: true, unread: 5,
    messages: [
      { id: 1, text: 'La démo est prête', from: 'them', author: 'Yassine', time: '14:30' },
      { id: 2, text: 'Super, je regarde ça', from: 'me', time: '14:41', status: 'sent' },
    ],
  },
  {
    id: 5, name: 'Karim', avatar: avatar(60), online: false, unread: 0,
    messages: [{ id: 1, text: 'À demain !', from: 'me', time: 'Lundi', status: 'read' }],
  },
]
