import { db } from '$lib/database'
import { fail, json } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const email = data.get('email') as string
    if (!email) {
      return fail(400, { missing: true })
    }
    return await new Promise((resolve) => {
      db.get('SELECT * FROM subscribers WHERE email = ?', [email], (err, subscriber) => {
        if (subscriber) {
          return resolve({ success: false })
        }
        try {
          db.prepare('INSERT INTO subscribers (email) VALUES (?)', [email]).run(email, () => {
            return resolve({ success: true  })
          })
        } catch {
          return resolve({ success: false })
        }
      })
    })
  }
}
