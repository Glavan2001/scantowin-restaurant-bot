const TelegramBot = require('node-telegram-bot-api');
const { createClient } = require('@supabase/supabase-js');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const MINI_APP_URL = 'https://scantowin.app/restaurant-bot';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    '👋 Bun venit la ScanToWin Restaurant!\n\nGestionează-ți restaurantul direct din Telegram.',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📊 Statistici & Scanner', web_app: { url: MINI_APP_URL } }]
        ]
      }
    }
  );
});

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
      'Folosește butonul de mai jos pentru a accesa panoul restaurantului:',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🍽️ Deschide Panoul', web_app: { url: MINI_APP_URL } }]
          ]
        }
      }
    );
  }
});

console.log('ScanToWin Restaurant Bot is running...');
