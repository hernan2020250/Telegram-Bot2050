//
// Este proyecto es un bot simple para telegram nwn
//
const { Telegraf } = require('telegraf')
const axios = require('axios') 
const chalk = require('chalk')
const fs = require("fs")                                                                           

const ajustes = JSON.parse(fs.readFileSync('./informacion.json'))
const botname = ajustes.NombreBot
const creator = ajustes.Creador
const mytoken = ajustes.ToKen

let lolkey = 'NikolaTesla'
let zeks = 'NikolaTesla'
let prefix = '/'

//Comienzo del bot
const nkbot = new Telegraf(mytoken)

//Actividad console
/*nkbot.use((ctx, next) => {
  if(ctx.updateSubTypes[0] == "text"){
    console.log(chalk.green("\n["+ctx.from.first_name+"]" + chalk.white(" Mensaje : ") + chalk.green(ctx.message.text)))
  }else{
    console.log(chalk.green("\n["+ctx.from.first_name+"]" + chalk.white(" Mensaje : ") + chalk.green(ctx.message.text)))
  }
  next();
})*/
//Bienvenida automática
nkbot.on("new_chat_members", (ctx) => {
	const offline =[`Se bienvenid@\n¿Como estas mi amig@ :)?`, `Es bueno volver a verte\n¿Como estas mi amig@ :)?`, `Cuanto tiempo\n¿Como estas mi amig@ :)?`]
	const cringe = offline[Math.floor(Math.random() * (offline.length))]
  console.log("\n[Se detecto un usuario nuevo]\n",ctx.update.message.new_chat_members);
  ctx.update.message.new_chat_members.forEach((user) => {
    var fisrtLastName =
      "[" +
      user.first_name +
      " " +
      (user?.last_name ?? "") +
      "](tg://user?id=" +
      user.id +
      ")";
    var text =
      "@" +
      (user?.username ?? fisrtLastName) + 
      `, ${cringe}`;
    ctx.replyWithVideo({ source: "./multimedia/video/wlc.mp4" }, { caption: text, reply_to_message_id: ctx.message.message_id,})
  });
});

//Despedida automática
nkbot.on('left_chat_member', async ctx => {
console.log("\n",ctx.message.left_chat_member,"\n")
	ctx.reply('C fue un usuario u.u')
})

//Nombre de un grupo actualizado
nkbot.on("new_chat_title", (ctx) => {
console.log("\n[Se actualizo el nombre de un grupo]\n~>",ctx.message.new_chat_title,"\n")
ctx.reply("[Se actualizo el nombre del grupo]\nNombre nuevo : "+ctx.message.new_chat_title)
});

//Mension detector
nkbot.mention('NeKosmic', ctx => {
    ctx.reply('Joder, acaban de mencionar a mi creador principal UwU', {reply_to_message_id: ctx.message.message_id,});
});

//Comando /start
nkbot.start((ctx) => {
	const offline =[`Wenas ${ctx.from.first_name}!!!\n`, `Hola ${ctx.from.first_name}!!!\n`, `Hi ${ctx.from.first_name}!!!\n`, `Bonjour ${ctx.from.first_name}!!!\n`, `Olá ${ctx.from.first_name}!!!\n`, `Quetal ${ctx.from.first_name}!!!\n`, `Namaste ${ctx.from.first_name}!!!\n`, `Konnichi wa ${ctx.from.first_name}!!!\n`, `Hey ${ctx.from.first_name}!!!\n`, `Buenas ${ctx.from.first_name}!!!\n`, `Saludos ${ctx.from.first_name}!!!\n`]
	const cringe = offline[Math.floor(Math.random() * (offline.length))]
    console.log(chalk.green(`\n[${ctx.from.first_name}]`) + chalk.white(` Ejecuto un comando principal`) + chalk.red(`ID : <${ctx.from.id}>`))
//Chat respuesta
    ctx.reply(`${cringe}Si quieres ver mi menu de comandos escribe \n${prefix}menu ≧ω≦`);
});

//prefijo ayuda
nkbot.hears('/', (ctx) => {
	const helpMessage = `Por favor para usar de manera correcta use los comandos\n/start - para comenzar la ejecucion\n/menu - para ver la lista de comandos disponibles`;
    ctx.reply(helpMessage);
})

//Comandos del bot
nkbot.command("menu", ctx => {
    ctx.reply(ctx.from.first_name+" Seleccione el boton de menu\nPara ver el panel de comandos ✓");
    ctx.reply("ᴾᵒʳ ᶠᵃᵛᵒʳ ᵘˢᵉ ᵉˡ ᵇᵒᵗ ᵈᵉ ᵐᵃⁿᵉʳᵃ ᶜᵒʳʳᵉᶜᵗᵃ ᵖᵃʳᵃ ᵉᵛᶦᵗᵃʳ ᵉʳʳᵒʳᵉˢ :³",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Menu ☰', callback_data: 'panelmenu'},
                    { text: 'Apoyo ☯', callback_data: 'apoyo'}
                ]
            ]
        }
    })
}) 

//Panelmenu :v
nkbot.action('panelmenu', ctx => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     const _idbot = ctx.botInfo.id
const _enline = ctx.botInfo.is_bot
const _namebot = ctx.botInfo.first_name
const _botuser = ctx.botInfo.username
const _cliente = ctx.from.first_name
const _cjoingp = ctx.botInfo.can_join_groups
const _readgp = ctx.botInfo.can_read_all_group_messages
const _helpbot = ctx.botInfo.supports_inline_queries
    ctx.editMessageText(`      【❯_】 ${botname}ᴮʸ⁻ᴺᴷ【❯_】
➤ Bot en linea? : ${_enline}
➤ ID Bot : ${_idbot}
➤ Nombre del bot : ${_namebot}
➤ Nombre de usuario : @${_botuser}
➤ Cliente : ${_cliente}
➤ Puede unirse a grupos? : ${_cjoingp}
➤ Leer los mensajes en grupos? : ${_readgp}
➤ Admite consultas? : ${_helpbot}
╔═══════════ 
║╭—————————
║├ ⩿ COMANDOS ⧹⪘
║╰—————————
╚═══════════
╔═══════════
║ ⩿ DESCARGADOR ⧹⪘
║╭—————————
║├${prefix}play [texto]
║├${prefix}ytmp3 [link]
║├${prefix}ytmp4 [link]
║├${prefix}tiktokmsc [link]
║╰—————————
╚═══════════
╔═══════════
║ ⩿ BUSCADOR ⧹⪘
║╭—————————
║├${prefix}ytbuscar [texto]
║├${prefix}google [texto]
║├${prefix}letra [texto]
║╰—————————
╚═══════════
╔═══════════
║ ⩿ CREA LOGOS ⧹⪘
║╭—————————
║├${prefix}logoluz [texto]
║├${prefix}logomatrix [texto]
║├${prefix}vaportext [texto]
║├${prefix}logoph [texto1/texto2]
║├${prefix}glilogo [texto1/texto2]
║├${prefix}sebusca [txt1/txt2/txt3/link4]
║╰—————————
╚═══════════
╔═══════════
║ ⩿ IMAGENES ⧹⪘
║╭—————————
║├${prefix}hentai
║├${prefix}hentai2
║╰—————————
╚═══════════
╔═══════════
║ ⩿ SIN PREFIJO ⧹⪘
║╭—————————
║├djbot
║├dados
║╰—————————
╚═══════════

//Source Code//\n https://github.com/NeKosmic`)
})

//-----UwU-----//
nkbot.command('play', async (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(" ")
    let message = "";
    
    if(inputArray.length == 1){
        message = `Por favor use el comando de manera correcta\nEjemplo de uso ${prefix}play mtc s3rl`
        ctx.reply(message)
    } else{
        inputArray.shift();
        messager = inputArray.join(" ")
        try{
        	const plays = await axios.get (`https://api.zeks.me/api/ytplaymp3?apikey=`+zeks+`&q=`+messager)
        const playzzz = plays.data.result
        ctx.replyWithAudio({url: playzzz.url_audio}, {title: '@NeKosmic'})
        }catch(e){
            ctx.reply(`Ocurrio un error u.u`)
        }
    }
})

//-----UwU-----//
nkbot.command('ytbuscar', (ctx) => { 
	ctx.reply("Buscando, espere...")
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    inputArray.shift();
              message = inputArray.join();
    axios.get('https://api.zeks.me/api/yts?apikey='+zeks+'&q='+message)
    .then(res => {
         let lo = res.data.result
         ctx.reply(`
┏━━❉ *YOUTUBE* ❉━━━┓
┣> Resultados para : ${message}
┗━━━━━━━━━━━━━━━━
┣> Titulo : ${lo[0].video.title}
┣> Publicacion : ${lo[0].video.upload_date}
┣> Vistas : ${lo[0].video.views}
┣> Duracion : ${lo[0].video.duration}
┣> Ur/L/ink : https://youtu.be/${lo[0].video.id}
┗━━━━━━━━━━━━━━━━
┣> Titulo : ${lo[1].video.title}
┣> Publicacion : ${lo[1].video.upload_date}
┣> Vistas : ${lo[1].video.views}
┣> Duracion : ${lo[1].video.duration}
┣> Ur/L/ink : https://youtu.be/${lo[1].video.id}
┗━━━━━━━━━━━━━━━━
┣> Titulo : ${lo[2].video.title}
┣> Publicacion : ${lo[2].video.upload_date}
┣> Vistas : ${lo[2].video.views}
┣> Duracion : ${lo[2].video.duration}
┣> Ur/L/ink : https://youtu.be/${lo[2].video.id}
┗━━━━━━━━━━━━━━━━
┣> Titulo : ${lo[3].video.title}
┣> Publicacion : ${lo[3].video.upload_date}
┣> Vistas : ${lo[3].video.views}
┣> Duracion : ${lo[3].video.duration}
┣> Ur/L/ink : https://youtu.be/${lo[3].video.id}
┗━━━━━━━━━━━━━━━━
┣> Titulo : ${lo[4].video.title}
┣> Publicacion : ${lo[4].video.upload_date}
┣> Vistas : ${lo[4].video.views}
┣> Duracion : ${lo[4].video.duration}
┣> Ur/L/ink : https://youtu.be/${lo[4].video.id}
┗━━━━━━━━━━━━━━━━`); 
    }).catch(e => {
         console.log("\nError en el comando ytbuscar\n"+e)
         ctx.reply(`Por favor ingrese un link valido\nEjm de uso : ${prefix}ytbuscar shitpost short`)
   })
})

//-----UwU-----//
nkbot.command('ytmp4', (ctx) => {
    ctx.reply('Tunggu.....')
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    inputArray.shift();
              message = inputArray.join(" ");                                                                                                                                                                 
    axios.get("https://api.zeks.me/api/ytmp4?apikey="+zeks+"&url="+message)
    .then(res => {
         //console.log(res);
         ctx.replyWithVideo(res.data.result.url_video);
    }).catch(e => {
         console.log("\nError en el comando ytmp4\n"+e)
         ctx.reply(`Por favor ingrese un link valido\nEjm de uso : ${prefix}ytmp4 https://youtu.be/ed-6VSF-GGc`)
   })
})

//-----UwU-----//
nkbot.command('ytmp3', (ctx) => {
    ctx.reply('Tunggu.....')
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    inputArray.shift();
              message = inputArray.join(" ");                                                                                                                                                                 
    axios.get("https://api.zeks.me/api/ytmp3?apikey="+zeks+"&url="+message)
    .then(res => {
         //console.log(res);
         ctx.replyWithAudio(res.data.result.url_audio);
    }).catch(e => {
    	console.log("\nError en el comando ytmp3\n"+e)
         ctx.reply(`Por favor ingrese un link valido\nEjm de uso : ${prefix}ytmp3 https://youtu.be/ed-6VSF-GGc`)
   })
})

//-----UwU-----//
nkbot.command('tiktokmsc', async (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(" ")
    let message = "";
    
    if(inputArray.length == 1){
        message = `Ejemplo de uso : ${prefix}tiktokmsc https://vm.tiktok.com/ZM8p2f7NW/`
        ctx.reply(message)
    } else{
        inputArray.shift();
        messager = inputArray.join(" ")
        try{                                                                                                                                 
        ctx.replyWithAudio({url: 'https://api.lolhuman.xyz/api/tiktokmusic?apikey='+lolkey+'&url='+messager}, {title: '@NeKosmic'})
        }catch(e){
            ctx.reply(`Link invalido [ ! ]\nPor favor use bien el comando\nEjemplo de uso : ${prefix}tiktokmsc https://vm.tiktok.com/ZM8p2f7NW/`)
        }
    }
})

//-----UwU-----//
nkbot.hears(['djbot','Djbot'], async (ctx) => {
    try{                                                                                                                                                                                              
    const links = await axios.get (`https://pastebin.com/raw/W8jLrvcq`)
    const linkzzz = links.data
    const brandom = linkzzz[Math.floor(Math.random() * (linkzzz.length))]                                                                                                                                                                                           
    ctx.replyWithAudio({url: brandom.resulptt}, {title: '@NeKosmic'});
    
    }catch(e){
    	ctx.reply('Ocurrio un error u.u')
    }
})

//-----UwU-----//
nkbot.command(['hentai','Hentai'], async (ctx) => {
    try{
    const link = await axios.get (`https://waifu.pics/api/nsfw/waifu`)
    ctx.replyWithPhoto({ url: link.data.url}, { caption: `🥵🤙`})
    
    }catch(e){
    	ctx.reply(`Ocurrio un error, reintente nuevamente u.u`)
    }
})

//-----UwU-----//
nkbot.command(['hentai2','Hentai2'], async (ctx) => {
    try{
    const link = await axios.get (`https://akaneko-api.herokuapp.com/api/hentai`)
    ctx.replyWithPhoto({ url: link.data.url}, { caption: `🥵🤙`})
    
    }catch(e){
    	ctx.reply(`Ocurrio un error, reintente nuevamente u.u`)
    }
})

//-----UwU-----//
nkbot.command('letra', (ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    inputArray.shift();
              message = inputArray.join(" ");

    axios.get('https://api.lolhuman.xyz/api/lirik?apikey='+lolkey+'&query='+message)
    .then(res => {
         //console.log(res);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
             ctx.reply(`Resultado para : ${message}\n\n${res.data.result}`)
    }).catch(e => {
         console.log(e);
         ctx.reply(`Ejemplo de uso : ${prefix}letra oh me vengo`)
   })
})

//-----UwU-----//
nkbot.command('google', ctx => {
    let input = ctx.message.text;
    ctx.reply('Buscando resultados\nEspere...')
        let inputArray = input.split(" ");
        inputArray.shift();
        let link = inputArray.join(" ")
    axios.get('https://google-api.xlaaf.repl.co/search?q='+link).then(res => {
    const linke = res.data.data
    const g = linke[Math.floor(Math.random() * (linke.length))]
    ctx.reply('[GOOGLE]\n➥Resultados para: '+link+'\n➥'+g.title+'\n➥Url directo : '+g.link+'\n➥Descripcion: '+g.desk)
    })
  })
    
//-----UwU-----//
nkbot.command('logoluz', async (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(" ")
    let message = "";
    
    if(inputArray.length == 1){
        message = "Ejemplo de uso: /logoluz uwu"
        ctx.reply(message)
    } else{
        inputArray.shift();
        burik = inputArray.join(" ")
        try{                                                                                                                                                                                                                      
            ctx.replyWithPhoto({url: 'https://api.zeks.me/api/tlight?apikey='+zeks+'&text='+burik})
        }catch(e){
        	ctx.reply(`Ocurrio un error`)
        }
    }
})

//-----UwU-----//
nkbot.command('logomatrix', async (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(" ")
    let message = "";
    
    if(inputArray.length == 1){
        message = `Ejemplo de uso: ${prefix}logomatrix UwU`
        ctx.reply(message)
    } else{
        inputArray.shift();
        text1 = inputArray.join(" ")
        try{                                                                                                                                                                                                                      
            ctx.replyWithPhoto({url: 'https://api.zeks.me/api/matrix?apikey='+zeks+'&text='+text1})
        }catch(e){
        	ctx.reply(`Ocurrio un error`)
        }
    }
})

//-----UwU-----//
nkbot.command('vaportext', async (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(" ")
    let message = "";
    
    if(inputArray.length == 1){
        message = `Ejemplo de uso: ${prefix}vaportext onichan`
        ctx.reply(message)
    } else{
        inputArray.shift();
        text1 = inputArray.join(" ")
        try{                                                                                                                                                                                                                      
            ctx.replyWithPhoto({url: 'https://api.zeks.me/api/dropwater?apikey='+zeks+'&text='+text1})
        }catch(e){
        	ctx.reply(`Ocurrio un error`)
        }
    }
})

//-----UwU-----//
nkbot.command('logoph', async (ctx) => {
    let input = ctx.message.text  
    const peak = input.trim().substring(input.indexOf(' ') + 1)
    if (peak.length >= 2) {
    const jaki = peak.split(`|`)[0]
    const gans = peak.split(`|`)[1]
    if(!jaki, !gans){
        ctx.reply('Ejemplo de uso: /logoph Ne|Kosmic')
    }else{                                                                                                                                                                                                                                                           
    ctx.replyWithPhoto({url: 'https://api.zeks.me/api/phlogo?apikey='+zeks+'&text1='+jaki+'&text2='+gans})
        }
    }else{
        ctx.reply(`Por favor use bien el comando\nEjemplo de uso: /logoph Ne|Kosmic`)
    }
})

//-----UwU-----//
nkbot.command('glilogo', async (ctx) => {
    let input = ctx.message.text  
    const peak = input.trim().substring(input.indexOf(' ') + 1)
    if (peak.length >= 2) {
    const jaki = peak.split(`|`)[0]
    const gans = peak.split(`|`)[1]
    if(!jaki, !gans){
        ctx.reply(`Ejemplo de uso: /${prefix}glilogo nikola|tesla`)
    }else{                                                                                                                                                                                                                                                           
    ctx.replyWithPhoto({url: 'https://api.zeks.me/api/gtext?apikey='+zeks+'&text1='+jaki+'&text2='+gans})
        }
    }else{
        ctx.reply(`Por favor use bien el comando\nEjemplo de uso: ${prefix}glilogo nikola|tesla`)
    }
})

//-----UwU-----//
nkbot.command('sebusca', async (ctx) => {
    let input = ctx.message.text  
    const horiz = input.trim().substring(input.indexOf(' ') + 1)
    if (horiz.length >= 2) {
    const text1 = horiz.split(`|`)[0]
    const text2 = horiz.split(`|`)[1]
    const text3 = horiz.split(`|`)[2]
    const text4 = horiz.split(`|`)[3]
    if(!text1, !text2, !text3, !text4){
        ctx.reply(`Ejemplo de uso: ${prefix}sebusca Se busca el name|recompensa|1000000 $|https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYiykBrY7_AojYyvA2Hj480HQJYmkwRpbNdQ&usqp=CAU`)
    }else{                                                                                                                                                                                                                                                           
    ctx.replyWithPhoto({url: 'https://api.zeks.me/api/missing-image?apikey='+zeks+'&image='+text4+'&text1='+text1+'&text2='+text2+'&text3='+text3})
        }
    }else{
        ctx.reply(`Por favor use bien el comando\nEjemplo de uso: ${prefix}sebusca Se busca el name|recompensa|1000000 $|https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYiykBrY7_AojYyvA2Hj480HQJYmkwRpbNdQ&usqp=CAU`)
    }
})

//-----UwU-----//
nkbot.hears(['dados','Dados'], async (ctx) => {
    try{
    	dados = ["https://www.random.org/dice/dice1.png","https://www.random.org/dice/dice2.png","https://www.random.org/dice/dice3.png","https://www.random.org/dice/dice4.png","https://www.random.org/dice/dice6.png"]
    const brandos = dados[Math.floor(Math.random() * (dados.length))]
    ctx.replyWithPhoto({ url: brandos}, { caption: `ᴱˢᵃ ᶜᵃˡᶦᵈᵃᵈ ᵖᵃᵖᵃ ᶠᵘˡˡ ᵃˢʰᵉᵈᵉ ⁴ᵏ`})
    
    }catch(e){
    	ctx.reply(`Ocurrio un error, reintente nuevamente u.u`)
    }
})

//apoyo 1
nkbot.action('apoyo', (ctx) => {
    let priceMessage = `Gracias por tu apoyo mi king ;3`;
    nkbot.telegram.sendMessage(ctx.chat.id, priceMessage,
    {
        reply_markup: {
            keyboard: [
                [
                    {text: 'Redes Sociales'},
                    {text: "WhatsApp Bot"},
                    {text: "Discord Bot"}
                ],
                [
                    {text: 'Quitar Teclado ✓'}
                ]
            ]
        }
    })
})

//Apoyo 2
nkbot.hears('Redes Sociales', ctx => {
    let maker = `Se te agradece un millon por tu apoyo <3\n\nhttps://nekosmic.wordpress.com/`
    ctx.deleteMessage()
    nkbot.telegram.sendMessage(ctx.chat.id, maker,
        {
            reply_markup: {
                keyboard: [
                [
                    {text: 'Canal De YouTube'},
                    {text: "Cuenta Tik Tok"},
                    {text: "Pagina De Facebook"}
                ],
                [
                    {text: 'Quitar Teclado ✓'}
                ]
            ]
        }
    })
})

//Apoyo 3
nkbot.hears('Canal De YouTube', (ctx) => {
    ctx.reply(`https://youtube.com/channel/UC_Pp8pT9vbT15k5_-i6oseA`);
})

//Apoyo 4
nkbot.hears('Cuenta Tik Tok', (ctx) => {
    ctx.reply(`https://vm.tiktok.com/ZM8sgQPMx/`);
})

//Apoyo 5
nkbot.hears('Pagina De Facebook', (ctx) => {
    ctx.reply(`https://www.facebook.com/100141551532052/posts/345306607015544/`);
})

//Apoyo 6
nkbot.hears('WhatsApp Bot', ctx => {
    ctx.reply(`Bot simple para WhatsApp, Tiene un api libre e ilimitado en la mayoría de comandos ;)
    
[ Contenido del bot ] :

~>Bienvenida automatica

~>Anti - Links

~>Anti - Fakes

~>Anti - Spam

~>Anti - Estranjeros

~>Creador de stickers

~>Modo NSFW

~>Etc...

https://github.com/NeKosmic/NK-BOT`)
})

//apoyo 7
nkbot.hears('Discord Bot', ctx => {
    ctx.reply(`Coming Soon...
https://github.com/NeKosmic`)
})

//Apoyo 8
nkbot.hears('Quitar Teclado ✓', ctx => {
    ctx.deleteMessage()
    nkbot.telegram.sendMessage(ctx.chat.id,'Se quito el teclado exitosamente ✓',
    {
        reply_markup: {
            remove_keyboard: true
        }
    })
})






























//-----UwU-----//
nkbot.hears(['onichan', 'Onichan', 'oni-chan', 'Oni-chan'], (ctx) => {
    return ctx.replyWithAudio({ source: "./multimedia/audio/onich.m4a" }, {title: '@NeKosmic'});
});

//-----UwU-----//
nkbot.hears(['yamete', 'Yamete'], (ctx) => {
    return ctx.replyWithAudio({ source: "./multimedia/audio/yamete.m4a" }, {title: '@NeKosmic'});
});

//-----UwU-----//
nkbot.hears(['yamete kudasai', 'Yamete kudasai', 'Yamete Kudasai', 'yamete Kudasai'], (ctx) => {
    return ctx.replyWithAudio({ source: "./multimedia/audio/ya.m4a" }, {title: '@NeKosmic'});
});

//-----UwU-----//
nkbot.hears(['baka', 'Baka'], (ctx) => {
    return ctx.replyWithAudio({ source: "./multimedia/audio/baka.m4a" }, {title: '@NeKosmic'});
});

//-----UwU-----//
nkbot.hears(['araara', 'ara ara', 'Ara Ara', 'ara Ara', 'Ara ara'], (ctx) => {
    return ctx.replyWithAudio({ source: "./multimedia/audio/araara.m4a" }, {title: '@NeKosmic'});
});



//Bot conectado ✓
nkbot.launch()
console.log(chalk.blue("<[ "+botname+" ]>\n") + '\nSe conecto exitosamente a telegram ' + chalk.white('✓\n'));
console.log(chalk.cyan.underline('~> Telegram Token : \n',mytoken));
console.log(chalk.green('\n~> Bot ejecutado por : ' + chalk.green.underline.bold(creator) + ' ✓'));
