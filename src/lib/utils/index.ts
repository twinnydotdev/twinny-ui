export const getErrorResponse = (error: unknown) =>
  new Response(JSON.stringify({ error }), {
    headers: {
      'content-type': 'application/json'
    }
  })

export const getResponse = (data: unknown) =>
  new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json'
    }
  })

export const noop = () => undefined
