import React, { useEffect, useRef, useState } from 'react';
import * as BABYLON from 'babylonjs';
import { useLocation } from 'react-router-dom';

import textureImage from './assets/image.png';
import MessageTooltip from './MessageTooltip';

const Cuboid = () => {
  const canvasRef = useRef(null);
  const location = useLocation()

  console.log(location.state.image)

  const [openTooltip,setOpenTooltip] = useState(false)
  const [tooltipMsg,setTooltipMsg] = useState({})

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2,
      5,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.setPosition(new BABYLON.Vector3(0, 1, -5));

    // create material with your own texture
    const texture = new BABYLON.Texture(location.state.image, scene);
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseTexture = texture;

    // create mesh with material
    const box = BABYLON.MeshBuilder.CreateBox('box', { width: 2, height: 2, depth: 2 }, scene);
    box.material = material;

    // create ground plane
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    ground.material = groundMaterial;

    // create light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    engine.runRenderLoop(() => {
      scene.render();
    });

    setOpenTooltip(true)
    setTooltipMsg({Status: "success",msg:"ScreenShot Taken Successfully"})

    return () => {
      engine.stopRenderLoop();
      scene.dispose();
    };


  }, []);

  return (<>
  <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />
  <MessageTooltip openTooltip = {openTooltip} setOpenTooltip={setOpenTooltip} message={tooltipMsg}/>
  </>);
};

export default Cuboid;
