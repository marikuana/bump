const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
//const embed = new Discord.RichEmbed();

const prefix = "!";
client.login(process.env.BOT_TOKEN);

var timer = 5;
var timerId;
var score;
var c = 00;
const cid = process.env.GUILD_ID;



client.on('ready',(ready)=>{
    console.log('ready');
    bumping1f();
})

function bumping1f(){

    client.channels.get(cid).send(process.env.text_0);
	timer = 600;
    client.channels.get(cid).send('TIME: '+timer);
    timerId = setTimeout(bumping1f,timer*1000);
    return;
}


client.on('message',(message)=>{
    const mesbump = message.guild.channels.get(cid);
    const args = message.content.split(/ +/);
    const command = args[0].slice(prefix.length).toLowerCase();
        
    if (message.author.id =='315926021457051650'){
        bumping();

        function bumping(){
            if (args[0]=== process.env.text_1){
                equation();
                timer = 10;
                timers();
                return;
            }
            if (args[0]=== process.env.text_2) {
                timer = parseInt(3600*4+30);
                mesbump.send('Server bumped');
                score = fs.readFileSync("score.txt", "utf8");
                fs.writeFileSync("score.txt", ++score);
                timers();
                return;
            }
            if (args[0]=== process.env.text_3){
                timer = parseInt(args[7])*3600+parseInt(args[9])*60+60;
                mesbump.send('Next bump point');
                timers();
                return;
            }
            //mesbump.send('1) '+ args[0]);
            return mesbump.send('Error: 001');
        }
      
        function timers(){
            clearTimeout(timerId);
            mesbump.send('TIME: '+timer);
            timerId = setTimeout(bumping1,timer*1000);
        }

        function bumping1(){
            funstats = 1;
            mesbump.send('Mes countent)  '+message.content);
            mesbump.send(process.env.text_0);
			timer = 600;
			timers();
            return;
        }

        function equation(){
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
                mesbump.send('Error 001')
                mesbump.send(message.content);
                break;
            }
            return mesbump.send(f+c);
        }
    }

    if (message.author.bot) return;
    if (command.startsWith(prefix)) return;


})

client.on('error',(error)=>{
	client.channels.get(cid).send('return error');
    //console.log("return error");
});

