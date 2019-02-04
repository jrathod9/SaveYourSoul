var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-25;
var c = canvas.getContext('2d');

var life = 100;
var enemyColor = 'red';
var playerColor = 'blue';
var maxEnemies = 100;
var level = 1;
var enemies = new Array();
var p; 


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

var game = {
    mousex : 0,
    mousey : 0, 
    init : function(){
        var i = 0;
        for(i=0;i<maxEnemies;i++){
            var temp = new enemy(
                    Math.random()*canvas.width+canvas.width,
                    Math.random()*canvas.height,
                    Math.random()*(-5)-2,
                    0,
                    Math.random()*2+3,enemyColor
                );
            enemies.push(temp);    
        }
        p = new player(mousex,mousey,7,playerColor);
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
            
            if(game.distance(enemies[i],p)<=enemies[i].rad+p.rad){
                life -= 20;
                enemies.splice(i,1);
                var temp = new enemy(
                    Math.random()*canvas.width+canvas.width,
                    Math.random()*canvas.height,
                    Math.random()*(-5)-2,
                    0,
                    Math.random()*5+5,
                    enemyColor
                );
                enemies.push(temp);
            }

            if(enemies[i].x <= 0){
                enemies.splice(i,1);
                i--; 
                var temp = new enemy(
                    Math.random()*canvas.width+canvas.width,
                    Math.random()*canvas.height,
                    Math.random()*(-5)-2,
                    0,
                    Math.random()*5+5,
                    enemyColor
                );
                enemies.push(temp);
            }
        }
    },

    render : function(){
        var i;
        c.clearRect(0,0,canvas.width,canvas.height);
        c.fillStyle = enemyColor;
        
        for(i=0;i<maxEnemies;i++){
            c.beginPath();
            c.arc(enemies[i].x,enemies[i].y,enemies[i].rad,0,Math.PI*2,false);
            c.closePath();
            c.fill();
        }
        
        c.fillStyle = playerColor;
        c.beginPath();
        c.arc(p.x,p.y,p.rad,0,Math.PI*2,false);
        c.closePath();
        c.fill();
    },

    loop: function() {

        game.update();
        game.render();
        requestAnimationFrame(game.loop);
    }
};

window.addEventListener('load',game.init,false);
window.onmousemove = function(e){
    game.mousex = e.x;
    game.mousey = e.y;
}
