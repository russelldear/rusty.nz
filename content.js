function shortenUrl(info,tab) {
  console.log("Link " + info.linkUrl + " is to be shortened.");

  var encodedUrl = encodeURI(info.linkUrl);

  window.alert(encodedUrl);

  var shortenedUrl = getShortenedUrl(encodedUrl);

  copyTextToClipboard(shortenedUrl);

  window.alert(shortenedUrl);
}

function getShortenedUrl(urlToShorten) {
  
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://api-ssl.bitly.com/v3/shorten?longUrl=" + urlToShorten + "&format=txt&login=russelldear&apiKey=R_033e1bcf069b4798b9443080b3d17a97", false);
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

chrome.contextMenus.create({
  title: "Shorten link using rusty.nz", 
  contexts:["link"], 
  onclick: shortenUrl,
});