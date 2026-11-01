import { Gfx, PENCIL, oval, line, type Ctx, type Env, type P } from "./core";
import type { Film } from "./film";
const TAU = Math.PI * 2;
const hills: {points:P[]; color:string}[] = [
 {points:[[-40,460],[100,384],[245,410],[420,338],[615,402],[808,322],[1030,392],[1320,343],[1320,760],[-40,760]],color:'#9eb6ad'},
 {points:[[-40,520],[150,470],[310,492],[520,422],[725,450],[940,405],[1150,450],[1320,414],[1320,760],[-40,760]],color:'#789b81'},
 {points:[[-40,614],[150,548],[340,574],[540,518],[760,564],[1000,499],[1320,550],[1320,760],[-40,760]],color:'#476e61'}
];
const cloud:P[]=[[-105,12],[-92,-7],[-62,-12],[-45,-35],[-15,-40],[12,-26],[35,-40],[66,-30],[77,-8],[102,0],[112,19],[65,29],[5,25],[-48,30]];
function draw(ctx:Ctx, frame:number, env:Env){
 const t=frame/120, g=new Gfx(ctx,env,0,PENCIL);
 ctx.setTransform(env.scale,0,0,env.scale,0,0);
 ctx.fillStyle='#f8f1df';ctx.fillRect(0,0,env.W,env.H);
 g.group('paint',()=>g.wash([[0,0],[1280,0],[1280,530],[0,530]],'#bddbd9',{seed:1,alpha:.58,dx:0,dy:0,shrink:1,rim:false}));
 const sx=905+40*Math.sin(TAU*t),sy=185-22*Math.cos(TAU*t);
 g.group('paint',()=>{
  g.wash(oval(sx,sy,85,85,48),'#eccd83',{seed:3,alpha:.17,dx:0,dy:0,shrink:1,rim:false});
  g.wash(oval(sx,sy,58,58,48),'#e8b45a',{seed:4,alpha:.95,dx:0,dy:0,shrink:1});
 });
 for(const [i,x,y,k] of [[0,260,180,1],[1,610,125,.75],[2,1100,285,.7]]){
  g.push(x+30*Math.sin(TAU*t+i*1.7),y+6*Math.sin(TAU*t+i),k);
  g.group('paint',()=>g.wash(cloud,'#fffaf0',{seed:10+i,alpha:.92,dx:0,dy:0,shrink:1,rim:false}));g.pop();
 }
 for(const [i,h] of hills.entries()){
  g.group('paint',()=>g.wash(h.points,h.color,{seed:30+i,alpha:1,dx:0,dy:0,shrink:1,rim:false}));
  g.group('ink',()=>g.pen(h.points.slice(0,-2),{seed:50+i,w:.9,opacity:.28,boil:0}));
 }
 g.group('ink',()=>{
  for(let i=0;i<34;i++){const x=30+i*39,y=650+24*Math.sin(i*1.9),sway=5*Math.sin(TAU*t+i*.4);g.pen(line([x,y+26],[x+sway,y],3),{seed:80+i,w:1.3,opacity:.38,boil:0})}
 });
 g.paper('paper',.12);g.paper('coldpress',.17);
}
export const scene:Film={meta:{title:'Morning, in watercolor',W:1280,H:720,fps:24,bpm:60,durationFrames:120},assets:{images:{}},shots:[{id:'morning',start:0,end:120,draw}]};
