const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUtsOWUxb1BiRktsTDdHQ3pvTTQ1aGgrdE0yZng1TVpQYVViTXVWSE1Ycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXJxWllLT1FUWVErMk4yMlFiRktDWklmRzJiVmQ3cU1rWWpmcTE5REFsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjQVUzc3JpcTRnWWd5TERMb20wb1VhUklndkxQeThmMUpZZnQ2TUdaQjE0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtZG9xNVlCZWdhZFFIQjd4SEl6aWVZbE5LbGhpejIrRFlpSU8rM2tLd0JvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllQd0hQeVp2VlR5V0Z4YTNhU3ptY1VreHozdnMwUGs1UmtRWFZMdnJrbTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZIa29YL3J0ZkEwQnJIT3U3cVlFNXlmVWdmbDBnNHBkNkQzZU94WFp3aXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUdrcFdBeHBDSVh2ek0ydkFUUUFxdkwvaUE1WUJPVWNGYVJkVkNDMkdWdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGhib2lPdzlTRnlqOVE0TDFmcmRKSHdHQ1BrK1JWQk5SeUp1RjJoK3FUaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZrL2NLSVB2a05nbGFPamxjNGVKTUFldEQxUm5RSlpYYnNidUNaNkJCbGp3WmpyS3NwQXVWMWkxeEJtRWF3bEVoWFFzK3JYbUw4dHhqK1lVb0VvQUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEyLCJhZHZTZWNyZXRLZXkiOiJPb2ZzVWpwbGdCMFI3bmtQdmt6b1ovTGNEcEQzL291UUxBVzN3UkVUTjZnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHSVlqbmtIS1FzLVZLeHdpQ2xOVDJnIiwicGhvbmVJZCI6IjEyMDY4OWU1LThlMTItNDE4NS04ZmUyLWIwYTllNjEyMjEwNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3czZJYko5Qmpqb3M3YmlBRHlCOEo0b0tJSWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2RFWU81TUJTNnJWS2g0UVJUUTB5ckFJWDU0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjkyVFRKS0tFIiwibWUiOnsiaWQiOiIyMjE3NzAxOTM0Mzg6NjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4LyE8J2QmPCdkJTwnZCU8J2Qk/CdkIDgvIQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01hVXJJa0hFTEdsbjcwR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImtBRU9YODRGV256QXZMd3IzOVFaSzNnWXI5UHVwSXoycHdFa0tEQmw2RGc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkRPSEd3Zm90UC9WQUtOR2tNdlc3Tkw1RXUvR0RBMTlVdGc2NVpybHE1YkNSYW0xM2NlbkpIa0ZNMVRzZG0zcDBYWG43elZVRGl6RDIyRW5sZjV0cUNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ1eDhHR3kveW80b1NMR2ZQbWlWb2YxOTg3bGxMVDlQNFJ4c0NieFFOc0JqN3FIaEd0SmlEc0dFbzQzQWJSazR5UCtYOFowZ20zbC9EMzAycG5oSDJCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyMTc3MDE5MzQzODo2NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaQUJEbC9PQlZwOHdMeThLOS9VR1N0NEdLL1Q3cVNNOXFjQkpDZ3daZWc0In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5MDUxNzEwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlUWSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    CAPTION : process.env.CAPTION || "CASEYRHODES-XMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    URL: process.env.URL || "https://files.catbox.moe/yedfbr.jpg",
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
