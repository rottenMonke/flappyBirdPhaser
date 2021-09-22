/*! For license information please see mainfd047f9e83f1940f92ad.js.LICENSE.txt */
    position: absolute;
    font-size: 40px;
    color: white;
    top: 40px;
    left: 50%;
    transform: translate(-50%,-50%);
    @media (max-width: 750px) {
      font-size: 20px;
    }
`;function Lt(){return t.useEffect((()=>{Rt=document.getElementById(a)}),[]),t.createElement("h1",{id:a,className:Ot},"0")}const kt=new(window.AudioContext||window.webkitAudioContext),Dt=833,Ft={isStatic:!0},It=16.6,Bt=3.652;let Nt,Ut,Yt=0;const zt={type:d().AUTO,width:800,height:600,fps:{smoothStep:!0,target:30},physics:{default:"matter",matter:{positionIterations:1,velocityIterations:1,constraintIterations:0,plugins:{collisionevents:!1},gravity:{y:2},autoUpdate:!1}},scene:{preload:function(){this.load.image("pipeBottom","assets/pipeBottom.png"),this.load.image("pipeTop","assets/pipeTop.png"),this.load.image("ground","assets/ground.png"),this.load.image("background","assets/BackgroundSea.png"),this.load.spritesheet("bird","assets/defaultBirdSpritesheet.png",{frameWidth:50,frameHeight:39,spacing:0}),this.load.audio("jump","assets/wing.mp3"),this.load.audio("point","assets/counter.mp3"),this.load.audio("hit","assets/punch.mp3")},create:function(){Gt=this,Wt=this.sound.add("jump"),Wt.allowMultiple=!0,Vt=this.sound.add("point"),Vt.allowMultiple=!0,Ht=this.sound.add("hit"),Ht.allowMultiple=!0,jt=this.add.tileSprite(0,0,800,520,"background").setOrigin(0),Xt=this.matter.add.sprite(100,200,"bird",null,{isStatic:!0}),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:0,end:4}),frameRate:10,repeat:-1}),this.anims.create({key:"dead",frames:[{key:"bird",frame:5}],frameRate:1}),Xt.anims.play("fly"),qt=this.add.tileSprite(400,560,800,112,"ground"),qt.setDepth(1),this.matter.add.gameObject(qt,{isStatic:!0}),ie(),fe(),this.matter.world.on("collisionstart",ae),this.input.on("pointerdown",oe);const t=this.input.keyboard.addKeys("UP,SPACE,W,J");t.UP.on("down",se),t.SPACE.on("down",se),t.W.on("down",se),t.J.on("down",se),window.toggleFullscreen=()=>this.scale.toggleFullscreen()},update:function(t,e){Yt+=e,Yt>=It&&(ee?(de(),ce()):te||(Xt.y<0&&ae(),ce(),de(),Zt.movePipes(),Jt<22?Jt+=1:Xt.angle<90&&(Xt.angle+=Qt,Qt+=.3652),Zt[Kt].checkX()&&(Kt++,Kt>2&&(Kt=0))),Yt-=It,this.matter.world.step(It))}},scale:{mode:d().Scale.FIT,autoCenter:d().Scale.CENTER_BOTH,width:800,height:600,fullscreenTarget:document.body},audio:{context:kt}};let Xt,Gt,Wt,Vt,Ht,jt,qt,Kt=0,Zt=[],Qt=0,Jt=0,$t=0,te=!1,ee=!0;function ie(){Nt=[],Ut=0;for(let t=0;t<150;t++){let t=ne();Nt.push({topBound:t,lowerBound:t+633})}}function ne(){const t=d().Math.RND.integerInRange(0,-200);return d().Math.RND.integerInRange(t,t+52)}function re(){if(150===Ut){let t=ne();return{topBound:t,lowerBound:t+633}}return Nt[Ut++]}function se(){l.isPlaying&&he()}function oe(t){t.event.stopPropagation(),l.isPlaying&&he()}function ae(){te||(Ht.play(),Xt.anims.play("dead"),te=!0,l.setCount($t),l.updateRecord($t),l.setCurrentScreen(o),ie())}function he(){ee&&("suspended"===kt.state&&kt.resume(),Xt.setStatic(!1),ee=!1),te||(Xt.angle=-14,le(),Xt.setVelocity(0,-9),Wt.play()),te&&ue()}function le(){Qt=0,Jt=0}function ue(){l.setCount(0),$t=0,Xt.setStatic(!0),Xt.setPosition(100,200),le(),Xt.angle=0,Xt.anims.play("fly"),Zt.destroy(),fe(),Kt=0,ee=!0,te=!1}function ce(){qt.tilePositionX+=Bt}function de(){jt.tilePositionX+=.166}function fe(){for(let t=1;t<=3;t++){const{topBound:e,lowerBound:i}=re();let n=[];n.notPassedBird=!0;let r=Gt.matter.add.image(Dt+290*t,e,"pipeTop",null,Ft),s=Gt.matter.add.image(Dt+290*t,i,"pipeBottom",null,Ft);n.checkX=function(){if(!te&&n.notPassedBird&&r.x<100)Vt.play(),$t++,t=$t,Rt.textContent=t,n.notPassedBird=!1;else if(r.x<-33){n.notPassedBird=!0;const{topBound:t,lowerBound:e}=re();return r.setPosition(Dt,t),s.setPosition(Dt,e),!0}var t;return!1},n.move=function(){r.x-=Bt,s.x-=Bt},n.destroy=function(){r.destroy(),s.destroy(),n=null},n.push(r,s),Zt.push(n)}Zt.movePipes=()=>Zt.forEach((t=>t.move())),Zt.destroy=()=>{Zt.forEach((t=>t.destroy())),Zt=[]}}new(d().Game)(zt);const pe=Pt`
  display: block;
  padding: 20px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid #ffc107;
  background: #ded895; 
  @media (max-width: 750px) {
    padding: 10px;
  }
`;function ve({children:e,onClick:i,className:n}){return t.createElement("button",{onClick:i,className:Mt(pe,n)},e)}const ge=Pt`
  color: red;
`,me=Pt`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`,ye=function(){return t.createElement("div",{className:xe},t.createElement("p",null,t.createElement("span",{className:ge},"W,J,UP,Space")," - для прыжка!"),t.createElement("p",null,t.createElement("span",{className:ge},"PRESS F")," - для Полноэкранного режима!"))},xe=Pt`
  position: absolute;
  top: calc(50% + 122px);
  left: 0px;
  right: 0px;
  white-space: nowrap;
  font-size: 16px;
  text-align: center;

  p {
    padding-bottom: 20px;
  }
`,Te=function(){return t.createElement("div",{className:we},t.createElement("p",null,t.createElement("span",{className:ge},"Тап")," - для прыжка!"))},we=Pt`
  text-align: center;
  line-height: 24px;
  padding: 10px;
`,be=Pt`
  position: absolute;
  white-space: nowrap;
  color: white;
  top: 40px;
  left: 50%;
  transform: translate(-50%, -50%);
`;function Ee({setCurrentScreen:e,record:i,appParams:n}){const r=t.useCallback((()=>e(s)),[]);return t.createElement("div",{className:me},0!==i&&t.createElement("p",{className:be},"Ваш лучший результат - ",i),t.createElement(ve,{onClick:r},"Полетели"),window.innerWidth>750?t.createElement(ye,null):t.createElement(Te,null))}const Se=Pt`
  border: 2px solid #ffc107;
  background: #ded895;
  padding: 20px;
`,_e=Pt`
  margin-top: 20px;
`,Ae=Pt`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`,Ce=Pt`
  width: 35%;
  line-height: 20px;
`;function Me({count:e,setCurrentScreen:i,record:n}){const o=t.useCallback((()=>{i(s),ue()}),[]),a=t.useCallback((()=>{i(r),ue()}),[]);return t.createElement("div",{className:me},t.createElement("div",null,t.createElement("div",{className:Se},t.createElement("div",null,"Текущий результат  - ",e),0!==n&&t.createElement("div",{className:_e},t.createElement("p",null,"Ваш лучший результат - ",n))),t.createElement("div",{className:Ae},t.createElement(ve,{className:Ce,onClick:o},"Ещё раз"),t.createElement(ve,{className:Ce,onClick:a},"Главное меню"))))}const Pe="UI_CONTAINER_ID",Re=Pt`
  & #${Pe} {
    width: 100% !important;
    height: 100% !important;
    margin: 0px !important;
  }
`,Oe=Pt`
  & {
    overflow: hidden;
  }
  & canvas {
    width: auto !important;
    height: 100% !important;
    margin: 0 !important;
  }
`;function Le(){setTimeout((()=>{const t=window.innerWidth<601,e=window.innerWidth<window.innerHeight;t&&e?(document.body.classList.add(Re),document.body.classList.add(Oe)):(document.body.classList.remove(Re),document.body.classList.remove(Oe),document.getElementById(Pe).style.cssText=document.querySelector("canvas").style.cssText)}),0)}function ke(t){(t.isComposing||"KeyF"===t.code)&&window.toggleFullscreen()}const De=Pt`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 800px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`,Fe=Pt`
  pointer-events: none;
`,Ie=Pt`
  pointer-events: all;
`,Be=Mt(De,Ie),Ne=Mt(De,Fe);function Ue(){const e=t.useContext(h);t.useEffect((()=>(Le(),window.addEventListener("resize",Le),()=>{window.removeEventListener("resize",Le)})),[]),t.useEffect((()=>(document.addEventListener("keydown",ke),()=>{document.removeEventListener("keydown",ke)})),[]);let i=t.useMemo((()=>{switch(e.currentScreen){case r:return Ee;case s:return Lt;case o:return Me}}),[e.currentScreen]);const n=t.useMemo((()=>e.currentScreen===s?Ne:Be),[i]);return t.createElement("div",{id:Pe,className:n},t.createElement(i,e))}function Ye(){return t.createElement(u,null,t.createElement(Ue,null))}e.render(t.createElement(Ye,null),document.getElementById("root"))})()})();