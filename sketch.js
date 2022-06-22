var table;
var shotcases = [];
let image1;
let sound;
let region

var shotcase = function(flo,fla,ni,re) {
  
  this.from_long = flo
  this.from_lat = fla
  this.n_injured = ni
  this.region = re

  

  this.x = map(this.from_long,-130,-60,30,width)
  this.y = map(this.from_lat, 20,65,height,0)

  this.selected = function() {
    if ( dist(mouseX, mouseY, this.x, this.y) < 10 ) {
        return true
    } else {
        return false
    }
  }
  
  this.selected1 = function() {
    if ( dist(mouseX, mouseY, this.x, this.y) < 1.5 ) {
        return true
    } else {
        return false
    }
  }

  this.drawshotcase = function() {
    
    if ( this.selected() ) {
      fill(255)
      rect(0,160,1000,70)
      fill(0)
      textSize(45);
      textFont(font2)
      text(this.n_injured+" were injured in the shooting in "+this.region,10,207)
      push()
      tint(255, 126);
      image(image4,this.x, this.y,20,20)
      pop()
      
    }
    
    ellipse(this.x, this.y, 5,5)
    
    
  }
  this.soundshotcase = function() {
    if ( this.selected1() ) {
      sound.play(); } 
  }
  this.drawcase = function() {
    this.drawshotcase()
    this.soundshotcase()
  }
}

function preload() {
  table = loadTable("gunViolence3 (2) 2.csv","csv","header")
  image1 = loadImage("gunshots.png")
  
  image4= loadImage("burnhole.png")
 
  font2=loadFont("Imperial Bold Italic.ttf")
  
  sound = loadSound("shotgun.mp3")
}

function setup() {
  createCanvas(1000, 800);
  background(image1)
  noStroke()
  noLoop()

  var rows = table.getRows()
  for ( var r in rows ) 
  {
      var from_long = rows[r].getNum("longitude")
      var from_lat = rows[r].getNum("latitude")
      var n_injured=rows[r].getNum("SUM")
     var region=rows[r].getString("state")
   
     
    var this_case = new shotcase(from_long, from_lat, n_injured, region)
    shotcases.push(this_case)
  }
}

function draw() {
 
  for ( var i in shotcases ) {
    shotcases[i].drawcase()
  }
}

function mouseMoved() {
  redraw()
  return false
}