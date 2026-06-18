import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

// Pseudo-random number generator
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// 2D Noise based on Morgan McGuire's
float noise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractional Brownian Motion for the Nebula
float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// Starfield generation
float starfield(vec2 uv, float threshold, float size) {
    vec2 grid = floor(uv * size);
    vec2 local = fract(uv * size) - 0.5;
    float r = hash(grid);
    if (r > threshold) {
        vec2 offset = vec2(hash(grid + 1.0), hash(grid + 2.0)) - 0.5;
        float d = length(local - offset);
        float twinkle = sin(u_time * 3.0 + r * 10.0) * 0.5 + 0.5;
        float star = 0.01 / (d + 0.001);
        return star * twinkle;
    }
    return 0.0;
}

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;

    vec2 st = uv;
    st.x *= aspect;
    vec2 mouse_st = mouse;
    mouse_st.x *= aspect;

    // 1. Nebula-like moving gradient
    vec2 q = vec2(0.0);
    q.x = fbm(uv + 0.00 * u_time);
    q.y = fbm(uv + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
    r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

    float f = fbm(uv + r);

    // Deep space colors
    vec3 color1 = vec3(0.01, 0.02, 0.05); // Dark void
    vec3 color2 = vec3(0.1, 0.02, 0.15);  // Deep Purple
    vec3 color3 = vec3(0.0, 0.1, 0.2);    // Deep Teal

    vec3 nebula = mix(color1, color2, clamp((f * f) * 4.0, 0.0, 1.0));
    nebula = mix(nebula, color3, clamp(length(q), 0.0, 1.0));
    nebula = mix(nebula, vec3(0.2, 0.0, 0.3), clamp(length(r.x), 0.0, 1.0));
    
    vec3 finalColor = nebula * 0.8;

    // 2. Galaxy Particle System (Stars)
    // Layer 1: Distant small stars
    float stars1 = starfield(st + vec2(u_time * 0.01, u_time * 0.005), 0.98, 80.0);
    // Layer 2: Medium stars moving faster (parallax)
    float stars2 = starfield(st - vec2(u_time * 0.02, u_time * 0.01), 0.99, 40.0);
    
    finalColor += stars1 * vec3(0.8, 0.9, 1.0) * 0.5;
    finalColor += stars2 * vec3(1.0, 0.8, 0.9) * 0.8;

    // 3. Neon Interactive Cursor
    float dist = length(st - mouse_st);
    
    // Core glow (intense cyan/white)
    float core = 0.005 / (dist + 0.001);
    
    // Outer halo (neon purple/blue)
    float halo = 0.03 / (dist + 0.05);

    vec3 cursorGlow = core * vec3(0.8, 1.0, 1.0) + halo * vec3(0.4, 0.0, 1.0);
    finalColor += cursorGlow * 0.7;

    gl_FragColor = vec4(finalColor, 1.0);
}`;

function createShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function ShaderBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };

    function onMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouseRef.current.x = nx * canvas.width;
        mouseRef.current.y = ny * canvas.height;
      }
    }
    window.addEventListener('mousemove', onMouseMove);

    function render(t) {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    }
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="shader-bg"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
