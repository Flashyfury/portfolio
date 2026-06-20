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

// Starfield generation with brightness/flare controls
float starfield(vec2 uv, float threshold, float size, float brightness, bool hasFlare) {
    vec2 grid = floor(uv * size);
    vec2 local = fract(uv * size) - 0.5;
    float r = hash(grid);
    if (r > threshold) {
        vec2 offset = vec2(hash(grid + 1.0), hash(grid + 2.0)) - 0.5;
        vec2 localOffset = local - offset;
        float d = length(localOffset);
        float twinkle = sin(u_time * (2.0 + r * 3.0) + r * 20.0) * 0.4 + 0.6;
        
        // Multi-tier star intensity: sharp center and soft glow
        float star = brightness * (0.003 / (d + 0.0005) + 0.008 / (d + 0.015));
        
        // Lens-flare cross pattern for bright foreground stars
        if (hasFlare) {
            float flareH = smoothstep(0.003, 0.0, abs(localOffset.y)) * smoothstep(0.18, 0.0, abs(localOffset.x));
            float flareV = smoothstep(0.003, 0.0, abs(localOffset.x)) * smoothstep(0.18, 0.0, abs(localOffset.y));
            star += (flareH + flareV) * 0.3 * brightness;
        }
        
        return star * twinkle;
    }
    return 0.0;
}

// Spiral galaxy generator
vec3 spiralGalaxy(vec2 uv, vec2 center, float radius, float speed, float armTightness, float armsCount, vec3 coreColor, vec3 armColor) {
    vec2 p = uv - center;
    float r = length(p);
    if (r > radius) return vec3(0.0);
    
    float angle = atan(p.y, p.x);
    
    // Spiral swirl pattern (pow on r curls the arms nicely near the core)
    float swirl = angle * armsCount - pow(r, 0.45) * armTightness + u_time * speed;
    float spiral = cos(swirl);
    
    // Smooth the spiral arm intensity
    float armGlow = smoothstep(0.1, 0.9, spiral);
    
    // Radial falloff: fade out at the edges
    float falloff = smoothstep(radius, 0.0, r);
    
    // Add organic noise texture along the arms
    float n = noise(p * 18.0 - u_time * 0.1) * 0.35 + 0.65;
    
    // Galactic center core (bright white-hot center)
    float core = 0.016 / (r + 0.004);
    
    // Outer arm dust glow
    float arms = armGlow * (0.8 / (r + 0.08)) * 0.15;
    
    // Combine core, arms, and some ambient galaxy dust glow
    vec3 col = (core * coreColor * 1.8 + arms * armColor * n + vec3(0.04) * n) * falloff;
    
    return col;
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
    
    vec3 finalColor = nebula * 0.75;

    // 2. Galaxies (Swirling Spiral Galaxies)
    // Galaxy 1: Large purplish-magenta galaxy in the top-right / background area
    vec3 galaxy1 = spiralGalaxy(st, vec2(aspect * 0.75, 0.65), 0.55, 0.12, 12.0, 2.0, vec3(1.0, 0.9, 0.75), vec3(0.85, 0.2, 1.0));
    // Galaxy 2: Smaller cyan-blue galaxy in the lower-left / background area
    vec3 galaxy2 = spiralGalaxy(st, vec2(aspect * 0.25, 0.30), 0.38, -0.08, 15.0, 3.0, vec3(0.75, 0.92, 1.0), vec3(0.1, 0.75, 0.9));
    
    finalColor += galaxy1 * 1.4;
    finalColor += galaxy2 * 1.1;

    // 3. Galaxy Particle System (Stars)
    // Layer 1: Dense, tiny, distant background stars (no flare, high threshold)
    float stars1 = starfield(st + vec2(u_time * 0.005, u_time * 0.002), 0.92, 120.0, 0.8, false);
    // Layer 2: Medium stars with parallax (no flare, medium threshold)
    float stars2 = starfield(st - vec2(u_time * 0.010, u_time * 0.005), 0.95, 60.0, 1.3, false);
    // Layer 3: Rare, bright, nearby stars with beautiful glare flares
    float stars3 = starfield(st + vec2(u_time * 0.002, -u_time * 0.001), 0.990, 25.0, 2.2, true);
    
    finalColor += stars1 * vec3(0.85, 0.92, 1.0);
    finalColor += stars2 * vec3(1.0, 0.92, 0.98);
    finalColor += stars3 * vec3(0.9, 0.98, 1.0);

    // 4. Neon Interactive Cursor
    float dist = length(st - mouse_st);
    
    // Core glow (intense cyan/white)
    float core = 0.004 / (dist + 0.001);
    
    // Outer halo (neon purple/blue)
    float halo = 0.025 / (dist + 0.06);

    vec3 cursorGlow = core * vec3(0.8, 1.0, 1.0) + halo * vec3(0.4, 0.0, 1.0);
    finalColor += cursorGlow * 0.55;

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
