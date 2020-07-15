// requisitos básicos para funcionalidade/organização do bot. 

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const ms = require("ms");
const fs = require("fs");
const mongoose = require("mongoose");
const dailycooldown = new Set();
const clainonce = new Set();
const Money = require("./money.js");
const Schema = mongoose.Schema
const firebase = require("firebase");

const unhand = async () => {
    return Promise.reject('Oops!').catch(err => {
      throw new Error(err);
    });
  };
  
  unhand()
    .then(console.log)
    .catch(function(e) {
      console.log(e);
    });

var firebaseConfig = {
    apiKey: "AIzaSyBV1ZjRQohpt5bNJ8eUruhh_nZshbQYrL8",
    authDomain: "level-chiaki.firebaseapp.com",
    databaseURL: "https://level-chiaki.firebaseio.com",
    projectId: "level-chiaki",
    storageBucket: "level-chiaki.appspot.com",
    messagingSenderId: "1079828765444",
    appId: "1:1079828765444:web:0eb7ef4238177e8ed18e51",
    measurementId: "G-VZKC18ZGLT"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


  const database = firebase.database()


mongoose.connect("mongodb+srv://YusakuAckerman:YosugaNoSora@coinsystemchiaki-jgqtg.mongodb.net/CoinSystemChiaki?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectada com sucesso"));

// ----------------------------------------------------------------------

let date_ob = new Date();

// Dia
let date = ("0" + date_ob.getDate()).slice(-2);

// Mês
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// Ano
let year = date_ob.getFullYear();

// Hora
let hora = ("0" + (date_ob.getHours() + 1)).slice(-2) - 4;

// Minutos
let minutos = ("0" + (date_ob.getMinutes() + 1)).slice(-2);

// 
let datahoje = (date + "/" + month + "/" + year + " às: " + hora + ":" + minutos );

// ----------------------------------------------------------------------


// Evento para setar a atividade do bot.

client.on("ready", async () => {
    console.log(`${client.user.tag} está online!`);
    client.user.setStatus('available')
    client.user.setActivity('use .help em caso de dúvidas!')
});

// Script para Welcome.

client.on('messageDelete', async message => {

    if (message.author.bot) 
        return;

        if (message.channel.type === 'dm')
            return;
    
    logembed = new Discord.MessageEmbed()
    .setDescription(`**Messagem Deletada**`)
    .setColor("#4d00a6")
    .setThumbnail(message.author.avatarURL())
    .addField("Autor da Mensagem:", `${message.author} (${message.author.id})`)
    .addField("Canal: ", `${message.channel.name}`)
    .addField("Mensagem deletada:", `${message.content}`)
    .addField("Dia:", datahoje);
     
    message.guild.channels.cache.find(log => log.id === '732670112905298000')
    .send(logembed);

})

client.on('guildMemberAdd', member => {

    let Welcome = botconfig.Welcome;
    let wImage = Math.floor(Math.random() * Welcome.length);
    
    const channel = member.guild.channels.cache.find(ch => ch.id === '717033854199660599');
        if (!channel) return;

    const embed = new Discord.MessageEmbed().setTitle("Bem vindo!!")
    .setColor('#04ff00')
    .setDescription(`Olá ${member}! Seja bem vindo ao servidor!`)
    .setImage(Welcome[wImage])
    .setFooter('Mafia dos Games © 2020.')
    channel.send(embed);

})



// Comandos com prefixo 

client.on("message", async message => {

    if(message.channel.type === "dm") 
        return;

        let lv1role = message.guild.roles.cache.find(lvup => lvup.id === '687793211384791050');
        let lv5role = message.guild.roles.cache.find(lvup => lvup.id === '687793237913501740');
        let lv10role = message.guild.roles.cache.find(lvup => lvup.id === '687793282041774138');
        let lv20role = message.guild.roles.cache.find(lvup => lvup.id === '687793309502275623');
        let lv30role = message.guild.roles.cache.find(lvup => lvup.id === '687793327818407971');
        let lv40role = message.guild.roles.cache.find(lvup => lvup.id === '687793350220316690');
        let lv50role = message.guild.roles.cache.find(lvup => lvup.id === '687793371879702586');
        let lv60role = message.guild.roles.cache.find(lvup => lvup.id === '687793369774161923');
        let lv70role = message.guild.roles.cache.find(lvup => lvup.id === '712396992667582534');
        let lv80role = message.guild.roles.cache.find(lvup => lvup.id === '712397033415245854');
        let lv85role = message.guild.roles.cache.find(lvup => lvup.id === '712397071470297178');


    global.xp = '';
    global.nextlevel = '';
    let xpadd = Math.floor(Math.random() * 22) + 18;

    database.ref(`Level/${message.author.id}`)
        .once('value').then(async function(snap) {
            if (snap.val() === null ) {
                database.ref(`Level/${message.author.id}`)
                    .set({
                        xp: 0,
                        level: 0
                    })
            } else { 

                xp = snap.val().xp + xpadd;
                nextlevel = snap.val().level * 425;
                database.ref(`Level/${message.author.id}`)
                    .update({
                        xp: xp
                    })
                if (nextlevel <= xp ) {
                    nextlevel = snap.val().level + 1
                    database.ref(`Level/${message.author.id}`)
                        .update({
                            xp: 0,
                            level: nextlevel
                        })
                    if (message.author.bot) 
                        return

                        if (nextlevel === 1) {
                            message.member.roles.add(lv1role);
                        }
                    
                        if (nextlevel === 5) {
                            message.member.roles.add(lv5role);
                        }
                    
                        if (nextlevel === 10) {
                            message.member.roles.add(lv10role);
                        }
                    
                        if (nextlevel === 20) {
                            message.member.roles.add(lv20role);
                        }
                        
                        if (nextlevel === 30) {
                            message.member.roles.add(lv30role);
                        }
                    
                        if (nextlevel === 40) {
                            message.member.roles.add(lv40role);
                        }
                    
                        if (nextlevel === 50) {
                            message.member.roles.add(lv50role);
                        }
                    
                        if (nextlevel === 60) {
                            message.member.roles.add(lv60role);
                        }
                    
                        if (nextlevel === 70) {
                            message.member.roles.add(lv70role);
                        }
                    
                        if (nextlevel === 80) {
                            message.member.roles.add(lv80role);    
                        }
                    
                        if (nextlevel === 85) {
                            message.member.roles.add(lv85role);
                        } 


                    const nxtlevelembed = new Discord.MessageEmbed().setColor("#80adbd")
                    .setDescription(`Parabéns, você avançou para o **level ${nextlevel}**`)

                try {
                    message.author.send(nxtlevelembed);
                } catch(e) {
                    console.log(`não pude enviar mensagem no pv para ${message.author}`);
                }
                    
                }
            }
        })

// variáveis para lógica

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

/* inicio dos comandos de server */

// Give Creater

if (cmd.startsWith(`${prefix}creator`)) {

    await message.delete(message)

    if (!message.member.roles.cache.find(founder => founder.id === '679122758596296704'))
        return; 

    let creator = message.guild.member(message.mentions.users.first());
    let creatorRole = message.guild.roles.cache.find(cr => cr.id === '686718076355739648');
    let gmrole = message.guild.roles.cache.find(gm => gm.id === '687785376726777935')

    if (creator.id === message.author.id) {
        return;
    }

    creator.roles.add(creatorRole);
    creator.roles.add(gmrole);

    let creatorembed = new Discord.MessageEmbed().setTitle("Bem vindo ao time!")
    .setColor("#fcfcfc")
    .setDescription(`Parabéns por ter entrado para a equipe ${creator}! Sua função é: ${creatorRole}!`);

    message.channel.send(creatorembed);

}

// Give Streamer

if (cmd.startsWith(`${prefix}streamer`)) { 

    await message.delete(meessage)

    if (!message.member.roles.cache.find(founder => founder.id === '679122758596296704'))
        return; 

    let streamer = message.guild.member(message.mentions.users.first());
    let streamerRole = message.guild.roles.cache.find(st => st.id === '686718946732277778');
    let gmrole = message.guild.roles.cache.find(gm => gm.id === '687785376726777935')

    streamer.roles.add(streamerRole);
    streamer.roles.add(gmrole);

    let streamerembed = new Discord.MessageEmbed().setTitle("Bem vindo ao time!")
    .setColor("#724abe")
    .setDescription(`Parabéns por ter entrado para a equipe ${streamer}! Sua função é: ${streamerRole}!`);

    message.channel.send(streamerembed);

}

// Give Designer

if (cmd.startsWith(`${prefix}designer`)) {

    await message.delete(message)

    if (!message.member.roles.cache.find(founder => founder.id === '679122758596296704'))
        return; 

    let designer = message.guild.member(message.mentions.users.first());
    let designerRole = message.guild.roles.cache.find(dsg => dsg.id === '717473248258031717');
    let gmrole = message.guild.roles.cache.find(gm => gm.id === '687785376726777935')

    designer.roles.add(designerRole);
    designer.roles.add(gmrole);

    let designerembed = new Discord.MessageEmbed().setTitle("Bem vindo ao time!")
    .setColor("#0ec70e")
    .setDescription(`Parabéns por ter entrado para a equipe ${designer}! Sua função é: ${designerRole}!`);

    message.channel.send(designerembed);

}

// Give Support

if (cmd.startsWith(`${prefix}support`)) {

    await message.delete(message)

    if (!message.member.roles.cache.find(founder => founder.id === '679122758596296704'))
        return; 

    let support = message.guild.member(message.mentions.users.first());
    let supportRole = message.guild.roles.cache.find(sup => sup.id === '717473096373895292');
    let gmrole = message.guild.roles.cache.find(gm => gm.id === '687785376726777935')

    support.roles.add(supportRole);
    support.roles.add(gmrole);

    let supportembed = new Discord.MessageEmbed().setTitle("Bem vindo ao time!")
    .setColor("#4a4aca")
    .setDescription(`Parabéns por ter entrado para a equipe ${support}! Sua função é: ${supportRole}!`);

    message.channel.send(supportembed);

}

// My Level

if (cmd.startsWith(`${prefix}mylevel`)) {

    database.ref(`Level/${message.author.id}`)
        .once("value").then(async function(snap) {
            currxp = snap.val().xp;
            currlevel = snap.val().level;
            tonext = snap.val().level * 425;
            diff = tonext - currxp; 

            const mylevelembed = new Discord.MessageEmbed().setTitle("Nivel de respeito:")
            .setColor("#06ced1")
            .setDescription(`Sua XP atual é: **${currxp}** \n
            XP necessária para o próximo level: **${tonext}** \n
            Seu level atual é: **${currlevel}** \n`)
            .setFooter(`Xp para o próximo level: ${diff}`);

            message.channel.send(mylevelembed);
        });

}

// Set level 

if (cmd.startsWith(`${prefix}setlevel`)) {

    if (!message.member.roles.cache.find(fnd => fnd.id === '679122758596296704')
    && !message.member.roles.cache.find(exp => exp.id === '712381429761441933')
    && !message.member.roles.cache.find(snr => snr.id === '712741074019287061')) 
            return message.reply("Apenas Game Masters experientes possuem permissão para usar este comando.");

    

    let userLevel = message.guild.member(message.mentions.users.first());
    let newLevel = parseInt(args[1]);

    if (userLevel.roles.cache.find(gm => gm.id === '687785376726777935')) 
        return message.reply("Você não pode alterar o level de outro Game Master! Isso inclui o seu, espertinho.")
    
    if (isNaN(newLevel)) {
        return message.reply("Um número, por favor.");
    }

    database.ref(`Level/${userLevel.id}`)
        .update({
            xp: 0,
            level: newLevel
        });

        const cmdembed = new Discord.MessageEmbed().setColor("fcfcfc")
        .setDescription(`${message.author} setou o nivel de ${sendUser} para ${newLevel}`);
    
        message.guild.channels.cache
        .find(cmd => cmd.id === '688172961168883747')
        .send(cmdembed);

}

if (cmd.startsWith(`${prefix}letbangif`)) {
    let varteste = args[0]

    if (message.content.includes("http")) {
        return message.channel.send("É um link.")
    } else {
        return message.channel.send("Não é um link.")
    }
}

// Daily Coins

if (cmd.startsWith(`${prefix}daily`)) {

    if (dailycooldown.has(message.author.id)) {
            message.channel.send("Você já reinvindicou suas Mafia Coins diárias.");
    } else {

        let mafiacoinsAdd = Math.floor(Math.random() * 200) + 200 

        Money.findOne({
        userID: message.author.id,
            
        }, (err, coins) => {
            if (!coins) {
                const newCoins = new Money({
                    userID: message.author.id,
                    coins: mafiacoinsAdd
                    })
                newCoins.save();
                message.reply(`Você recebeu ${mafiacoinsAdd} Mafia Coins diárias`);

            } else { 
                coins.coins = coins.coins + mafiacoinsAdd;
                    coins.save();
                        message.reply(`Você recebeu ${mafiacoinsAdd} Mafia Coins diárias`);
            }
        })
              
    }

dailycooldown.add(message.author.id);

    setTimeout(() => {
        dailycooldown.delete(message.author.id);
    }, ms("1d")); // Fim Daily Coins
}
// My Coins

if (cmd.startsWith(`${prefix}mycoins`)) {
    
    Money.findOne({
        userID: message.author.id
    }, (err, coins) => {
        if (!coins) {

            let nocoinembed = new Discord.MessageEmbed().setColor("#4307b3")
            .setDescription(`${message.author} Você possui 0 Mafia Coins.`)

            message.channel.send(nocoinembed);
        } else { 

            let hascoinembed = new Discord.MessageEmbed().setColor("#4307b3")
            .setDescription(`${message.author} Você possui ${coins.coins} Mafia Coins.`)

            message.channel.send(hascoinembed);

        }
    }) 
} // Fim My Coins

// Comando de sendcoins

if (cmd.startsWith(`${prefix}sendcoins`)) {

    let sendUser = message.guild.member(message.mentions.users.first());
    let amt = parseInt(args[1]);

    if (sendUser.id === message.author.id) {
        return message.reply("Haha, nice try.");
    }
    
    if (!sendUser) {
        return message.reply("Mencione quem você deseja enviar as coins");
    }

    if (!amt) {
        return message.reply("Diga a quantidade, por favor. E que de preferência seja um número.")
    }
    
    if (isNaN(args[1])) {
        return message.reply("Aham, engraçadinho.");
    }

    Money.findOne({
        userID: message.author.id
    }, (err, coins) => {
        if (coins.coins < amt || !coins) {
            return message.reply("Você não possui coins para realizar a transação.");
        } else {
            coins.coins = coins.coins - amt;
            coins.save();
        }

        Money.findOne({
            userID: sendUser.id 
        }, (err, coins) => {
            if (!coins) {
                const newCoins = new Money({
                    userID: sendUser.id,
                    coins: amt
                })
                newCoins.save();
                    message.reply(`Você deu ${amt} das suas coins para ${sendUser}`);
            } else { 
                coins.coins = coins.coins + amt;
                    coins.save();
                        message.reply(`Você deu ${amt} das suas coins para ${sendUser}`);
            }
        })
    })



} // Fim Send Coins

if (cmd.startsWith(`${prefix}givecoins`)) {

    //Check de roles
    if (!message.member.roles.cache.find(fnd => fnd.id === '679122758596296704')
    && !message.member.roles.cache.find(exp => exp.id === '712381429761441933')
    && !message.member.roles.cache.find(snr => snr.id === '712741074019287061')) 
            return message.reply("Apenas Game Masters experientes possuem permissão para usar este comando."); 


    let sendUser = message.guild.member(message.mentions.users.first());
    let amt = parseInt(args[1])

    if (!sendUser) {
        return message.reply("Mencione quem você quer que receba a doação de coins.");
    }

    if (isNaN(amt) || amt === 0) {
        return message.reply("Tá bom, engraçadinho.");
    }

    Money.findOne({
        userID: sendUser.id
    }, (err, coins) => {
        if (!coins) {
            const newCoins = new Money({
                userID: sendUser.id,
                coins: amt
            })
            newCoins.save();
        } else {
            coins.coins = coins.coins + amt;
            coins.save();

            const cmdembed = new Discord.MessageEmbed().setColor("fcfcfc")
            .setDescription(`${message.author} deu ${amt} Mafia Coins para ${sendUser}`);
        
            message.guild.channels.cache
            .find(log => log.id === '717103392878493787')
            .send(cmdembed);
        }
    })



}

// Debt Coins

if (cmd.startsWith(`${prefix}debtcoins`)) {

    //Check de roles
    if (!message.member.roles.cache.find(fnd => fnd.id === '679122758596296704')
    && !message.member.roles.cache.find(exp => exp.id === '712381429761441933')
    && !message.member.roles.cache.find(snr => snr.id === '712741074019287061')) 
            return message.reply("Apenas Game Masters experientes possuem permissão para usar este comando."); 


    let sendUser = message.guild.member(message.mentions.users.first());
    let amt = parseInt(args[1])

    if (!sendUser) {
        return message.reply("Mencione quem você quer que receba a doação de coins.");
    }

    if (isNaN(amt) || amt === 0) {
        return message.reply("Tá bom, engraçadinho.");
    }

    Money.findOne({
        userID: sendUser.id
    }, (err, coins) => {
        if (!coins) {
            const newCoins = new Money({
                userID: sendUser.id,
                coins: 0
            })
            newCoins.save();
            message.reply("O usuário não possuia nenhuma coin.")
        } else if (coins.coins < amt) {
            message.reply("Este usuário possui menos coins do que você quer retirar.");
        } else {
            coins.coins = coins.coins - amt
            coins.save();   

            const cmdembed = new Discord.MessageEmbed().setColor("fcfcfc")
            .setDescription(`${message.author} retirou ${amt} Mafia Coins de ${sendUser}`);
        
            message.guild.channels.cache
            .find(log => log.id === '717103392878493787')
            .send(cmdembed);
        }
    })


}

 // Comando para ver as cores do servidor.

 if (cmd.startsWith(`${prefix}colors`)) {
    let colors = message.guild.roles.cache.filter(role => role.name.startsWith("Color: "));

    const colorembed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setDescription(colors.array().join(" \n  "))
    .setFooter("Para adicionar uma cor, use .color (nome da cor), custa 200 Mafia Coins.")

    message.channel.send(colorembed);
}

// Comando para colocar cores

if (cmd.startsWith(`${prefix}coloradd`)) {
    let colors = message.guild.roles.cache.filter(role => role.name.startsWith("Color: "));
    let str = args.join(" ");
    let colortoadd = colors.find(role => role.name.slice(7).toLowerCase() === str.toLowerCase())

    if (!colortoadd) 
        return message.reply("Verifique se digitou o nome da cor corretamente!");

    try {
        
        if (message.member.roles.cache.find(vip => vip.id === '712750471067992116')){
           await message.member.roles.remove(colors);
            
                message.member.roles.add(colortoadd);

            const sendcolorembed = new Discord.MessageEmbed().setColor("#fcfcfc")
            .setDescription(`${message.author} Você trocou de cor! \n
            Nova cor: ${colortoadd}!`)

            message.channel.send(sendcolorembed)
        } else {

            Money.findOne({
                userID: message.author.id
            }, (err, coins) => {

                if (coins.coins < 200) {
                    return message.reply("Você não tem dinheiro para trocar de cor!");
                }
                 else {
                    message.member.roles.remove(colors);
                        message.member.roles.add(colortoadd);
                            coins.coins = coins.coins - 200;
                    coins.save();

                    const sendcolorembed = new Discord.MessageEmbed().setColor("#fcfcfc")
                    .setDescription(`${message.author} Você trocou de cor por 200 Mafia coins! \n
                    Nova cor: ${colortoadd} / Atual saldo de Coins: ${coins.coins}!`);

                    message.channel.send(sendcolorembed);
                }
            })
        }
    } 
    catch(e) {
        message.channel.send(`Algo inesperado aconteceu, caso persista, fale com ${owner}`); 
    }

}

    // Comando para remoção de cor.

if (cmd.startsWith(`${prefix}removecolor`)) {
        let colors = message.guild.roles.cache.filter(role => role.name.startsWith("Color: "));
        let str = args.join(" ");
        let colortoremove = colors.find(role => role.name.slice(7).toLowerCase() === str.toLowerCase())

        if (!colortoremove) 
            return message.reply("Verifique se digitou o nome da cor corretamente!");

        try {

            if (!message.member.roles.cache.find(vip => vip.id === '712750471067992116')) {

            message.member.roles.remove(colors);

            Money.findOne({
                userID: message.author.id,
            }, (err, coins) => {
                if (!coins) {

                    const newCoins = new Money({
                        userID: message.author.id,
                        coins: 100
                    })
                    newCoins.save();

                    const removecolorembed = new Discord.MessageEmbed().setColor("#fcfcfc")
                    .setDescription(`${message.author} Você removeu a cor: ${colortoremove}! \n
                    Seu novo saldo: ${coins.coins}`);

                    message.channel.send(removecolorembed);
                } else {

                    coins.coins = coins.coins + 100;
                    coins.save();

                    const removecolorembed = new Discord.MessageEmbed().setColor("#fcfcfc")
                    .setDescription(`${message.author} Você removeu a cor: ${colortoremove}! \n
                    Seu novo saldo: ${coins.coins}`);

                    message.channel.send(removecolorembed);
                }
            })
            } else { 
                await message.member.roles.remove(colors);

                const removecolorembed = new Discord.MessageEmbed().setColor("#fcfcfc")
                .setDescription(`${message.author} Você removeu a cor ${colortoremove}`);
            }
        } 
        catch(e) {
            message.channel.send(`Algo inesperado aconteceu, caso persista, fale com ${owner}`); 
        }
}

// Comando de help 

 if (cmd.startsWith(`${prefix}help`)) {
        const helpembed = new Discord.MessageEmbed().setTitle("Meus comandos!").setColor("#ffffff")
        .setDescription(`Olá ${message.author}! Vejo que está com duvidas sobre meus comandos. \n 
        **COMANDOS PESSOAIS** \n

        .daily - Concede um número aleatório entre 200 e 400 de Mafia Coins. OBS: Possui um Cooldown de 24 Horas. \n 
        .mycoins - Mostra a quantia de coins que você possui. \n
        .sendcoins - Envia uma quantia de coins ao usuário mencionado. \n
        .mylevel - Mostra o seu level atual no server. \n 
        .colors - Mostra as cores disponiveis no servidor. \n
        .coloradd - Adiciona a cor desejada, custa 200 Mafia Coins. \n
        .removecolor - Remove uma cor desejada e lhe devolve 100 Mafia Coins. \n

        **COMANDOS SOCIAIS** \n

        .avatar - Mostra o seu avatar, ou caso você marque alguém, mostra o da pessoa marcada. \n
        .hug - Abraça um usuário usando um GIF. \n
        .kiss - Beija um usuário usando um GIF. \n
        .slap - Dá um tapa em um usuário usando um GIF. \n
        .dance - Dança sozinho, se marcar alguém, dançará com ele. \n
        .pat - Faz carinho em um membro usando um GIF. \n
 
        **COMANDOS DE SERVIDOR** \n

        .report - Reporta o usuário mencionado com um motivo, caso o reportado seja um Game Master, apenas os Founder poderão ver. \n
        .sugestion - Envia sua sugestão ao canal de #Sugestões. \n
                
        Qualquer dúvida, fale diretamente com: ${message.guild.owner}`);
        message.author.send(helpembed);
    } // Fim .help

    // Comando de Help para Gamemaster

    if (cmd.startsWith(`${prefix}gamemaster`)) {
        if (!message.member.roles.cache.find(gm => gm.id === '687785376726777935')) 
            return message.reply("Você não é um Game Master...");

        const gmembed = new Discord.MessageEmbed().setTitle("Comandos de Game master!").setColor("#ffffff")
        .setDescription(`Bem vindo(a) à equipe ${message.author}! \n
        
        **COMANDOS DE MODERAÇÃO** \n

        .mute - Muta o usuário por um determinado tempo.\n
        Sintax: .mute @user [tempo]. Tempo: 10s, 10m, 10d. __Caso não diga o tempo, será 15m.__ \n

        .unmute - Desmuta o usuário mencionado. \n
        Sintax: .unmute @user \n

        .warn - Aplica uma warn a um usuário. Se juntar 3, ele será enviado ao julgamento. \n
        Sintax: .warn @user \n

        .judge - Manda o membro direto para o julgamento. \n
        Sintax: .judge @user

        .unwarn - Remove as Warns de um usuário. \n
        Sintax: .unwarn @user

        .clear - Limpar um número entre 2 e 99 de mensagens no chat. \n
        Sintax: .clear [Número]

        .lock - Locka o chat atual. \n
        .unlock - Unlocka o chat atual. \n

        **COMANDOS DE MODERADOR EXPERIENTE+** \n
        **OBS**: O Uso indevido destes comando poderá resultar em perda do Game Master! \n

        .setlevel - Coloca o level do usuário na quantia desejada. \n
        Sintax: .setlevel @user [Número] 

        .givecoins - Dá a quantia de coins desejada ao usuário. \n
        Sintax: .givecoins @user [Número] 

        .debtcoins - Retira a quantia de coins desejada do usuário. \n
        Sintax: .debtcoins @user [Número]`)


    message.author.send(gmembed);

    } // Fim .gamemaster


    // Comando de sugestão

 if (cmd.startsWith(`${prefix}sugestion`)) {
    let sugestão = args.join(" ");
    let sugestionchannel = message.guild.channels.cache.find(sug => sug.id === '713403941433376839'); 
    if (!sugestão) 
        return message.reply("Digite a sugestão, algo útil, de preferencia.")
    
    message.delete(message);

    const sugestionembed = new Discord.MessageEmbed().setColor("#21b9ff")
    .setDescription(`Sugestão de: ${message.author} \n 
    **${sugestão}**`);

    sugestionchannel.send(sugestionembed).then(sugestionembed => {
        sugestionembed.react('✅')
        sugestionembed.react('❎')
    
    });
}


// Comando de avatar

    if (cmd.startsWith(`${prefix}avatar`)) {
        let aUser = message.mentions.users.first() || message.author;
        const avatarembed = new Discord.MessageEmbed()
        .setTitle("Profile Picture")
        .setDescription(`Perfil de: ${aUser}`)
        .setColor("#00ff1a")
        .setImage(aUser.avatarURL());
        
        message.reply(avatarembed);
    } 

    // Anti Discord invite

    if (message.content.includes("discord.gg/")) {
        if (message.member.roles.cache.find(gm => gm.id === '687785376726777935')) {
            return;
        }
        message.delete(message);

        let gmrole = message.guild.roles.cache.find(gm => gm.id === '687785376726777935');
        let reportchannel = message.guild.channels.cache.find(ch => ch.id === '707653323695718522');
        let cmdchannel = message.guild.channels.cache.find(ch => ch.id === '688172961168883747');

        const deletedembed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`mensagem deletada: ${message.content}`)
        .addField("Usuário:", `${message.author}`)
        .addField("Dia: ", datahoje);

        const antiinviteembed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`${message.author} você não pode enviar links relacionados ao discord aqui!`)

        message.channel.send(antiinviteembed);
        reportchannel.send(`${gmrole}`);
        cmdchannel.send(`.mute ${message.author} 5m`);

        reportchannel.send(deletedembed);
    }


/* Fim dos comandos de server */

// ---------------------------------------------

/* inicio dos comandos de moderação */

// Lock Chat


 if (cmd.startsWith(`${prefix}lock`)) {

    if (!message.member.hasPermission("KICK_MEMBERS")) 
        return message.reply("Apenas um Moderador pode Lockar o chat.");


    message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
        SEND_MESSAGES: false
    })

    const lockembed = new Discord.MessageEmbed().setColor("#3a3b3d")
    .setDescription(`${message.author} trancou o chat.`);
        message.channel.send(lockembed);

}

// Unlock Chat

if (cmd.startsWith(`${prefix}unlock`)) {

    if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("Apenas um game master pode Unlockar o chat.");

    message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
        SEND_MESSAGES: true
    })

    const unlockembed = new Discord.MessageEmbed().setColor("#3a3b3d")
    .setDescription(`${message.author} destrancou o chat.`);
        message.channel.send(unlockembed);

}
 
// Comando de report

if (cmd.startsWith(`${prefix}report`)) {

    // Armazenamento de membro em variável
    let rUser = message.guild.member(message.mentions.users.first());
    if (!rUser) 
        return message.reply("Mencione quem você quer reportar!");

    // motivo 
    let rreason = args.join(" ").slice(22);


    if (!rreason) 
        return message.reply("Especifique um motivo! Não é possivel reportar alguém sem um motivo."); 

    // Embed construido que será mandado do canal de reports
    let reportEmbed = new Discord.MessageEmbed().setTitle("Usuário reportado.")
    .setColor("#fbff00")
    .setThumbnail("https://www.pinclipart.com/picdir/middle/1-12435_ace-attorney-clipart-objection-ace-attorney-objection-meme.png")
    .addField("Usuário reportado:", `${rUser}`)
    .addField("Reportado por: ", `${message.author}`)
    .addField("Dia ", datahoje)
    .addField("Motivo: ", rreason);

    if (rUser.roles.cache.find(gm => gm.id === '687785376726777935')) {
        message.guild.channels.cache
        .find(founder => founder.id === '717114900715143279')
        .send(reportEmbed);

        message.delete().catch(O_o=>{});
    } else {

    // Envio da mensagem de report no canal declarado.
    message.guild.channels.cache
    .find(ch => ch.id === '707653323695718522')
    .send(reportEmbed);

    // Deleta a mensagem de report. 
    message.delete().catch(O_o=>{});

    }
}

// Comando de kick

if (cmd.startsWith(`${prefix}kick`)) {

    // Armazenamento de membro em variável e checks iniciais.
    let kUser = message.guild.member(message.mentions.users.first());
    if (!message.member.hasPermission("KICK_MEMBERS")) 
        return message.reply("Apenas um Game Master pode Kickar outros membros!");

    if (!kUser) 
        return message.reply("Mencione o membro que deseja kickar.");

    if (kUser.roles.cache.find(gm => gm.id === '687785376726777935')) 
        return message.reply("Você não pode kickar outro Game Master.");
    
    // Definição do motivo, caso vazio, recebe "Desrespeito ou má convivência"
    let kReason = args.join(" ").slice(22);
    if (!kReason) {
        kReason = "Desrespeito ou má convivência.";
    }

    // Embed construido para enviar ao chat no qual comando foi utilizado
    let simpleEmbedKick = new Discord.MessageEmbed()
    .setColor("#ff8000")
    .setDescription(`${kUser} foi kickado do servidor.`)
    .setImage('https://cdn.discordapp.com/attachments/351504904256356353/715662884457414666/Burrice.gif');

    message.channel.send(simpleEmbedKick);

    // Embed que será mandado no chat de punidos
    let KickEmbed = new Discord.MessageEmbed().setTitle("Usuário kickado.")
    .setDescription("Usuário punido.")
    .setColor("#ff8000")
    .addField("Usuário kickado: ", `${kUser}`)
    .addField("Game Master: ", `${message.author}`)
    .addField("Dia: ", datahoje)
    .addField("Motivo:", kReason);     
    
    // Procura o canal que será mandado a mensagem construida acima.
    message.guild.channels.cache.find(ch => ch.id === '707253571120529498')
            .send(KickEmbed);

    
    // Kicka o membro e envia a mensagem no canal definido.
    message.guild.member(kUser)
    .kick(kReason);


}

// Comando de ban

 if (cmd.startsWith(`${prefix}ban`)) {
     
    let bUser = message.guild.member(message.mentions.users.first());

    if (!message.member.hasPermission("BAN_MEMBERS")) 
        return message.reply("Apenas um Game Master pode banir outro membro!");
        
    if (!bUser)
        return message.reply("Mencione o membro que deseja banir.");

    if (bUser.roles.cache.find(gm => gm.id === '687785376726777935')) 
        return message.reply("Você não pode banir outro Game Master.");

    let bReason = args.join(" ").slice(22);
    if (!bReason) {
        bReason = "Desrespeito ou má convivência";        
    }   
    
    const simpleEmbedBan = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setImage('https://cdn.discordapp.com/attachments/351504904256356353/715662853780013097/discord-ban-gif-4.gif')
    .setDescription(`${bUser} foi banido do servidor.`);

    message.channel.send(simpleEmbedBan);

    const BanEmbed = new Discord.MessageEmbed().setTitle("Usuário banido")
    .setColor("#ff0000")
    .addField("Usuário banido: ", `${bUser}`)
    .addField("Game Master: ", `${message.author}`)
    .addField("Dia: ", datahoje)
    .addField("Motivo:", bReason);
    
    message.guild.channels.cache.find(ch => ch.id === '707253571120529498')
            .send(BanEmbed);
    
    message.guild.member(bUser).ban(bReason);

    }

    // Comando de Clear

if (cmd.startsWith(`${prefix}clear`)) {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) 
        return message.reply("Apenas um Game master pode apagar mensagens."); 

    const tutoclearembed = new Discord.MessageEmbed()
    .setColor("#5a0091")
    .setDescription(`${message.author}, este comando aceita apenas numeros entre 2 e 100.`)
    .addField("Exemplo", "`.clear 10`");


    let clearmessage = parseInt(args[0]);
    if (isNaN(clearmessage)) {
         return message.reply("Eu só consigo apagar números... Digite números, por favor.")
    }
    if (clearmessage >= 2 && clearmessage <= 100) {
        message.channel.bulkDelete(clearmessage, true);
                    
        const simpleembedclear = new Discord.MessageEmbed()
        .setColor("#0ffc03")
        .setDescription(`${message.author}, ${clearmessage} mensagens foram apagadas neste canal.`);
                    
        message.channel.send(simpleembedclear)
        .then(msg => { msg.delete({ timeout: 5000 })})

        }
        else {
            message.channel.send(tutoclearembed);
        }
    }


    // Comando de Mute 

    if (cmd.startsWith(`${prefix}mute`)) {
        // Check se o membro tem permissão de usar o comando.
        if (!message.member.hasPermission("MANAGE_MESSAGES")) 
            return message.reply("Apenas um Moderador pode mutar outros membros!");    
    
        // Armazenamento de membro a ser mutado e checks básicos. 
        let mUser = message.guild.member(message.mentions.users.first());
        if (!mUser) 
            return message.reply("Mencione quem você deseja mutar.");

        if (mUser.roles.cache.find(gm => gm.id === '687785376726777935')) 
            return message.reply("você não pode mutar outro Game Master!");

        // Procura a role de mute pela ID e armazena o tempo de mute desejado
        let muterole = message.guild.roles.cache.find(muterole => muterole.id === "694720040288911492");
        let mutetime = args[1];

    // Caso não tenha tempo de mute, será 15 minutos.
    if (!mutetime) {
        mutetime = "15m";
    }

    // verifica se o usuário já está mutado.
    if (mUser.roles.cache.find(muterole => muterole.id === "694720040288911492")) {
        message.reply("O Usuário já está mutado.");
            return;
    }

    // Adiciona a role de mute.
    mUser.roles.add(muterole);

    const SimpleMuteEmbed = new Discord.MessageEmbed().setColor("#0a0a0a")
    .setDescription(`${mUser} foi mutado por ${ms(ms(mutetime))}`);
    message.channel.send(SimpleMuteEmbed);

    // Embed que será enviado ao chat de Punidos.
    const MuteEmbed = new Discord.MessageEmbed().setTitle("Usuário mutado")
    .setColor("#ff0000")
    .addField("Usuário mutado: ", `${mUser}`)
    .addField("Game Master: ", `${message.author}`)
    .addField("Dia: ", datahoje)
    .addField("Tempo mutado: ", `${ms(ms(mutetime))}`);


    // Procura o canal de mutados e envia o Embed construido acima.
    message.guild.channels.cache.find(ch => ch.id === '714857756884205668')
    .send(MuteEmbed);

    // Função pra determinar o tempo de mute.
    setTimeout(function(){
        mUser.roles.remove(muterole);
        if (!muterole) return;
    }, ms(mutetime)) 

}

// comando de unmute.

if (cmd.startsWith(`${prefix}unmute`)) {
    let UnmuteUser = message.guild.member(message.mentions.users.first());

    if (!message.member.hasPermission("MANAGE_MESSAGES")) 
        return message.reply("Apenas um Moderador pode desmutar alguém!");

    if (!UnmuteUser) 
        return message.reply("Mencione algum usuário, de preferência um que esteja mutado...");

    if (!UnmuteUser.roles.cache.find(Unmuterole => Unmuterole.id === "694720040288911492")) 
        return message.reply("Este usuário não está mutado.");

    
    UnmuteRole = message.guild.roles.cache.find(UnmuteRole => UnmuteRole.id === "694720040288911492");
    UnmuteUser.roles.remove(UnmuteRole);
    
    const unmuteembed = new Discord.MessageEmbed().setColor("#0a0a0a")
    .setDescription(`${UnmuteUser} foi desmutado por ${message.author}`);
    message.channel.send(unmuteembed);
}

// Comando de Warn.

if (cmd.startsWith(`${prefix}warn`)) {

    // Checks iniciais.
    let warnuser = message.guild.member(message.mentions.users.first());
    if (!message.member.hasPermission("MANAGE_MESSAGES")) 
        return message.reply("Apenas um Moderador pode aplicar uma warn.");

    if (warnuser.roles.cache.find(gmrole => gmrole.id === '687785376726777935' )) 
        return message.reply("Você não pode aplicar uma warn a outro Game Master!");
    

    // Armazenamento de Cargos.
    let warnrole1 = message.guild.roles.cache.find(warnrole => warnrole.id === '709466467128836117');
    let warnrole2 = message.guild.roles.cache.find(warnrole => warnrole.id === '709466532404789268');
    let judgerole = message.guild.roles.cache.find(warnrole => warnrole.id === '709466601036054529');

    // Roles de Moderador.
    let Founder = message.guild.roles.cache.find(founder => founder.id === '679122758596296704');

    // Faz um check se o usuário já está com a role de julgamento, se sim, para aqui.
    if (warnuser.roles.cache.find(warnrole => warnrole.id === '709466601036054529')) 
        return message.reply("O usuário já está em julgamento.")
    
    // Condicional e Ação para a primeira Warn. 
    if (!warnuser.roles.cache.find(warnrole => warnrole.id === '709466467128836117') && 
            !warnuser.roles.cache.find(warnrole => warnrole.id === '709466532404789268')) {   
                warnuser.roles.add(warnrole1);
                    const firstwarnEmbed = new Discord.MessageEmbed()
                    .setColor("#ffbf00")
                    .addField("Warning ", `${warnuser} recebeu: ${warnrole1}. Game Master: ${message.author}`);
                        message.channel.send(firstwarnEmbed); 
    }

    // Condicional e Ação para Segunda Warn.
    if (warnuser.roles.cache.find(warnrole => warnrole.id === '709466467128836117')) {
        warnuser.roles.remove(warnrole1);
            warnuser.roles.add(warnrole2);
                const secondwarnEmbed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .addField("Warning", `${warnuser} recebeu: ${warnrole2}. Game Master: ${message.author}`);
                    message.channel.send(secondwarnEmbed);

    }
    
    // Condicional e ação para ultima warning.
    if (warnuser.roles.cache.find(warnrole => warnrole.id === '709466532404789268')) {
        warnuser.roles.remove(warnrole2);
            warnuser.roles.add(judgerole);
                const judgeembed = new Discord.MessageEmbed()
                .setColor("#050000")
                .addField("Julgamento ", `${warnuser}, você está na lista de julgamento do server. Game Master: ${message.author}`);
                    message.channel.send(judgeembed);

        const fjudgeembed = new Discord.MessageEmbed().setTitle("Membro em julgamento.")
        .setColor("#050000")
        .setDescription("Um membro teve atitudes negativas no servidor, agora ele está em julgamento.")
        .addField("Usuário em julgamento: ", `${warnuser}`)
        .addField("Game Master: ", `${message.author}`)
             judgechannel = message.guild.channels.cache.find(ch => ch.id === '709503161563480154');
                judgechannel.send(fjudgeembed);
                    judgechannel.send(`${Founder}`);
    }

}

// Comando para ver a lista de membros com Warn.

if (cmd.startsWith(`${prefix}wlist`)) {
    if (!message.member.roles.cache.find(gm => gm.id === '687785376726777935'))
        return message.reply("Apenas um game master pode usar este comando.");

    let warneds_1 = message.guild.members.cache.filter(member => {
        return member.roles.cache.find(w1 => w1.id === '709466467128836117');
    });

    let warneds_2 = message.guild.members.cache.filter(member => {
        return member.roles.cache.find(w2 => w2.id === '709466532404789268');
    })

    const warnlist = new Discord.MessageEmbed().setTitle("Usuário com Warns.")
    .setColor("#fcfcfc")
    .setDescription
        (`**FIRST WARNING**  

    ${warneds_1.array().slice(" \n ")} 

    ══╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬══ 

    **SECOND WARNING** \n
    
    ${warneds_2.array().slice(" \n ")} 

    ══╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬══ 

        `)
    .setFooter("Mafia dos Games © 2020");
    

    message.guild.channels.cache.find(ch => ch.id === '714849630436982961')
    .send(warnlist);

}


// Comando de Unwarn

if (cmd.startsWith(`${prefix}unwarn`)) {

    // Armazenamento de roles em variáveis
    let warnrole1 = message.guild.roles.cache.find(warnrole => warnrole.id === '709466467128836117');
    let warnrole2 = message.guild.roles.cache.find(warnrole => warnrole.id === '709466532404789268');
    let judgerole = message.guild.roles.cache.find(warnrole => warnrole.id === '709466601036054529');

    // Armazenamento do membro a receber o comando e check se o membro tem permissão para usar o comando.
    let unwarnuser = message.guild.member(message.mentions.users.first());

    if (!unwarnuser)
        return message.reply("Mencione algum usuário, de preferência algum que possua warns...");

    if (!message.member.hasPermission("KICK_MEMBERS")) 
        return message.reply("Apenas um Game Master pode utilizar este comando.");

    // Check se o membro possui alguma Warning.
    if (!unwarnuser.roles.cache.find(warnrole => warnrole.id === '709466467128836117') && 
        !unwarnuser.roles.cache.find(warnrole => warnrole.id === '709466532404789268') && 
        !unwarnuser.roles.cache.find(warnrole => warnrole.id === '709466601036054529'))
            return message.reply("O Usuário não possui nenhuma warn.");
                const unwarnembed = new Discord.MessageEmbed().setColor("#22ff00")
                .setDescription(`Warn de: ${unwarnuser} removida com sucesso! Game Master: ${message.author}`);

    // Remoção de 1st Warning
    if (unwarnuser.roles.cache.find(warnrole => warnrole.id === '709466467128836117')) {
        unwarnuser.roles.remove(warnrole1);
            message.channel.send(unwarnembed);
    }
    
    // Remoção de 2nd Warning
    if (unwarnuser.roles.cache.find(warnrole => warnrole.id === '709466532404789268')) {
        unwarnuser.roles.remove(warnrole2);
            message.channel.send(unwarnembed);
    }

    // Remoção de Judgment
    if (unwarnuser.roles.cache.find(warnrole => warnrole.id === '709466601036054529')) {
        unwarnuser.roles.remove(judgerole);
            message.channel.send(unwarnembed);
    }

}



// Comando de Judge

if (cmd.startsWith(`${prefix}judge`)) {
    let judgeuser = message.guild.member(message.mentions.users.first());

    let Founder = message.guild.roles.cache.find(founder => founder.id === '679122758596296704');

    if (!message.member.hasPermission("KICK_MEMBERS")) 
        return message.reply("Apenas um Game Master pode utilizar este comando!");

    if (!judgeuser) 
        return message.reply("Mencione algum membro, de preferência um sem warns...")

    if (judgeuser.roles.cache.find(gm => gm.id === '687785376726777935')) 
        return message.reply("Você não pode colocar outro Game Master em julgamento!")

    //check de 1st warning                  
    if (judgeuser.roles.cache.find(warnrole => warnrole.id === '709466467128836117' ) ||
    //check de segunda warning 
        judgeuser.roles.cache.find(warnrole => warnrole.id === '709466532404789268')) {
            const nonoembed = new Discord.MessageEmbed().setTitle("Usuário já possui warning")
            .setColor("#ff0000")
            .setDescription(`Este usuário já possui alguma warning! Se quiser coloca-lo em julgamento,
                coloque-as através do comando .warn ou retire-as e repita este comando!`);
                    message.reply(nonoembed);
    }

    else {
        let judgerole = message.guild.roles.cache.find(judgerole => judgerole.id === '709466601036054529');
        judgeuser.roles.add(judgerole);

        const judgeembed = new Discord.MessageEmbed()
        .setColor("#050000")
        .addField("Julgamento.", `${judgeuser}, você está na lista de julgamento do server. Game Master: ${message.author}`);

        message.channel.send(judgeembed);

    }

}
/* Fim dos comandos de moderação */

// -------------------------------------

/* Inicio de comandos sociais */

    // Comando de Kiss

if (cmd.startsWith(`${prefix}kiss`)) {

        let kisseduser = message.guild.member(message.mentions.users.first())
        let kissgif = botconfig.kissgif;
        let kissaction = Math.floor((Math.random() * kissgif.length));
            
        if (!kisseduser) {
            const TutoEmbed = new Discord.MessageEmbed().setTitle("? TUTORIAL ?")
            .setColor("#5a0091")
            .setDescription("Para usar esse comando, inicie com .kiss e mencione alguém! Exemplo: `.kiss @menção`");
                message.channel.send(TutoEmbed);
    
        }
        else {
    
            const kissembed = new Discord.MessageEmbed()
            .setColor("#ff5454")
            .setDescription(`${message.author} beijou ${kisseduser}`)
            .setImage(kissgif[kissaction])
            .setFooter(`Pedido por: ${message.author.username}`); 
    
            message.channel.send(kissembed);
        }
        
}   


    
if (cmd.startsWith(`${prefix}dance`)) {

        let danceuser = message.guild.member(message.mentions.users.first());
        
        if (!danceuser) {
            let dancegif = botconfig.dancegif;
            let danceaction = Math.floor((Math.random() * dancegif.length))

            const nodancerEmbed = new Discord.MessageEmbed()
            .setColor("#00ffff")
            .setDescription(`${message.author} dançou!`)
            .setImage(dancegif[danceaction]);
              
                message.channel.send(nodancerEmbed);
        }
        else {
            let dancewithgif = botconfig.dancewithgif;
            let dancewithaction = Math.floor((Math.random() * dancewithgif.length))

            const dancerembed = new Discord.MessageEmbed()
            .setColor("#00ffff")
            .setDescription(`${message.author} dançou com ${danceuser}!`)
            .setImage(dancewithgif[dancewithaction]);

                message.channel.send(dancerembed);

        }
  

}

if (cmd.startsWith(`${prefix}hug`)) {
        let hugeduser = message.guild.member(message.mentions.users.first());

        if (!hugeduser) {
            const TutoEmbed = new Discord.MessageEmbed().setTitle("? TUTORIAL ?")
            .setColor("#5a0091")
            .setDescription("Para usar esse comando, inicie com .hug e mencione alguém! Exemplo: `.hug @menção`")

                message.reply(TutoEmbed);

        }
        else {
            let huggif = botconfig.huggif;
            let hugaction = Math.floor((Math.random() * huggif.length));

            const hugembed = new Discord.MessageEmbed()
            .setColor("#7174a3")
            .setDescription(`${message.author} abraçou ${hugeduser}!`)
            .setImage(huggif[hugaction]);

                message.channel.send(hugembed);
        }
}

if (cmd.startsWith(`${prefix}pat`)) {
        let patuser = message.guild.member(message.mentions.users.first());

        if (!patuser) {
            const TutoEmbed = new Discord.MessageEmbed().setTitle("? TUTORIAL ?")
            .setColor("#5a0091")
            .setDescription("Para usar esse comando, inicie com .pat e mencione alguém! Exemplo: `.pat @menção`")

                message.reply(TutoEmbed);
        }
        else {
            let patgif = botconfig.patgif;
            let pataction = Math.floor((Math.random() * patgif.length));

            const patembed = new Discord.MessageEmbed()
            .setColor("#7174a3")
            .setDescription(`${message.author} fez carinho em ${patuser}!`)
            .setImage(patgif[pataction]);

                message.channel.send(patembed);
        }

}

if (cmd.startsWith(`${prefix}slap`)) {
        let slaped = message.guild.member(message.mentions.users.first());

        if (!slaped) {
            const TutoEmbed = new Discord.MessageEmbed().setTitle("? TUTORIAL ?")
            .setColor("#5a0091")
            .setDescription("Para usar esse comando, inicie com .slap e mencione alguém! Exemplo: `.slap @menção`")

                message.reply(TutoEmbed);
        }
        else {let slapgif = botconfig.slapgif;
            let slapaction = Math.floor((Math.random() * slapgif.length));

            const slapembed = new Discord.MessageEmbed()
            .setColor("#7174a3")
            .setDescription(`${message.author} deu um tapa ${slaped}!`)
            .setImage(slapgif[slapaction]);

                message.channel.send(slapembed);

        }    
}


});

client.login(process.env.token);