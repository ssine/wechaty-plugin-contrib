import {
  Wechaty,
}                   from 'wechaty'

import { Sayable } from 'wechaty/dist/src/types'

type FindTalkerFunction = (wechaty: Wechaty) => Sayable | Sayable[] | Promise<Sayable> | Promise<Sayable[]>
type HeartbeatFunction  = (wechaty: Wechaty) => string | Promise<string>

export type SayableOption = string | string[] | FindTalkerFunction
export type EmojiOption   = string | HeartbeatFunction

/**
 * heartbeat: [爱心]
 */
interface EmojiSetting {
  login     : EmojiOption,
  logout    : EmojiOption,
  ready     : EmojiOption,
  heartbeat : EmojiOption,
}

export interface HeartbeatConfig {
  contact?        : SayableOption,
  room?           : SayableOption,
  emoji           : Partial<EmojiSetting>,
  intervalSeconds : number,
}

const DEFAULT_CONTACT_ID       = 'filehelper'
const DEFAULT_INTERVAL_SECONDS = 60 * 60       // 1 Hour

const DEFAULT_HEARTBEAT_CONFIG: HeartbeatConfig = {
  emoji: {
    heartbeat: '[爱心]',
  },
  intervalSeconds : DEFAULT_INTERVAL_SECONDS,
}

export function buildConfig (config?: Partial<HeartbeatConfig>) {

  const normalizedConfig: HeartbeatConfig = {
    ...DEFAULT_HEARTBEAT_CONFIG,
    ...config,
    emoji: {
      ...DEFAULT_HEARTBEAT_CONFIG.emoji,
      ...config?.emoji,
    },
  }

  /**
   * Set contact to DEFAULT_CONTACT_ID if there's nothing set
   */
  if (!normalizedConfig.room && !normalizedConfig.contact) {
    normalizedConfig.contact = DEFAULT_CONTACT_ID
  }
  return normalizedConfig

}
