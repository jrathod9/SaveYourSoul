var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-25;
var c = canvas.getContext('2d');

var life = 100;
var enemyColor = 'black';
var playerColor = 'white';
var maxEnemies = 100;
var level = 1;
var enemies = new Array();
var p; 
var count = 0;
var frames = 100;


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
    mousex : 0,
    mousey : 0, 
    prevx : 0,
    prevy : 0,
    init : function(){
        var i = 0;
        for(i=0;i<maxEnemies;i++){
            var temp = new enemy(
                    Math.random()*2*canvas.width,
                    Math.random()*canvas.height-canvas.height,
                    Math.random()*(-5)-2,
                    0,
                    Math.random()*3+3,enemyColor
                );
            temp.vy = -1*temp.vx;
            enemies.push(temp);    
        }
        for(i=0;i<maxEnemies;i++){
            enemies[i].vy = -1*enemies[i].vx;
        }
        p = new player(mousex,mousey,10,playerColor);
        game.loop();
    },

    distance : function(ob1,ob2){
        var res = Math.sqrt((ob1.x - ob2.x)**2 + (ob1.y - ob2.y)**2);
        return res;
    },

    update : function(){
        var i=0;
        p.x = game.mousex;
        p.y = game.mousey;
        for(i=0;i<maxEnemies;i++){
            enemies[i].x+=enemies[i].vx;
            enemies[i].y+=enemies[i].vy;
            
            if(game.distance(enemies[i],p)<=enemies[i].rad+p.rad){
                life --;
                // console.log(life);
                enemies.splice(i,1);
                var temp = new enemy(
                    Math.random()*2*canvas.width,
                    Math.random()*canvas.height-canvas.height,
                    Math.random()*(-5)-2,
                    0,
                    Math.random()*3+3,enemyColor
                );
                temp.vy = -1*temp.vx;
                enemies.push(temp);
            }

            if(enemies[i].x <= 0 || enemies[i].y >= canvas.height){
                enemies.splice(i,1);
                // setTimeout( function() {
                //     enemies.splice(i,1);
                //   }, 0);
                i--; 
                var temp = new enemy(
                    Math.random()*2*canvas.width,
                    Math.random()*canvas.height-canvas.height,
                    Math.random()*(-5)-2,
                    0,
                    Math.random()*3+3,enemyColor
                );
                temp.vy=-1*temp.vx;
                enemies.push(temp);
            }
        }
    },

    render : function(){
        count++;
        count=count%frames;
        if(count==0){
            game.prevx = game.mousex;
            game.prevy = game.mousey;
        }
        var i;
        // c.clearRect(0,0,canvas.width,canvas.height);
        c.fillStyle = 'rgba(0,0,0,0.1)';
        c.beginPath();
        c.fillRect(0, 0 ,canvas.width, canvas.height);
        c.closePath();
        c.fillStyle = enemyColor;
        c.globalAlpha = 0.8;
        for(i=0;i<maxEnemies;i++){
            c.beginPath();
            c.shadowBlur = 10;
			c.shadowColor = "red";
            c.arc(enemies[i].x,enemies[i].y,enemies[i].rad,0,Math.PI*2,false);
            c.closePath();
            c.fill();
        }
        c.globalAlpha = 1;
        c.fillStyle = playerColor;
        c.shadowBlur = 20;
        c.shadowColor = "aqua";
        c.beginPath();
        c.arc(p.x,p.y,p.rad,0,Math.PI*2,false);
        c.closePath();
        c.fill();
        c.shadowColor = "white";

        // c.beginPath();
        //     c.strokeStyle = 'red';
        //     c.moveTo(mousex,mousey);
        //     c.lineTo(game.prevx,game.prevy);
        //     c.lineWidth = 1;
        //     c.closePath();
        //     c.stroke();

        // c.moveTo(p.x,p.y);
        // c.beginPath();
        // c.strokeStyle = "red";
        // c.lineTo(game.prevx,game.prevy);
        // c.closePath();
        // c.stroke();
        
        
    },

    loop: function() {

        game.update();
        game.render();
        
        requestAnimFrame(game.loop);
    }
};

window.addEventListener('load',game.init,false);
window.onmousemove = function(e){
    game.mousex = e.x;
    game.mousey = e.y;
}
