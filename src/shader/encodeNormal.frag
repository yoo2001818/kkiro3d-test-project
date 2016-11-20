#version 100
precision lowp float;

varying vec3 vNormal;

void main(void) {
  gl_FragColor = vec4(vNormal * 0.5 + 0.5, 1.0);
}
