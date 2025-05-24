import {
  BaseDatabaseMigration,
} from '@openreachtech/furo'

/**
 * ChatDatabaseMigration class.
 */
export default class ChatDatabaseMigration extends BaseDatabaseMigration {
  /** @override */
  generateObjectStoreArgs () {
    return [
      {
        storeName: 'messages',
        primaryKeyPath: 'id',
        indexArgs: [
          {
            indexName: 'id',
            indexKeyPath: 'id',
            indexOptions: {
              unique: false,
            },
          },
          {
            indexName: 'roomId',
            indexKeyPath: [
              'roomId',
              'postedAt',
            ],
            indexOptions: {
              unique: false,
            },
          },
        ],
      },
      {
        storeName: 'rooms',
        primaryKeyPath: 'id',
        indexArgs: [
          {
            indexName: 'id',
            indexKeyPath: 'id',
            indexOptions: {
              unique: false,
            },
          },
        ],
      },
    ]
  }
}
