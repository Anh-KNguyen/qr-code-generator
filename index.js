addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

constant generate = async request => {
  return new Response("Hello worker", {status: 200})
}

async function handleRequest(request) {
  if (request.method === "POST") {
    response = await generate(request)
  } else {
    response = new Response("Expected POST", {status: 405})
  }
  return response
}
