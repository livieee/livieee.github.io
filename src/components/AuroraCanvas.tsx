import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

// Pearlescent iridescent aurora — cream / blush / lavender / orchid / champagne
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.045;

  // drifting domain warp — silk-like flow
  vec2 q = vec2(fbm(p * 1.4 + vec2(t, -t * 0.6)),
                fbm(p * 1.4 + vec2(-t * 0.7, t * 0.5) + 3.7));
  vec2 r = vec2(fbm(p * 1.2 + 2.6 * q + vec2(1.7, 9.2) + t * 0.35),
                fbm(p * 1.2 + 2.6 * q + vec2(8.3, 2.8) - t * 0.28));
  float f = fbm(p * 1.5 + 2.2 * r);

  // pearlescent palette
  vec3 cream     = vec3(0.988, 0.976, 0.957);
  vec3 blush     = vec3(0.957, 0.847, 0.878);
  vec3 lavender  = vec3(0.898, 0.855, 0.953);
  vec3 orchid    = vec3(0.780, 0.667, 0.855);
  vec3 champagne = vec3(0.945, 0.902, 0.815);

  vec3 col = cream;
  col = mix(col, blush,     smoothstep(0.30, 0.62, f));
  col = mix(col, lavender,  smoothstep(0.45, 0.78, q.y));
  col = mix(col, orchid * 0.92 + cream * 0.08, smoothstep(0.55, 0.92, r.x) * 0.55);
  col = mix(col, champagne, smoothstep(0.62, 0.95, r.y) * 0.45);

  // soft sheen bands
  float sheen = sin((uv.x + uv.y) * 6.0 + f * 8.0 + u_time * 0.25) * 0.5 + 0.5;
  col += vec3(1.0, 0.99, 0.98) * sheen * 0.05;

  // gentle vignette to keep center luminous
  float d = distance(uv, vec2(0.5, 0.45));
  col = mix(col, cream, smoothstep(0.55, 0.95, d) * 0.6);

  gl_FragColor = vec4(col, 1.0);
}
`

export function AuroraCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const start = performance.now()
    const frame = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }

    if (reduce) {
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, 12.0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduce])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
