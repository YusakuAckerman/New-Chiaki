// requisitos básicos para funcionalidade/organização do bot. 

const botconfig = require("./botconfig.json");
const tokenfile = require("./tokenfile.json");
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const ms = require("ms");
const fs = require("fs");
let xp = require("./xp.json");
let coins = require("./coins.json");
const dailycooldown = new Set();

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

// ----------------------------------------------------------------------

// Evento para setar a atividade do bot.

client.on("ready", async () => {
    console.log(`${client.user.tag} está online!`);
    client.user.setStatus('available')
    client.user.setActivity('use .help em caso de dúvidas!')
});

// Script para Welcome.

client.on('guildMemberAdd', member => {

    let Welcome = botconfig.Welcome;
    let wImage = Math.floor(Math.random() * Welcome.length);
    
    const channel = member.guild.channels.cache.find(ch => ch.id === '717033854199660599');
        if (!channel) return;

    const embed = new Discord.MessageEmbed().setTitle("Bem vindo!!")
    .setColor('DARK_GOLD')
    .setDescription(`Olá ${member}! Seja bem vindo ao servidor!`)
    .setImage(Welcome[wImage])
    .setFooter('Mafia dos Games © 2020.')
    channel.send(embed);

})

// Comandos com prefixo 

client.on("message", async message => {
    if(message.channel.type === "dm") 
        return;

// Um extenso script para XP....

    let xpAdd = Math.floor(Math.random() * 14) + 15;

    let vipxpAdd = Math.floor(Math.random() * 14) + 16;

    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 0
        };
    }
  
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


    if (message.member.roles.cache.find(vip => vip.id === '712750471067992116') || 
        message.member.roles.cache.find(boost => boost.id === '712761176379097120')) {
            if (message.author.bot) 
                return;
        let curxp = xp[message.author.id].xp;
        let curlevel = xp[message.author.id].level;
        let nxtlevel = xp[message.author.id].level * 400;
        xp[message.author.id].xp = curxp + vipxpAdd;
        if (nxtlevel <= xp[message.author.id].xp) {
            xp[message.author.id].level = curlevel + 1;
            xp[message.author.id].xp = 0; 
        }
    }    

    else {
        if (message.author.bot) 
            return;
        let curxp = xp[message.author.id].xp;
        let curlevel = xp[message.author.id].level;
        let nxtlevel = xp[message.author.id].level * 400;
        xp[message.author.id].xp = curxp + xpAdd;
        if (nxtlevel <= xp[message.author.id].xp) {
            xp[message.author.id].level = curlevel + 1;
            xp[message.author.id].xp = 0; 
        }
    }

  /*   fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
            if (err) { console.log(err) } 
        }); */

    if (xp[message.author.id].level === 1) {
        message.member.roles.add(lv1role);
    }

    if (xp[message.author.id].level === 5) {
        message.member.roles.add(lv5role);
    }

    if (xp[message.author.id].level === 10) {
        message.member.roles.add(lv10role);
    }

    if (xp[message.author.id].level === 20) {
        message.member.roles.add(lv20role);
    }
    
    if (xp[message.author.id].level === 30) {
        message.member.roles.add(lv30role);
    }

    if (xp[message.author.id].level === 40) {
        message.member.roles.add(lv40role);
    }

    if (xp[message.author.id].level === 50) {
        message.member.roles.add(lv50role);
    }

    if (xp[message.author.id].level === 60) {
        message.member.roles.add(lv60role);
    }

    if (xp[message.author.id].level === 70) {
        message.member.roles.add(lv70role);
    }

    if (xp[message.author.id].level === 80) {
        message.member.roles.add(lv80role);    
    }

    if (xp[message.author.id].level === 85) {
        message.member.roles.add(lv85role);
    }

    
// Coin System Script

if (!coins[message.author.id]) {
    coins[message.author.id] = {
        coins: 0
    };
}

if (coins[message.author.id].coins === null) {
    coins[message.author.id] = {
        coins: 0
    };
}

let Bal = coins[message.author.id].coins;

 fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) { console.log(err) } 
}); 

// variáveis para lógica

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

/* inicio dos comandos de server */

if (cmd.startsWith(`${prefix}unlock`)) {
    let lockedroles = message.guild.roles.cache.find(role => role.name === "Level 10");

    message.channel.updateOverwrite(lockedroles, {
        SEND_MESSAGES: false
    });

}

if (cmd.startsWith(`${prefix}lock`)) {


    message.guild.roles.everyone.setPermissions({
        SEND_MESSAGES: false
    })

}

// Comando de level 

if (cmd.startsWith(`${prefix}mylevel`)) { 

    let curxp = xp[message.author.id].xp;
    let curlevel = xp[message.author.id].level;
    let nxtlevel = xp[message.author.id].level * 400;

    let nextlevelxp = nxtlevel - curxp;

    const levelembed = new Discord.MessageEmbed()
    .setColor("#00f0e8")
    .setDescription(`__Seu level atual é: ${curlevel}__ \n
    __Para chegar ao próximo level, falta ${nextlevelxp} xp points!__ \n
    __Xp atual: ${curxp}__`);

    message.reply(levelembed);

}

// Daily coins

if (cmd.startsWith(`${prefix}daily`)) {

    if (dailycooldown.has(message.author.id)) {
        message.channel.send("Você já reinvindicou suas Mafia Coins diárias.");
    } else {

        let dailycoins = Math.floor(Math.random() * 200) + 200;
            coins[message.author.id].coins = coins[message.author.id].coins + dailycoins;
                message.reply(`Você recebeu ${dailycoins} Mafia Coins.`);
   
    }

    
    dailycooldown.add(message.author.id);
    setTimeout(() => {
      dailycooldown.delete(message.author.id);
    }, ms("1d"));

} // Fim Daily coins

// Comando para ver suas coins

if (cmd.startsWith(`${prefix}mycoins`)) {
    let saldo = coins[message.author.id].coins 

    message.channel.send(`Você possui ${saldo} Mafia Coins!`);
} // Fim Mycoins

// Comando de sendcoins

if (cmd.startsWith(`${prefix}sendcoins`)) { 
    if (coins[message.author.id].coins < 1) 
        return message.reply("Você está sem Mafia Coins.");

    let sendUser = message.guild.member(message.mentions.users.first());
    let amt = args.join(" ").slice(22);

    if (isNaN(amt)) 
        return message.reply("Um numero, por favor.");

    if (sendUser.id === message.author.id) 
        return message.reply("Haha, boa tentativa.");

    if (!coins[sendUser.id]) {
       return message.channel.send("Este usuário não possui uma carteira.");
    }


    if (coins[message.author.id].coins < amt) 
        return message.reply("Você não possui essa quantia de Mafia Coins.");
    
    coins[message.author.id].coins = coins[message.author.id].coins - parseInt(amt);
    
    coins[sendUser.id].coins = coins[sendUser.id].coins + parseInt(amt);

    let saldo = coins[message.author.id].coins

    message.reply(`Você doou ${amt} Mafia coins para ${sendUser}! Seu novo saldo: ${saldo}`);
 
} // fim do comando de sendcoins

if (cmd.startsWith(`${prefix}givecoins`)) {

    if (!message.member.roles.cache.find(gm => gm.id === '687785376726777935')) {
        return message.reply("Aham, espertinho.");
    }

    let giveUser = message.guild.member(message.mentions.users.first());
    let amt = args.join(" ").slice(22);

    if (!giveUser) {
        giveUser = message.author;
    }

    if (isNaN(amt)) 
        return message.reply("Um numero, por favor.");

    if (!coins[giveUser.id]) {
       return message.channel.send("Este usuário não possui uma carteira.");
    }
    
    coins[giveUser.id].coins = coins[giveUser.id].coins + parseInt(amt);

    let saldo = coins[giveUser.id].coins

    message.reply(`Você deu ${amt} Mafia coins para ${giveUser}! novo saldo do usuário: ${saldo}`);

    message.guild.channels.cache
    .find(cmd => cmd.id === '717103392878493787')
    .send(`${message.author} deu ${amt} Mafia coins para ${giveUser}`);

}

// Comando de help 

 if (cmd.startsWith(`${prefix}help`)) {
        const helpembed = new Discord.MessageEmbed().setTitle("Meus comandos!").setColor("#ffffff")
        .setDescription(`Olá ${message.author}! Vejo que está com duvidas sobre meus comandos. \n 
        **COMANDOS PESSOAIS** \n

        .daily - Concede um número aleatório entre 200 e 400 de Mafia Coins. OBS: Possui um Cooldown de 24 Horas. \n 
        .mycoins - Mostra a quantia de coins que você possui. \n
        .sendcoins - Envia uma quantia X de coins ao usuário mencionado. \n
        .level - Mostra o seu level atual no server. \n 
        .colors - Mostra as cores disponiveis no servidor. \n
        .coloradd - Adiciona a cor desejada, custa 200 Mafia Coins. \n
        .remove - Remove uma cor e lhe devolve 100 Mafia Coins. \n

        **COMANDOS SOCIAIS** \n

        .hug - Abraça um usuário usando um GIF. \n
        .kiss - Beija um usuário usando um GIF. \n
        .slap - Dá um tapa em um usuário usando um GIF. \n
        .dance - Dança sozinho, se marcar alguém, dançará com ele. \n
        .pat - Faz carinho em um membro usando um GIF. \n
 
        **COMANDOS DE SERVIDOR** \n

        .report - Reporta o usuário mencionado com um motivo. \n
        .sugestion - Envia sua sugestão ao canal de #Sugestões. \n
        .bugreport - Reporta um bug ao canal de #Bug-Reports \n
        
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

        .mute - Muta o usuário por um determinado tempo. Ex: .mute @user 10m \n
        OBS: Caso não especifique o tempo, por padrão será 15 Minutos. \n
        .unmute - Desmuta o usuário mencionado. \n
        .warn - Aplica uma warn a um usuário. Se juntar 3, ele será enviado ao julgamento. \n
        .jugde - Manda o membro direto para o julgamento. \n
        .unwarn - Remove as Warns de um usuário. \n
        .clear - Limpar um número entre 2 e 99 de mensagens no chat. \n 

        **COMANDOS DE MODERADOR EXPERIENTE** \n
        __Em desenvolvimento__ \n

        .levelset - Coloca o level desejado a um membro. \n
        .givecoins - Dá moedas ao usuário. \n
        **OBS**: O Uso indevido deste comando poderá resultar em perda do Game Master! \n
        

        Comando em __desenvolvimento.__`)


    message.author.send(gmembed);

    } // Fim .gamemaster


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
                if (Bal < 200) 
                    return message.reply("Você não tem dinheiro para trocar de cor!");
                
                    await message.member.roles.remove(colors);

                    message.member.roles.add(colortoadd);

                    coins[message.author.id].coins = Bal - 200;

                    let saldo = Bal - 200
                    const sendcolorembed = new Discord.MessageEmbed().setColor("#fcfcfc")
                    .setDescription(`${message.author} Você trocou de cor por 200 Mafia coins! \n
                    Nova cor: ${colortoadd} / Atual saldo de Coins: ${saldo}!`)

                    message.channel.send(sendcolorembed);
            }
        } 
        catch(e) {
            message.channel.send("Deu doidera."); 
        }

    }

    // Comando para remoção de cor.

    if (cmd.startsWith(`${prefix}removecolor`)) {
        let colors = message.guild.roles.cache.filter(role => role.name.startsWith("#"));
        let str = args.join(" ");
        let colortoremove = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase())

        if (!colortoremove) 
            return message.reply("Verifique se digitou o nome da cor corretamente!");

        

        try {

            if (!message.member.roles.cache.find(vip => vip.id === '712750471067992116')) {

            
            await message.member.roles.remove(colors);

            coins[message.author.id].coins = Bal + 100;
            saldo = coins[message.author.id].coins;

                const removecolorembed = new Discord.MessageEmbed().setColor("#fcfcfc")
                .setDescription(`${message.author} Você removeu a cor: ${colortoremove}! \n
                Seu novo saldo: ${saldo}`);

                   message.channel.send(removecolorembed);
            } else { 
                await message.member.roles.remove(colors);

                const removecolorembed = new Discord.MessageEmbed().setColor("#fcfcfc")
                .setDescription(`${message.author} Você removeu a cor ${colortoremove}`);
            }
        } 
        catch(e) {
            message.channel.send("Deu doidera."); 
        }
    }


    // Comando de sugestão

    if (cmd.startsWith(`${prefix}sugestion`)) {
        let sugestão = args.join(" ");
        let sugestionchannel = message.guild.channels.cache.find(sug => sug.id === '713403941433376839'); 
        if (!sugestão) 
            return message.reply("Digite a sugestão, algo útil, de preferencia.")
        
        message.delete(message);

        const sugestionembed = new Discord.MessageEmbed().setColor("#21b9ff")
        .setDescription(`Sugestão de: ${message.author} \n 
        **${args}**`);

        sugestionchannel.send(sugestionembed).then(sugestionembed => {
            sugestionembed.react('✅')
            sugestionembed.react('❎')
        
        });
    }

    if (cmd.startsWith(`${prefix}bugreport`)) {
        let sugestão = args.join(" ");
        let bugchannel = message.guild.channels.cache.find(sug => sug.id === '715658645622227055'); 
        if (!sugestão) 
            return message.reply("Insira o Bug encontrado....")
        
        message.delete(message);

        const sugestionembed = new Discord.MessageEmbed().setColor("#21b9ff")
        .setDescription(`Bug encontrado por: ${message.author} \n 
        **${args}**`);

        bugchannel.send(sugestionembed).then(sugestionembed => {
            sugestionembed.react('✅')
        });
    }

// Comando de serverinfo


    if (cmd.startsWith(`${prefix}serverinfo`)) {
        let serverembed = new Discord.MessageEmbed().setTitle("Server Info")
        .setDescription("Informações do servidor: ")
        .setColor("#fc7b03")
        .addField("Nome do servidor: ", message.guild.name)
        .addField("Server criado em: ", message.guild.createdAt)
        .addField("Você se juntou em: ", message.member.joinedAt)
        .addField("Total de membros: ", message.guild.memberCount)
        .setThumbnail(message.guild.iconURL());

        message.reply(serverembed);

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
        .addField("Hora: ", message.createdAt);

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
    .addField("Hora: ", message.createdAt)
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

    message.reply(simpleEmbedKick);

    // Embed que será mandado no chat de punidos
    let KickEmbed = new Discord.MessageEmbed().setTitle("Usuário kickado.")
    .setDescription("Usuário punido.")
    .setColor("#ff8000")
    .addField("Usuário kickado: ", `${kUser}`)
    .addField("Game Master: ", `${message.author}`)
    .addField("Hora: ", message.createdAt)
    .addField("Motivo:", kReason);     
    
    // Procura o canal que será mandado a mensagem construida acima.
    const kickChannel = message.guild.channels.cache.find(ch => ch.id === '707253571120529498');
    kickChannel.send(KickEmbed);  
    
    // Kicka o membro e envia a mensagem no canal definido.
    message.guild.member(kUser).kick(kReason);


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

    message.reply(simpleEmbedBan);

    const BanEmbed = new Discord.MessageEmbed().setTitle("Usuário banido")
    .setColor("#ff0000") 
    .addField("Usuário banido: ", `${bUser}`)
    .addField("Game Master: ", `${message.author}`)
    .addField("Hora: ", message.createdAt)
    .addField("Motivo:", bReason);
    
    const banChannel = message.guild.channels.cache.find(ch => ch.id === '707253571120529498');
     
    message.guild.member(bUser).ban(bReason);
    banChannel.send(BanEmbed);

    }

    // Comando de Clear

if (cmd.startsWith(`${prefix}clear`)) {
    message.delete(message);

    const tutoclearembed = new Discord.MessageEmbed()
    .setColor("#5a0091")
    .setDescription(`${message.author}, este comando aceita apenas numeros entre 2 e 100.`)
    .addField("Exemplo", "`.clear 10`");


    let clearmessage = args[0];
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
            return message.reply("Apenas um Game Master pode mutar outros membros!");    
    
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

    /* Mensagem enviada no chat onde o comando foi utilizado, mostrando o membro que foi mutado 
    e seu tempo de mute */
    const SimpleMuteEmbed = new Discord.MessageEmbed().setColor("#0a0a0a")
    .setDescription(`${mUser} foi mutado por ${ms(ms(mutetime))}`);
    message.channel.send(SimpleMuteEmbed);

    // Embed que será enviado ao chat de Punidos.
    const MuteEmbed = new Discord.MessageEmbed().setTitle("Usuário mutado")
    .setColor("#ff0000") 
    .addField("Usuário mutado: ", `${mUser} ID : ${mUser.id}`)
    .addField("Game Master: ", `${message.author} ID: ${message.author.id}`)
    .addField("Hora: ", message.createdAt)
    .addField("Tempo mutado: ", `${ms(ms(mutetime))}`);
    
    // Procura o canal de mutados e envia o Embed construido acima.
    const muteChannel = message.guild.channels.cache.find(ch => ch.id === '714857756884205668');
    muteChannel.send(MuteEmbed);

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
        return message.reply("Apenas um Game Master pode desmutar alguém!");

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
    if (!message.member.hasPermission("KICK_MEMBERS")) 
        return message.reply("Apenas um Game Master pode utilizar este comando.");

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