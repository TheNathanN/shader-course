varying vec3 v_position;

void main() {
  vec3 color = vec3(0.0);
  color.r = clamp(v_position.x, 0.0, 1.0);
  color.g = clamp(v_position.y, 0.0, 1.0);
  gl_FragColor = vec4(color, 1.0);
}