self.addEventListener('push', (e) => {
  const data = e.data.json()
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'boba-512-512.png'
  })
})
