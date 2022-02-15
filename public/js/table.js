var tableProduct = document.getElementById('table');

socket.on('table', function (producto) {

  var tr = tableProduct.insertRow(tableProduct.rows.length)
  var id = tr.insertCell(0);
  var title = tr.insertCell(1);
  var price = tr.insertCell(2);
  var photo = tr.insertCell(3);

  var idTr = document.createElement('td')
  var titleTr = document.createElement('td')
  var priceTr = document.createElement('td')
  var photoTr = document.createElement('td')

  var img = document.createElement('img');
  img.src = producto.thumbnail;
  img.style = "max-height:30px;"

  idTr.innerHTML = producto.id;
  titleTr.innerHTML = producto.title;
  priceTr.innerHTML = producto.price;
  photoTr.appendChild(img);


  id.appendChild(idTr)
  title.appendChild(titleTr)
  price.appendChild(priceTr)
  photo.appendChild(photoTr)

});