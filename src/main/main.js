import * as THREE from 'three'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
// 添加相机到场景
scene.add(camera)

// 创建物体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(boxGeometry, material)
// 添加物体到场景
scene.add(cube)

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// 添加到文档中
document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)