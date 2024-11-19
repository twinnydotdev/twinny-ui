import { fail } from '@sveltejs/kit'
import { db } from '../database'
import { verifyEmailAddress as getEmailValid } from '$lib/utils'

export async function registerEmailAddress(request: Request) {
  try {
    const formData = await request.formData()
    const emailAddress = formData.get('email') as string
    const emailValid = getEmailValid(emailAddress)

    if (!emailAddress || !emailValid) {
      return fail(400, { error: true })
    }

    return await new Promise((resolve, reject) => {
      db.get('SELECT * FROM subscribers WHERE email = ?', [emailAddress], (err, subscriber) => {
        if (err) {
          return reject({ error: true })
        }
        if (subscriber) {
          return resolve({ error: true, message: 'Already subscribed' })
        }

        db.prepare('INSERT INTO subscribers (email) VALUES (?)').run(emailAddress, (err) => {
          if (err) {
            return reject({ error: true })
          }
          return resolve({ success: true })
        })
      })
    })
  } catch (error) {
    return { error: true }
  }
}
