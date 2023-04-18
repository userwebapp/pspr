import Dexie from 'dexie';

export const db = new Dexie('ppdb');

db.version(3).stores({
  apps: '++id, name, code, githubLink, docLink, comments, [code+name]',
  tools: '++id, name, subName, webOficial, accessUrl, docLink, refUser, refPass, comments, [name+subName]',
  envs: '++id, appId, name, url, ip, refUser, refPass, comments',
  settings: '++id, table, field, hide'
});
