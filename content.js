
function shortenUrl(info, tab) {
  console.log("Link " + info.linkUrl + " is to be shortened.");

  var encodedUrl = encodeURI(info.linkUrl);
  var shortenedUrl = getShortenedUrl(encodedUrl);
  copyTextToClipboard(shortenedUrl);

  if (shortenedUrl.substring(0, 16) == "https://rusty.nz") {
    console.log("Shortened to: " + shortenedUrl);
    //window.alert("Copied to clipboard.");
    chrome.tabs.executeScript(null, { code: "toastr.success('Copied to clipboard.')" });
  }
  else {
    //window.alert("Failed to shorten that one, sorry. Check it's a proper url and try again.");
    chrome.tabs.executeScript(null, { code: "toastr.error('Failed to shorten that one, sorry. Check it's a proper url and try again.')" });
  }
}

function getShortenedUrl(urlToShorten) {

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api-ssl.bitly.com/v3/shorten?longUrl=" + urlToShorten + "&format=txt&login=***&apiKey=***", false);
  xhr.send();

  return xhr.responseText;
}

function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
}

chrome.tabs.onUpdated.addListener(function (tab) {
  chrome.tabs.insertCSS(null, { file: 'toastr.min.css' }, function () {
    chrome.tabs.executeScript(null, { file: 'jquery.min.js' }, function () {
      chrome.tabs.executeScript(null, { file: 'toastr.min.js' }, function () { });
    });
  });
});

chrome.contextMenus.create({
  title: "Shorten link using rusty.nz",
  contexts: ["link"],
  onclick: shortenUrl,
});