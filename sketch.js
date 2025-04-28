let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(width * 0.8, height * 0.8); // 設定影像大小為畫布的 80%
  capture.hide(); // 隱藏原始攝影機影像

  // 確保 overlayGraphics 的大小與 capture 一致
  overlayGraphics = createGraphics(capture.width, capture.height);
}

function draw() {
  background(220); // 灰色背景
  let x = (width - capture.width) / 2; // 計算影像的水平中心位置
  let y = (height - capture.height) / 2; // 計算影像的垂直中心位置

  // 更新 overlayGraphics
  overlayGraphics.background(0); // 設定背景為黑色
  for (let i = 0; i < overlayGraphics.width; i += 20) {
    for (let j = 0; j < overlayGraphics.height; j += 20) {
      let col = capture.get(i, j); // 從 capture 取得顏色
      overlayGraphics.fill(col); // 設定圓的顏色
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(i + 10, j + 10, 15, 15); // 繪製圓，中心點偏移 10

      // 計算方框顏色，隨時間變化
      let blueShade = map(sin(frameCount * 0.05 + i * 0.1 + j * 0.1), -1, 1, 100, 255);
      overlayGraphics.stroke(0, 0, blueShade); // 設定方框的藍色漸層
      overlayGraphics.noFill();
      overlayGraphics.rect(i, j, 20, 20); // 繪製方框，大小與單位一致
    }
  }

  // 翻轉影像以修正顛倒問題
  push(); // 儲存當前繪圖狀態
  translate(x + capture.width, y); // 移動畫布原點到影像位置
  scale(-1, 1); // 水平翻轉影像
  image(capture, 0, 0, capture.width, capture.height); // 繪製影像
  pop(); // 恢復繪圖狀態

  // 繪製 overlayGraphics 在攝影機影像上方
  image(overlayGraphics, x, y, capture.width, capture.height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布隨視窗大小調整
}
