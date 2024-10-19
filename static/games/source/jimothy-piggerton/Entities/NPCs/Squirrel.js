class Squirrel extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 30;
    this.h = 30;
    this.width = this.w;
    this.height = this.h;
    this.jumpPower = 10;
    this.killPlayer = false;
    this.isSquirrel = true;
    this.wallJumps = true;  
    this.color1 = "#c60";
    this.color2 = "#420";
    this.color3 = "#a42";
    this.turnsAroundAtWall = false;
    this.speed = 7;
    this.d=1;
    this.jumpTimer = 0;
    this.shouldJump = true;
    this.eyes = this.addShape(new Eyes(this));
    this.eyes.color="#000";
    this.eyes.w1 = 5;
    this.eyes.w2 = 4;
    this.eyes.h = 5;
    this.eyes.eyeDistance = 16;
    this.eyes.y = 0.8;
    this.eyes.x=10;
    this.groundAccel=2;
    this.groundDecel=1;
    this.hitboxScalarX = 2;
  }
  getHitByEntity(player) {
    player.bounceOffEntity(this);
    this.height/=4;
    this.width*=.8;
        // this.h=this.h/2;
        // this.die();
    // if(this.shouldJump) {
    //   this.jump();
    // }
    // if(!this.grounded&&!this.wallCollideTimer) {
      this.d=-this.d;
    // }
  }
  runUpate(dt,frameCount) {
    var dx = this.game.player.x-this.x;
    var dy = this.game.player.y-this.y;
    var jt = 10;
    if(!this.grounded)jt=4;
    // if(Math.abs(dy)>200)this.shouldJump=false;
    // if(dy>100)this.shouldJump = false;
    if(this.grounded)this.shouldJump=true;
    // if(Math.abs(dx)<200&&this.shouldJump) {
    if(this.shouldJump) {
        // this.mx = -Math.sign(dx);
        this.mx=this.d;
        if(!this.grounded||this.wallcolliding) {
        // if(!this.grounded) {
            this.jumpTimer += dt;
            if(this.jumpTimer>jt) {
                this.jump();
                this.jumpTimer = 0;
            }
        }
    } else {
        this.mx = 0;
        this.jumpTimer = 0;
    }
    if(this.mx==0||!this.grounded) {
      this.w=25;
      this.h=35;
    } else {
      this.w=35;
      this.h=25;
    }
  }
  originalUpdate(dt, frameCount) {
    var dx = this.game.player.x-this.x;
    var dy = this.game.player.y-this.y;
    var jt = 10;
    if(!this.grounded)jt=4;
    if(Math.abs(dy)>200)this.shouldJump=false;
    // if(dy>100)this.shouldJump = false;
    if(this.grounded)this.shouldJump=true;
    if(Math.abs(dx)<200&&this.shouldJump) {
        // this.mx = -Math.sign(dx);
        this.mx=this.d;
        if(!this.grounded||Math.abs(dx)<100) {
        // if(!this.grounded) {
            this.jumpTimer += dt;
            if(this.jumpTimer>jt) {
                // if(this.wallcolliding&&!this.grounded) this.d=-this.d;
                this.jump();
                this.jumpTimer = 0;
            }
        }
    } else {
        this.mx = 0;
        this.jumpTimer = 0;
    }
    if(this.mx==0||!this.grounded) {
      this.w=25;
      this.h=35;
    } else {
      this.w=35;
      this.h=25;
    }
  }
  update(dt, frameCount) {
    this.originalUpdate(dt,frameCount);
    super.update(dt,frameCount);
  }

  drawShape(canvas, w,h) {
    canvas.fillStyle = this.color1;    
    canvas.strokeStyle = this.color2;
    canvas.lineWidth = 6;
    var bh = h*.8;
    canvas.strokeRect(-w/2,-h, w,bh);
    canvas.fillRect(-w/2,-h, w,bh);
    canvas.fillStyle = this.color3;
    canvas.fillRect(-w/2,-h, w*.3,bh);

    canvas.fillStyle = "#000";
    var teethW = 6;
    var teethH = 3;
    var teethX = this.eyes.eyeMovement.x+this.eyes.x-this.eyes.eyeDistance/3;
    var teethY = this.eyes.y*-h+this.eyes.eyeMovement.y+2;
    canvas.fillRect(teethX-teethW/2,teethY, teethW,teethH);
    canvas.fillStyle = "#fff";
    var teethW = 4;
    canvas.fillRect(teethX-teethW/2,teethY+teethH, teethW,teethH);

    canvas.fillStyle = this.color2;
    var d = this.angle*10;
    var avx = Math.abs(this.vx);
    var handy = -h/2+avx*1.2;
    var hx1 = w*17/30+avx/4+d;
    var hx2 = w*8/30-avx/4-d;
    var hw = 30/4;
    var hx3=-w/2+d;
    var hx4=0-d;
    var earx1 = -w/4-hw/2;
    var earx2 = w/4-hw/2;
    canvas.fillRect(-w/4+hx1,handy, hw,h/4);
    canvas.fillRect(-w/4+hx2,handy,hw,h/4);
    canvas.fillRect(earx1,-h-h/4, hw,h/4);
    canvas.fillRect(earx2,-h-h/4, hw,h/4);

    canvas.fillRect(hx3,-h+bh,hw,h/4);
    canvas.fillRect(hx4,-h+bh,hw,h/4);
    canvas.fillStyle = this.color3;
    var p = 2;
    canvas.fillRect(-w/4+p+hx1,handy, hw-p*2,h/4-p);
    canvas.fillRect(-w/4+p+hx2,handy, hw-p*2,h/4-p);
    canvas.fillRect(earx1+p,-h-h/4+p, hw-p*2,h/4-p);
    canvas.fillRect(earx2+p,-h-h/4+p, hw-p*2,h/4-p);
    canvas.fillRect(hx3+p,-h+bh,hw-p*2,h/4-p);
    canvas.fillRect(hx4+p,-h+bh,hw-p*2,h/4-p);

    
    this.drawTail(canvas, w,h);
    this.shapes.forEach(s=>s.drawShape(canvas,w,h));

    
  }
  drawTail(canvas, w,h) {
    canvas.fillStyle = 'brown';
    var width = 30;
    // canvas.fillRect(-w/2-width,-10,width,10);
    var dx = Math.cos(Date.now()/500)*10;
    var dy = 0;
    if(this.canWallJump) {
      dy = 10;
      canvas.fillStyle="#c60";
      canvas.lineWidth = 7;
      // canvas.fillStyle="#fff";
      width += 5;
    }
    var a = Math.cos(Date.now()/300)*Math.PI/30+Math.PI/20+this.vy/30;
    canvas.save();
    canvas.rotate(a);
    canvas.beginPath();
    canvas.moveTo(-w/2, -1);
    canvas.quadraticCurveTo(-w/2-width/2, -1, -w/2-width/2+dx/2,-width/2-dx/2);
    canvas.quadraticCurveTo(-w/2, -width, -w/2-width,-width-dx-dy);
    canvas.quadraticCurveTo(-w/2-width, -1, -w/2-10,-1);
    // canvas.closePath();
    if(this.canWallJump) {
      canvas.strokeStyle = "white";
    }  
    canvas.stroke();

    canvas.fill();    
    canvas.fillStyle = '#a42';    
    canvas.beginPath();
    canvas.moveTo(-w/2, -1);
    canvas.quadraticCurveTo(-w/2-width, -width/2, -w/2-width,-width-dx);
    canvas.quadraticCurveTo(-w/2-width, -1, -w/2-10,-1);
    // if(this.wallCollideTimer>0) {
      // canvas.strokeStyle = "white";
      // canvas.stroke();
    // }    
    canvas.fill();    
    canvas.restore();
    
  }
}