const qr = require('qr-image')

const generate = async request => {
  const {text} = await request.json()
  const qr_svg = qr.imageSync(text || "http://anhknguyen.com", {type: 'svg'})
  const headers = {"Content-Type": "image/svg+xml"}
  return new Response(qr_svg, {headers})
}

const landing = `
<h1>QR Code Generator</h1>
<input type="text" id="text" placeholder="Your URL here.."></input>
<button onclick="generate()">Generate QR</button>
<p>Find the QR code in the "Network" tab of your browser's developer tools.</p>
<script>
  function generate() {
    fetch(window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: document.querySelector("#text").value })
    })
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