/**
 *   Wechaty - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016-now Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import { Wechaty } from 'wechaty'

import {
  DingDong,
  EventLogger,
  QRCodeTerminal,
  MessageAwaiter,
} from '../src'  // from 'wechaty-plugin-contrib'

const bot = new Wechaty({
  name: 'message-awaiter-bot',
})

bot.use(
  QRCodeTerminal(),
  DingDong(),
  EventLogger(),
  MessageAwaiter()
)

bot.on('message', async (msg) => {
  if (msg.text() === 'repeat me') {

    await msg.say('what to repeat?')
    let repeatMsg = await bot.waitForMessage({ contactId: msg.from()?.id, roomId: msg.room()?.id })
    await repeatMsg.say(repeatMsg.text())

  } else if (msg.text() === 'test') {

    await msg.say('please reply a message with digits in a minute')
    try {
      let repeatMsg = await bot.waitForMessage({
        contactId: msg.from()?.id,
        regex: /\d/,
        roomId: msg.room()?.id,
        timeoutSecond: 60,
      })
      await repeatMsg.say(repeatMsg.text())
    } catch (err) {
      await msg.say(String(err))
    }

  }
})

bot.start()
  .catch(console.error)
