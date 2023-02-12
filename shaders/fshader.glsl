uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(v_uv.x, v_uv.y, 0.0);
  gl_FragColor = vec4(color, 1.0);
}