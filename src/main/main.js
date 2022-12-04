import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"
import * as dat from "dat.gui"

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
)

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
// cube.position.x = 5
// 缩放物体
// cube.scale.set(3, 2, 1)
// 旋转物体
// cube.rotation.set(Math.PI / 4, 0, 0)

// dat.gui
const gui = new dat.GUI()
// 设置物体位置
gui.add(cube.position, "y").min(0).max(5).step(0.01).name("设置y轴").onChange((value) => {
  console.log("value改变：", value)
}).onFinishChange((value) => {
  console.log("value完全改变：", value)
})
// 设置物体颜色
const params = {
  color: "#ff0000",
  fn: () => {
    console.log(animate1)
    animate1.pause()
  }
}
gui.addColor(params, "color").onChange((value) => {
  console.log("物体颜色被改变：", value)
  cube.material.color.set(value)
})
// 添加文件夹
const folder = gui.addFolder("其他")
// 自动展开
folder.closed = false
console.log(folder)
// 设置物体显隐
folder.add(cube, "visible")
// 触发事件
folder.add(params, 'fn')

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// 添加到文档中
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 启用阻尼（惯性）,需要在动画中调用 update()
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// Clock
// const clock = new THREE.Clock()

// gsap 使用
const animate1 = gsap.to(cube.position, {
  x: 5,
  // 设置延迟时间
  delay: 1,
  // 设置往返
  yoyo: true,
  // 重复多少次 -1 表示无限循环
  repeat: -1,
  // 开始回调
  onStart: () => {
    console.log("开始")
  },
  // 结束回调
  onComplete: () => {
    console.log("结束")
  },
  ease: "power1.inOut",
  duration: 3,
})

// 通过事件控制
window.addEventListener('dblclick', function () {
  // console.log("animate1: ", animate1)
  // if (animate1.isActive()) {
  //   animate1.pause()
  // } else {
  //   animate1.resume()
  // }

  // 双击全屏控制
  const fullScreenElement = document.fullscreenElement
  if (fullScreenElement) {
    document.exitFullscreen()
  } else {
    renderer.domElement.requestFullscreen()
  }
})

gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 3 })

function render() {
  // 调用阻尼update()
  controls.update()

  // 移动物体
  // cube.position.x += 0.01
  // if (cube.position.x > 5) cube.position.x = 0
  // const t = time / 1000 % 5
  // cube.position.x = t * 1
  // 使用Clock记录时间
  // const time = clock.getElapsedTime()
  // const t = time % 5
  // cube.position.x = t * 1

  // 缩放物体
  // cube.scale.y += 0.01
  // if (cube.scale.y > 3) cube.scale.y = 0

  // // 旋转物体
  // cube.rotation.x += 1

  renderer.render(scene, camera)

  requestAnimationFrame(render)
}

render()


// 屏幕自适应
window.addEventListener('resize', () => {
  console.log("屏幕尺寸发生变化")
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})