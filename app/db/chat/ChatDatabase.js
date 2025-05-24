import {
  BaseDatabase,
} from '@openreachtech/furo'

import ChatDatabaseMigration from './ChatDatabaseMigration.js'
import MessagesStore from './stores/MessagesStore.js'

/**
 * ChatDatabase class.
 */
export default class ChatDatabase extends BaseDatabase {
  /** @override */
  static get dbName () {
    return 'chat'
  }

  /** @override */
  static get MigrationCtor () {
    return ChatDatabaseMigration
  }

  /**
   * get: The store of messages.
   *
   * @returns {MessagesStore} The store
   */
  get messagesStore () {
    return MessagesStore.create({
      dbClient: this.dbClient,
    })
  }
}
