const { default: axios } = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [ 'AutoModerationConfiguration', 'AutoModerationExecution', 'DirectMessageReactions', 'DirectMessageTyping', 'DirectMessages', 'GuildBans', 'GuildEmojisAndStickers', 'GuildIntegrations', 'GuildInvites', 'GuildMembers', 'GuildMessageReactions', 'GuildMessageTyping', 'GuildMessages', 'GuildPresences', 'GuildScheduledEvents', 'GuildVoiceStates', 'GuildWebhooks', 'Guilds','MessageContent']
});
const CONFIG = require('./config.json');

client.login(CONFIG.token);


/* #AMA-RECAP */

const prefix = '/'

client.on('messageCreate', message => {
    if(message.content.startsWith(prefix + 'ama') && (message.channelId === '1040650429534576822')){
        message.delete();
        message.author.send('Tags list')
        }
    });

/* #REPORT-ABUSE */


client.on('messageCreate', mess => {
    
    if(mess.content.startsWith(prefix + 'report') && mess.channelId === '1040647520331780126'){
        mess.delete();
        mess.author.send('Tell us everything');
    };
    
});


/* DIRECT MESSAGE FOR NFT */
let usuarios = [];

client.on('messageCreate', message => {
    
    if(message.content.startsWith(prefix + 'nft') && (message.channelId === '1047219850487025744') && (usuarios.length <= 2000)){
        message.delete();  
        message.author.send('https://platform-test.polygonid.com/claim-link/8b3aaf2a-e6e9-429c-beed-3fc007d95824')
        usuarios.push(message.author)
        console.log(usuarios.length);
    
    }else if(message.content != (prefix + 'nft') && (message.channelId === '1047219850487025744') && (usuarios.length <= 2000)){
        message.delete();
        message.author.send('Please use this command: /nft')
    
    }else if(message.content.startsWith(prefix + 'nft') && (message.channelId === '1047219850487025744') && (!usuarios.length < 2000)){
        message.delete();
        message.author.send('Gracias por unirte al servidor segui participando!!')
    }
     
    

});



client.login(CONFIG.token).then(() => console.log(`${client.user.username} se ha conectado.`));

/* #PRICE-CHECKER */

client.on('messageCreate', async message => {
    
    if(message.content.startsWith(prefix + 'cmc') && (message.channelId === '1040647769221779536')){
        message.delete();
        let getPrice = async () => {
            let response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest", {
                params: { 'symbol': 'BTC' },
                headers: {
                "X-CMC_PRO_API_KEY": "6029937a-7a95-42f3-845b-b9dc4bd9d4e7",
                "Accept-Encoding": "gzip, deflate, br"
                }
                
              })
            let price = response.data;
            return price;
        }
        let priceValue = await getPrice();
        message.author.send(priceValue);
    };
});


/* BOT TESTING */

client.on('messageCreate', message => {
    if(message.content.startsWith(prefix + 'list') && (message.channelId === '1040647647943467038')){
        message.author.send('Active Bots in server: -Mee6 -- Simple poll -- Pingcord -- Leonard bot -- Euler_test_bot');
    };
});





  