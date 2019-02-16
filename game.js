var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-25;
var c = canvas.getContext('2d');

var enemy = function(x,y,vx,vy,rad,clr){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.rad = rad;
    this.clr = clr;
}
var mousex,mousey;
var player = function(x,y,rad,clr){
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.clr = clr;
}

var powerup = function(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.msRequestAnimationFrame     ||
            window.oRequestAnimationFrame      ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

var game = {
    life : 100,
    powerups : new Array(),
    enemyColor : 'black',
    playerColor : 'white',
    maxEnemies : 100,
    level : 1,
    alive : 0,
    enemies : new Array(),
    p : null, 
    count : 0,
    score : 0,
    frames: 100,
    mousex : 0,
    mousey : 0, 
    prevx : 0,
    prevy : 0,
    types : ["life","shield"],

    init : function(){
    game.life = 100;
    game.alive = 1;
    game.enemyColor = 'black';
    game.playerColor = 'white';
    game.maxEnemies = 100;
    game.level = 1;
    game.enemies = new Array();
    game.p = null;
    game.powerups = new Array();
    game.count = 0;
    game.score = 0;
    game.frames= 100;
    game.mousex = 0;
    game.mousey = 0; 
    game.prevx = 0;
    game.prevy = 0;
        var i = 0;
        for(i=0;i<game.maxEnemies;i++){
            var temp = new enemy(
                    Math.random()*2*canvas.width,
                    Math.random()*canvas.height-canvas.height,
                    Math.random()*(-2)-2,
                    Math.random()*(-2)-2,
                    Math.random()*3+3,game.enemyColor
                );
            temp.vy = -1*temp.vx;
            game.enemies.push(temp);    
        }
        for(i=0;i<game.maxEnemies;i++){
            game.enemies[i].vy = -1*game.enemies[i].vx;
        }
        game.p = new player(mousex,mousey,10,game.playerColor);
        game.loop();
    },
    start : function() {
        c.clearRect(0,0,canvas.width,canvas.height);
        c.font = "60px Calibri";
        c.fillStyle = "aqua";
        c.shadowBlur = 10;
		c.shadowColor = "aqua";
        // c.beginPath();
        c.fillText("-- $ave Your $oul --",canvas.width/2-240,canvas.height/2-50);
        c.font = "15px Calibri";
        c.fillStyle = "aquamarine";
        c.shadowBlur=1;
        c.fillText("J A Y  R A T H O D",canvas.width/2-65,canvas.height/2-30);
        c.font = "17px Calibri";
        // c.globalAlpha=0.5;
        c.fillStyle = "tomato";
        c.shadowBlur=0;
        c.fillText("Devil spirits have attacked $oulyard....",canvas.width/2-135,canvas.height/2);
        c.fillText("Prevent the spirits from touching your $oul.",canvas.width/2-150,canvas.height/2+16);
        c.globalAlpha=1;
        c.fillStyle = "aqua";
        c.shadowBlur=5;
        c.fillText("CONTROLS : Use MOUSE to move your soul.",canvas.width/2-165,canvas.height/2+50);
        c.fillStyle = "white";
        c.shadowBlur=1;
        c.fillText("[ Press any key to start ]",canvas.width/2-90,canvas.height/2+230);
        // c.closePath();
        window.addEventListener('keypress',game.check,false);
    },

    check : function(){
        if(game.alive==0){
            game.alive =  1;
            game.init();
        }
    },

    distance : function(ob1,ob2){
        var res = Math.sqrt((ob1.x - ob2.x)**2 + (ob1.y - ob2.y)**2);
        return res;
    },

    update : function(){
        // if(game.life<100 && game.score % 355 == 0){
        //     var temp = new powerup( 
        //                 Math.random()*2*canvas.width,
        //                 Math.random()*canvas.height-canvas.height,
        //                 Math.floor(Math.random()*2);                //0 for life 1 for shield
        //     game.powerups.push(temp);
        // }
        var i=0;
        game.p.x = game.mousex;
        game.p.y = game.mousey;
        for(i=0;i<game.maxEnemies;i++){
            game.enemies[i].x+=game.enemies[i].vx;
            game.enemies[i].y+=game.enemies[i].vy;
            
            if(game.distance(game.enemies[i],game.p)<=game.enemies[i].rad+game.p.rad){
                game.life -=20;
                if(game.life == 0)
                    game.alive = 0;
                // console.log(life);
                game.enemies.splice(i,1);
                var temp = new enemy(
                    Math.random()*2*canvas.width,
                    Math.random()*canvas.height-canvas.height,
                    Math.random()*(-2)-1.5*game.level,
                    Math.random()*(-2)-1.5*game.level,
                    Math.random()*3+3,game.enemyColor
                );
                temp.vy = -1*temp.vx;
                game.enemies.push(temp);
            }

            if(game.enemies[i].x <= 0 || game.enemies[i].y >= canvas.height){
                game.enemies.splice(i,1);
                // setTimeout( function() {
                //     enemies.splice(i,1);
                //   }, 0);
                i--; 
                var temp = new enemy(
                    Math.random()*2*canvas.width,
                    Math.random()*canvas.height-canvas.height,
                    Math.random()*(-2)-1.5*game.level,
                    Math.random()*(-2)-1.5*game.level,
                    Math.random()*3+3,game.enemyColor
                );
                temp.vy=-1*temp.vx;
                game.enemies.push(temp);
            }
        }
    },

    render : function(){
        game.count++;
        game.count=game.count%game.frames;
        if(game.count==0){
            game.prevx = game.mousex;
            game.prevy = game.mousey;
        }
        var i;
        // c.clearRect(0,0,canvas.width,canvas.height);
        c.font = "20px Arial";
        
        c.fillText("Score : " + game.score,50,50);

        // c.fillStyle = "rgb("+255*life/100+','+255*life/100+','+255*life/100+')';
        c.fillRect(200,33,game.life*2,20);

        c.fillStyle = 'rgba(0,0,0,0.1)';
        c.beginPath();
        c.fillRect(0, 0 ,canvas.width, canvas.height);
        c.closePath();
        c.fillStyle = game.enemyColor;
        c.globalAlpha = 0.8;
        for(i=0;i<game.maxEnemies;i++){
            c.beginPath();
            c.shadowBlur = 10;
			c.shadowColor = "red";
            c.arc(game.enemies[i].x,game.enemies[i].y,game.enemies[i].rad,0,Math.PI*2,false);
            c.closePath();
            c.fill();
        }
        c.globalAlpha = 1;
        c.fillStyle = game.playerColor;
        c.shadowBlur = 20;
        c.shadowColor = "aqua";
        c.beginPath();
        c.arc(game.p.x,game.p.y,game.p.rad,0,Math.PI*2,false);
        c.closePath();
        c.fill();
        c.shadowColor = "white";
        
    },

    loop: function() {
        if(game.life){
        game.score++;
        if(game.score%1000 == 0){
            game.level++;
        }
        if(game.score%1000<=0 && game.score%1000<=10){
            c.font = "30px Arial"; 
            c.fillStyle = "blue";
            c.fillText("Level up",canvas.width/2-250,53);
            c.fillStyle = game.playerColor;
        } 
        game.update();
        game.render();
        requestAnimFrame(game.loop);
        }
        else{
            c.clearRect(0,0,canvas.width,canvas.height);
            c.beginPath();
            c.font = "30px Calibri";
            c.fillStyle = "aquamarine";
            c.fillText("Score : "+game.score,canvas.width/2-40,canvas.height/2-20);
            c.font = "15px Arial";
            c.fillText("[ Click anywhere to play again ]",canvas.width/2-70,canvas.height/2);
            c.closePath();
            window.addEventListener('mousedown',game.check,false);
        }
    }
};

window.addEventListener('load',game.start,false);
window.onmousemove = function(e){
    game.mousex = e.x;
    game.mousey = e.y;
}
