import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {walkingShot,exhibitShot} from '../src/cameraPath.ts';
import {route,exhibitPosition,stops} from '../src/data.ts';
test('walking camera stays behind the character throughout the lap',()=>{for(let i=0;i<=100;i++){const p=i/100;const shot=walkingShot(p);const offset=shot.position.clone().sub(new THREE.Vector3(...route(p)));assert.ok(offset.dot(shot.forward)<-4.8);assert.ok(shot.position.y<4);assert.equal(shot.fov,53);assert.ok([...shot.position.toArray(),...shot.look.toArray()].every(Number.isFinite))}});
test('each click destination has a finite close-up near its own exhibit',()=>{for(const stop of stops){for(const mobile of [false,true]){const shot=exhibitShot(stop.id,mobile);const distance=shot.position.distanceTo(new THREE.Vector3(...exhibitPosition(stop.progress)));assert.ok(distance>4&&distance<7);assert.ok(shot.look.distanceTo(new THREE.Vector3(...exhibitPosition(stop.progress)))<2);assert.ok([...shot.position.toArray(),...shot.look.toArray()].every(Number.isFinite))}}});
test('entrance joins the circular path continuously and lap closes',()=>{assert.equal(route(0)[2],19.5);const before=route(.08-1e-7),after=route(.08+1e-7);assert.ok(Math.hypot(before[0]-after[0],before[2]-after[2])<.001);assert.ok(Math.hypot(route(1)[0],route(1)[2]-8.2)<1e-8)});
test('about board is beside, not on, the entrance walkway',()=>{const board=exhibitPosition(.08);assert.ok(board[0]>2);assert.ok(board[2]>9)});
