#version 100

attribute vec2 aPosition;

uniform vec2 uResolution;
uniform float uCrossSize;

void main(void) {
  gl_Position = vec4(aPosition.xy, -1.0, 1.0);
  gl_PointSize = uCrossSize;
}
