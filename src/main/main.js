import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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
// 移动物体
// cube.position.set(5, 0, 0)
cube.position.x = 5
// 缩放物体
// cube.scale.set(3, 2, 1)
// 旋转物体
// cube.rotation.set(Math.PI / 4, 0, 0)

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// 添加到文档中
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// Clock
const clock = new THREE.Clock()

function render() {
  // 移动物体
  // cube.position.x += 0.01
  // if (cube.position.x > 5) cube.position.x = 0
  // const t = time / 1000 % 5
  // cube.position.x = t * 1
  // 使用Clock记录时间
  const time = clock.getElapsedTime()
  const t = time % 5
  cube.position.x = t * 1

  // 缩放物体
  cube.scale.y += 0.01
  if (cube.scale.y > 3) cube.scale.y = 0

  // 旋转物体
  cube.rotation.x += 1
  
  renderer.render(scene, camera)

  requestAnimationFrame(render)
}

render()