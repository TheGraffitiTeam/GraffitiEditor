export function convertToCenterOrigin(x1: number, y1: number) {
  // The width and height of the board
  const boardWidth = 300;
  const boardHeight = 300;

  // Calculate the center of the board
  const centerX = boardWidth / 2;
  const centerY = boardHeight / 2;

  // Convert the coordinates
  const x2 = x1 - centerX;
  const y2 = centerY - y1;

  return { x: x2, y: y2 };
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}
