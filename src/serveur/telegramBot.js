const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { leave } = Stage
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

const stepHandler = new Composer()
stepHandler.action('next', (ctx) => {
  ctx.reply('Quel est le nom de votre plante?')
  return ctx.wizard.next()
})
stepHandler.command('next', (ctx) => {
  ctx.reply('Quel est le nom de votre plante?')
  return ctx.wizard.next()
})
stepHandler.command('leave', (ctx) => {
  ctx.reply('Vous quittez la creation de plante')
  return ctx.scene.leave()
})
stepHandler.use((ctx) => ctx.replyWithMarkdown('Appuyez sur le boutton `Oui` ou tappez /next'))

const superWizard = new WizardScene('super-wizard',
  (ctx) => {
    ctx.reply('Souhaitez-vous creer une nouvelle plante?', Markup.inlineKeyboard([
      Markup.callbackButton('Oui', 'next'),
      Markup.callbackButton('Quitter', 'leave')
    ]).extra())
    return ctx.wizard.next()
  },
  stepHandler,
  (ctx) => {
    ctx.reply('Entrez la description de votre '+ctx.message.text +':')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('Saisissez les instructions d\'arrosage: (nb * par mois)')
    return ctx.wizard.next()
  }
  ,
  (ctx) => {
    ctx.reply('A quand remonte le dernier arrosage ?')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('Done')
    return ctx.scene.leave()
  }
)
const stage = new Stage()
stage.register(superWizard)

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(session())
bot.use(stage.middleware())

bot.hears('hi', (ctx) => {
	ctx.reply('Bienvenue sur la configuration de votre dashboard!')
})
bot.command('/createPlant', (ctx) => ctx.scene.enter('super-wizard'))
bot.command('cancel', leave())

bot.startPolling()