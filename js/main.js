var gameSize = (window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update,
        key: "bubblepop"
    },
    
    physics: {
        default: 'arcade',
        arcade: {
            debug:true
        },
        debug: true
    },
    
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
    }
};

var game = new Phaser.Game(config);

var score = 0, bubbles, bubbleSize;

function init(){
    checkBubbleSize();
}

function preload(){
    this.load.image('bubble', 'assets/bubble.png');
    this.load.image('splash', 'assets/bubble pop splash.png');
}

function create(){
    this.cameras.main.backgroundColor.setTo(29,33,45);

    createBubbles.call(this);
    
    this.text = this.add.text(10,10, "Score: "+score, {
        font: "28px Arial",
        fill: "#ffffff"
    });
}

function update(){
    
}

function createBubbles(){
    //create bubbles
    bubbles = this.add.group();
    
    for(var i = 0; i<7; i++){
        bubble = this.add.sprite(64,224, 'bubble');
        bubble = setBubbleProperties.call(this, bubble);
        bubbles.add(bubble);
    }
}

function setBubbleProperties(bubble){
    bubble.alpha = 1;
    
    var bubScale = (Math.floor(Math.random() * 2*bubbleSize) + 1)/10;
    bubble.setScale(bubScale, bubScale);
    
    var bubX = Math.floor(Math.random()*game.canvas.width);
    var bubY = Math.floor(Math.random()*game.canvas.height);
    
    if(bubX + bubble.displayWidth > game.canvas.width){
        bubX -= bubble.displayWidth;
    } else if(bubX - bubble.displayWidth < 0){
        bubX += bubble.displayWidth;
    }
    
    if(bubY + bubble.displayHeight > game.canvas.height){
        bubY -= bubble.displayHeight;
    } else if(bubY - bubble.displayHeight < 0){
        bubY += bubble.displayHeight;
    }
    
    bubble.x = bubX;
    bubble.y = bubY;
    
    /*tween = this.add.tween({
        target: bubble,
        x: 300,
        //alpha: 1,
        duration: Math.floor(Math.random()*1000),
        ease: "Linear",
    });
    */
    //tween = this.add.tween(bubble).to({alpha: 1}, Math.floor(Math.random()*1000), "Linear", true);
    bubble.setInteractive();
    bubble.on('pointerdown', bubbleClick);
    
    return bubble;
}

function bubbleClick(){
    this.disableInteractive();
    this.setVisible(false);
    
    this.timer = this.scene.time.addEvent({
        delay: Math.floor(Math.random()*2000) + 1000, 
        callback: respawn,
        callbackScope: this
    });
    
    score++;
    this.scene.text.setText("Score: " + score);
}

function respawn(){
    this.setVisible(true);
    this.removeListener('pointerdown', bubbleClick);
    setBubbleProperties(this);
}

function checkBubbleSize(){
    if(window.innerHeight <= 640){bubbleSize = 1}
    else {bubbleSize = 2}
}