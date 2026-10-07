import * as THREE from 'three';
import {route,exhibitPosition,stops} from './data.ts';
export function walkingShot(progress:number,mobile=false){
 const point=new THREE.Vector3(...route(progress));
 const before=new THREE.Vector3(...route(Math.max(0,progress-.006)));
 const after=new THREE.Vector3(...route(Math.min(1,progress+.006)));
 const forward=after.sub(before).normalize();
 const right=new THREE.Vector3(-forward.z,0,forward.x);
 // Right-hand side of the clockwise path contains the exhibits.
 const outward=point.clone().setY(0).normalize();
 const position=point.clone().addScaledVector(forward,mobile?-6.8:-5.4).addScaledVector(outward,-.4);position.y=mobile?3.65:3.15;
 const look=point.clone().addScaledVector(forward,2.4).addScaledVector(outward,.65);look.y=1.2;
 return {position,look,forward,right,fov:mobile?62:53};
}
export function exhibitShot(id:string,mobile=false){
 const stop=stops.find(s=>s.id===id)!;
 const object=new THREE.Vector3(...exhibitPosition(stop.progress));
 // The introduction board faces the entrance (+Z), including in its close-up.
 const inward=stop.exhibit==='about'?new THREE.Vector3(0,0,1):new THREE.Vector3(...route(stop.progress)).sub(object).normalize();
 const tangent=new THREE.Vector3(-inward.z,0,inward.x);
 const position=object.clone().addScaledVector(inward,mobile?4.9:4.3).addScaledVector(tangent,2.0);position.y=2.75;
 const look=object.clone();look.y=mobile?.45:1.25;
 // Leave breathing room beside the object for the desktop details panel.
 if(!mobile){const forward=look.clone().sub(position).normalize();const screenRight=new THREE.Vector3().crossVectors(forward,new THREE.Vector3(0,1,0)).normalize();look.addScaledVector(screenRight,1.05)}
 return {position,look,fov:mobile?49:45};
}
