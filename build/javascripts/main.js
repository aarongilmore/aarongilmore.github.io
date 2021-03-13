var request = new XMLHttpRequest();
var url = 'https://api.are.na/v2/channels/highlights-iao1d4cqqte/contents?per=1&sort=position&direction=desc';
request.open('GET', url, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    document.getElementById('content').style.display = 'none';
    var data = JSON.parse(request.responseText);

    data.contents.forEach(function(c) {
      var div = document.createElement('div');

      div.className = 'entry';
      if (c.class === 'Text') {
        var text = c.content_html;
        div.innerHTML = text + "<p class='f7 gray'>" + formatDate(new Date(c.created_at)) + "</p>";
      } else if (c.class === 'Image') {
        div.innerHTML = '<a href="' + c.image.original.url + '" target="_blank"><img src="' + c.image.display.url + '"></a><div class="caption">' + c.title + '</div>';
        
      }
      document.getElementById('arena').insertBefore(div, document.getElementById('arena').childNodes[0]);

      var anchors = document.getElementById('arena').getElementsByTagName('a');
      for (var i = 0; i < anchors.length; i++){
        anchors[i].setAttribute('target', '_blank');
      }

    });
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}