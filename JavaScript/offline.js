setInterval(function () {
  console.log(navigator.onLine);
  if (navigator.onLine == false) {
    window.setTimeout(function () {
      // Move to a new location or you can do something else
      window.location.href = "3.html";
    }, 0)
  }
}, 100);