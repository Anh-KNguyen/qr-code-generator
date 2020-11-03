const qr = require('qr-image')

const generate = async request => {
  const {text} = await request.json()
  const qr_svg = qr.imageSync(text || "http://anhknguyen.com", {type: 'svg'})
  const headers = {"Content-Type": "image/svg+xml"}
  return new Response(qr_svg, {headers})
}

const landing = `
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<div style="text-align:center;padding-top:60px">
  <h1 class="w3-text-teal" style="font-family:Tahoma, Verdana, Segoe, sans-serif">Generate a QR Code</h1>
  <div style="padding-top:20px">
    <input type="text" id="text" style="border-radius:4px;border-color:ghostwhite" placeholder="Your URL here.."></input>
    <button onclick="generate()" style="background-color: azure;border-radius: 4px;border-color: aliceblue;">Generate QR</button>
  </div>
  <body>
    <div id="myQrCode" style="width:300px;height:300px;display:block;margin:auto;padding-top:100px"></div>
  </body>
</div>
<script>
  function generate() {
    fetch(window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: document.querySelector("#text").value })
    })
    .then(response => response.text())
    .then((text) => {
      let svgStr = text;
      let svg = document.getElementById('myQrCode');
      svg.innerHTML = svgStr;
    });
  }
</script>
`

async function handleRequest(request) {
  if (request.method === "POST") {
    response = await generate(request)
  } else {
    response = new Response(landing, { headers: { "Content-Type": "text/html" } })
  }
  return response
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})