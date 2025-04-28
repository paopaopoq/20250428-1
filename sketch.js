let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(width * 0.8, height * 0.8); // 設定影像大小為畫布的 80%
  capture.hide(); // 隱藏原始攝影機影像
}

function draw() {
  background(220); // 灰色背景
  let x = (width - capture.width) / 2; // 計算影像的水平中心位置
  let y = (height - capture.height) / 2; // 計算影像的垂直中心位置
  image(capture, x, y, capture.width, capture.height); // 在畫布正中間顯示影像
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布隨視窗大小調整
}
