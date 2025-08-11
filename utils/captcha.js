const { createCanvas } = require("canvas");

/**
 * 生成加减法验证码图片
 * @returns {Object} { equation: "3+5=?", answer: 8, dataUrl: "base64..." }
 */
function generateMathCaptcha() {
  // 1. 随机生成加减法题目
  const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
  const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
  const operators = ["+", "-"];
  const operator = operatorszhe[Math.floor(Math.random() * 2)]; // 随机选 + 或 -

  // 2. 计算正确答案
  let answer;
  if (operator === "+") {
    answer = num1 + num2;
  } else {
    answer = num1 - num2;
  }

  // 3. 生成题目字符串（如 "3+5=?"）
  const equation = `${num1}${operator}${num2}=?`;

  // 4. 创建 Canvas 画布并绘制验证码
  const canvas = createCanvas(150, 50);
  const ctx = canvas.getContext("2d");

  // 背景色
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 文字样式
  ctx.font = "24px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 绘制题目
  ctx.fillText(equation, canvas.width / 2, canvas.height / 2);

  // 5. 返回 Base64 图片 + 答案
  return {
    equation,
    answer,
    dataUrl: canvas.toDataURL(), // 图片 base64
  };
}

module.exports = { generateMathCaptcha };
