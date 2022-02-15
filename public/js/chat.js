const socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var email = document.getElementById('email')


form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value && email.value) {
    var d = new Date,
      dformat = [d.getMonth() + 1,
      d.getDate(),
      d.getFullYear()].join('/') + ' ' +
        [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':')
    var object = { email: email.value, msg: input.value, date: dformat }
    socket.emit('chat message', object);
    input.value = '';
    saveToFile(object);
  }

});

socket.on('chat message', function (msg) {
  var item = document.createElement('li')

  var emailSpan = document.createElement('span')
  emailSpan.style.color = 'blue'
  emailSpan.style.fontWeight = '700'
  emailSpan.innerHTML = msg.email + ' ';

  var dateSpan = document.createElement('span')
  dateSpan.style.color = 'brown'
  dateSpan.innerHTML = '[' + msg.date + ']: ';

  var msgSpan = document.createElement('span')
  msgSpan.style.color = 'green'
  msgSpan.style.fontStyle = 'italic'
  msgSpan.innerHTML = msg.msg;

  item.appendChild(emailSpan);
  item.appendChild(dateSpan);
  item.appendChild(msgSpan);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

//------------------------------------------------------------------------------

function saveToFile(obj) {

  fetch("/api/chat", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  }).then(res => {
    document.getElementById("ProductTitle").value = "",
      document.getElementById("Price").value = "",
      document.getElementById("Thumbnail").value = "";

    console.log("Request complete! response:", res);
  });
}