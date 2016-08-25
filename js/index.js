$(document).ready(function() {
  var $content = $('#content');
  var $dialog = $('#dialog');

  var $search = $('#searchFrm');
  var $inp = $('#searchInp');

  var $again = $('#again');

  $content.hide();
  $again.hide();

  function Toggle() {
    $content.toggle();
    $dialog.toggle();
    $again.toggle();
  }

  $search.on('submit', function(e) {
    e.preventDefault();

    console.log("value: " + $inp.val());

    var baseUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&callback=?&srsearch=";
    var baseRes = "https://en.wikipedia.org/wiki/";

    var url = baseUrl + $inp.val();
    $.getJSON(url, function (data) {
      Toggle();
      console.log('getting url: ' + url);
      console.dir(data);

      var respArr = data.query.search;

      for (var entry of respArr) {
        var title = entry.title;
        var snippet = entry.snippet;

        var $item = $('<div>');
        $item.addClass('entry');

        var $title = $('<a>').addClass('title text-primary').attr('href', baseRes + title).html(title);
        var $snippet = $('<p>').addClass('snippet').html(snippet);

        $item.append($title);
        $item.append($snippet);

        $content.append($item);
      }
    });
  });

  $again.on('click', function () {
    Toggle();
    $inp.val('');
    $content.empty();
  })
});
