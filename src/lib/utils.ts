export function drawLine(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string = "black",
  thickness: number = 1
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness ;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

// Intersect
type Line = [Vector3, Vector3];

// Function to find the orientation of the ordered triplet (p, q, r).
function orientation(p: Vector3, q: Vector3, r: Vector3): number {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0; // collinear
  return val > 0 ? 1 : 2; // clockwise or counterclockwise
}

// Function to check if point q lies on segment pr
function onSegment(p: Vector3, q: Vector3, r: Vector3): boolean {
  return (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  );
}

// Function to check if two lines intersect
export function doIntersect(line1: Line, line2: Line): boolean {
  const [p1, q1] = line1;
  const [p2, q2] = line2;

  // Find the four orientations needed for general and special cases
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  // General case
  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  // Special cases
  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;

  // Doesn't fall in any of the above cases
  return false;
}
