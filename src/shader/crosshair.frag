#version 100

uniform lowp vec3 uCross;

uniform lowp float uCrossWidth;
uniform lowp float uCrossStart;

void main() {
  lowp vec2 center = (gl_PointCoord - vec2(0.5, 0.5)) * 2.0;
  lowp float dist = length(center);
  bool doOut = false;
  if (dist > uCrossStart &&
    (abs(center.x) <= uCrossWidth || abs(center.y) <= uCrossWidth)
  ) {
    gl_FragColor = vec4(uCross, 1.0);
    doOut = true;
  }
  if (!doOut) discard;
}
