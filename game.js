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
var score = 0;
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
                    Math.random()*(-2)-2,
                    Math.random()*(-2)-2,
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
        window.addEventListener('keypress',game.init,false);
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
                life -=20;
                // console.log(life);
                enemies.splice(i,1);
                var temp = new enemy(
                    Math.random()*2*canvas.width,
                    Math.random()*canvas.height-canvas.height,
                    Math.random()*(-2)-1.5*level,
                    Math.random()*(-2)-1.5*level,
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
                    Math.random()*(-2)-1.5*level,
                    Math.random()*(-2)-1.5*level,
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
        c.font = "20px Arial";
        
        c.fillText("Score : " + score,50,50);

        // c.fillStyle = "rgb("+255*life/100+','+255*life/100+','+255*life/100+')';
        c.fillRect(200,33,life*2,20);

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
        
    },

    loop: function() {
        if(life){
        score++;
        if(score%1000 == 0){
            level++;
        }
        if(score%1000==0||score%1000==1||score%1000==2||score%1000==3||score%1000==4){
            c.font = "30px Arial"; 
            c.fillStyle = "blue";
            c.fillText("Level up",canvas.width/2-250,53);
            c.fillStyle = playerColor;
        }
            
        game.update();
        game.render();
        requestAnimFrame(game.loop);
        }
        else{
            c.clearRect(0,0,canvas.width,canvas.height);
            c.beginPath();
            c.font = "30px Arial";
            c.fillText("Score : "+score,canvas.width/2-40,canvas.height/2-20);
            c.closePath();
        }
    }
};

window.addEventListener('load',game.start,false);
window.onmousemove = function(e){
    game.mousex = e.x;
    game.mousey = e.y;
}
