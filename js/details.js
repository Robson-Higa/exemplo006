const $ = document.getElementById.bind(document)

const API_URL = 'https://api.tvmaze.com/shows'

const search = window.location.search
const params = new URLSearchParams(search)
const id = params.get('id')
console.log(id)

fetch(`${API_URL}/${id}`).then((response) => {
  response.json().then((result) => {
    const { name, type, language, genres, status, image, network, webChannel } =
      result

    const running = status === 'Ended' ? false : true
    const imageUrl = image ? image.medium : '/img/noimage.png'
    const channel = network ? network.name : webChannel.name

    $('poster').src = imageUrl
    $('name').innerText = name
    $('type').innerText = type
    $('language').innerText = language
    $('genres').innerText = genres.join(', ')
    $('running').innerText = running ? 'Sim' : 'Não'
    $('channel').innerText = channel
  })
})
const saveContact = (event) => {
  event.preventDefault()

  const name = document.getElementById('name').value
 
  const channel = document.getElementById('channel').value
  //const email = document.getElementById('contact-email').value

  const contact = { name, channel}
  contacts.push(contact)
  storeContacts()
  printContact(contact)
  //clearForm()
}
const removeContact = (event) => {
  event.preventDefault()
 // name = document.getElementById('name').value
 
  //const contact = { name}
  localStorage.removeItem('contacts', 'name')


}
const printContact = (contact) => {
  const { name } = contact

  const contactCardValue = `
    <div class='contact-card'>
        <div class='contact-row'>
            <span class='first-letter'>
                ${name}
            </span>
           
        </div>

        
        </div>
    </div>
    `
    const contactsArea = document.getElementById('contacts-area')
  contactsArea.insertAdjacentHTML('afterbegin', contactCardValue)
}
const storeContacts = () => {
  const contactsJson = JSON.stringify(contacts)
  localStorage.setItem('contacts', contactsJson)
}

const contactsJson = localStorage.getItem('contacts')
const contacts = contactsJson ? JSON.parse(contactsJson) : []
// for (let i = 0; i < contacts.length; i++) {
//   printContact(contacts[i])
// }
contacts.forEach((c) => printContact(c))