const Discord = require('discord.js');
const client = new Discord.Client();
const embed = new Discord.RichEmbed();

const moment = require("moment");
require("moment-duration-format");

const prefix = "!";
const token = process.env.BOT_TOKEN; 
client.login(token);

const OwID = process.env.OwnerID;
var Owner;

var text_0 = process.env.text_0;
var text_1 = process.env.text_1;
var text_2 = process.env.text_2;
var text_3 = process.env.text_3;
/////////////////////////
var GUI = [];
GUI['362624570076692480'] = {//Steam_Games
    Guild: '362624570076692480',
    CBump: '490676280472240158',
    timer: 5,
    timerId: 0
}
GUI['501395544464293891'] = {//22222
    Guild: '501395544464293891',
    CBump: '501423450783481856',
    timer: 5,
    timerId: 0
}
GUI['280345370372997140'] = {//12.11
    Guild: '280345370372997140',
    CBump: '511605038624276481',
    timer: 5,
    timerId: 0
}


client.on('ready',(ready)=>{
    console.log('ready');
    Owner = client.users.get(OwID);
    sbump();
})

function sbump(){
    for(var key in GUI){
        var guild = client.guilds.get(GUI[key].Guild);
	    if (guild == undefined){
            Owner.send('Guild closed: ' + GUI[key].Guild);
	    	continue;
	    }
            client.channels.get(GUI[key].CBump).send(text_0)
            .catch((e)=>{Owner.send(`Channel closed: ${GUI[key].CBump}\nGuild: ${guild.name || guild.id}\nReason: ${e}`)});
            GUI[key].timer = 600;
            //client.channels.get(GUI[key].CBump).send('TIME: '+GUI[key].timer);//H
            GUI[key].timerId = setTimeout(bump, GUI[key].timer*1000, key);
        }
}

function bump(GID){
    if (client.guilds.get(GUI[GID].Guild) == undefined)
        return client.users.get('308921859179544577').send('Guild closed: ' + GUI[GID].Guild);
    client.channels.get(GUI[GID].CBump).send(text_0)
    .catch((e)=>{Owner.send(`Channel closed: ${GUI[GID].CBump}\nGuild: ${guild.name || guild.id}\nReason: ${e}`)});
    GUI[GID].timer = 600;
    //client.channels.get(GUI[GID].CBump).send('TIME: '+GUI[GID].timer);//H
    GUI[GID].timerId = setTimeout(bump, GUI[GID].timer*1000, GID);
}

client.on('message',(message)=>{
    if (!message.guild) return;
    if (message.author.id=='465318048476430338') return;
    var GID = message.guild.id;
    if (GUI[GID] == null) return;// console.log('unk')
    const args = message.content.split(/ +/);
    
    if (message.author.id =='315926021457051650'){
        var mesbump = message.guild.channels.get(GUI[GID].CBump);
        bumping();

        function bumping(){
            //timer = 5;
            if (args[0]===text_1){
                mesbump.send(equation());
                GUI[GID].timer = 10;
                timers(GID);
                return;
            }
            if (args[0]===text_2) {
                GUI[GID].timer = parseInt(3600*4+30);
                //mesbump.send('Server bumped');//H
                timers(GID);
                return;
            }
            if (args[0]===text_3){
                GUI[GID].timer = parseInt(args[7])*3600+parseInt(args[9])*60+60;
                //mesbump.send('Next bump point');//H
                timers(GID);
                return;
            }
            //mesbump.send('1) '+ args[0]);
            return mesbump.send('Code: 001');
        }
      
        function timers(GID){
            clearTimeout(GUI[GID].timerId);
            //mesbump.send('TIME: '+GUI[GID].timer);//H
            GUI[GID].timerId = setTimeout(bump,GUI[GID].timer*1000, GID);
        }

        function equation(){
            var c = 0;
            var a = parseInt(args[5].slice(2));
            var b = parseInt(args[7]);
            var f ='!';
            switch (args[6]){
                case '+':
                c=a+b;
                break;
                case '-':
                c=a-b;
                break;
                case '*':
                c=a*b;
                break;
                case '/':
                c=a/b;
                break;
                default:
                mesbump.send('Error 002')
                //mesbump.send(message.content);
                break;
            }
            return f+c;
        }
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const command = args.shift().slice(prefix.length).toLowerCase();
    if(command === 'ping'){
        message.channel.send('**Ping : '+client.ping+'**');
    }
    if(command === 'uptime'){
	const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    	message.channel.send(duration);
    }
})



client.on('error',(error)=>{
	//client.channels.get(cid).send('return error');
    //console.log("return error");
});

client.on('warn', console.warn);

client.on('disconnect', () => console.log('Disconnected'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));
