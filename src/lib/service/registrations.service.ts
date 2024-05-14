import { fail } from '@sveltejs/kit'
import { db } from '../database'
import { verifyEmailAddress as getEmailValid } from '$lib/utils'

export async function registerEmailAddress(request: Request) {
  const formData = await request.formData()
  const emailAddress = formData.get('email') as string
  const emalValid = getEmailValid(emailAddress)
  if (!emailAddress || !emalValid) throw fail(400)
  return await new Promise((resolve, reject) => {
    try {
      db.get('SELECT * FROM subscribers WHERE email = ?', [emailAddress], (err, subscriber) => {
        if (subscriber) return reject()
        db.prepare('INSERT INTO subscribers (email) VALUES (?)', [emailAddress]).run(
          emailAddress,
          () => {
            return resolve({ success: true })
          }
        )
      })
    } catch (err) {
      return reject()
    }
  })
}
