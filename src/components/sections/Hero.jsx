import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import "../../styles/Hero.css";
import myPhoto from "../../assets/myPhoto.jpeg";
import avatarPhoto from "../../assets/avatars/1.avif";
import ContactModal from "../modals/ContactModal";

// ─── Meteor ───────────────────────────────────────────────────────────────────
const TRAIL_LEN = 28;

function SingleMeteor({ initialDelay }) {
  const coreRef = useRef();
  const lineRef = useRef();
  const state = useRef({ active: false, vx: 0, vy: 0 });
  const history = useRef([]);
  const trailGeo = useRef(new THREE.BufferGeometry());
  const trailMat = useRef(
    new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
    }),
  );

  const spawn = useCallback(() => {
    const spd = 2.2 + Math.random() * 1.4;
    Object.assign(state.current, {
      vx: -(spd * 0.72),
      vy: -(spd * 1.05),
      active: true,
    });
    const sx = 4.5 + Math.random() * 2;
    const sy = 1.8 + Math.random() * 2;
    const sz = -0.5 + Math.random();
    history.current = Array.from(
      { length: TRAIL_LEN },
      () => new THREE.Vector3(sx, sy, sz),
    );
    if (coreRef.current) {
      coreRef.current.position.set(sx, sy, sz);
      coreRef.current.visible = true;
    }
    if (lineRef.current) lineRef.current.visible = true;
  }, []);

  useEffect(() => {
    const t = setTimeout(spawn, initialDelay);
    return () => {
      clearTimeout(t);
      trailGeo.current.dispose();
      trailMat.current.dispose();
    };
  }, [spawn, initialDelay]);

  useFrame((_, delta) => {
    const s = state.current;
    if (!s.active || !coreRef.current) return;
    coreRef.current.position.x += s.vx * delta;
    coreRef.current.position.y += s.vy * delta;
    history.current.shift();
    history.current.push(coreRef.current.position.clone());
    const pts = history.current;
    const positions = new Float32Array(pts.length * 3);
    const colors = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      const t = i / (pts.length - 1);
      positions[i * 3] = pts[i].x;
      positions[i * 3 + 1] = pts[i].y;
      positions[i * 3 + 2] = pts[i].z;
      colors[i * 3] = 1;
      colors[i * 3 + 1] = t > 0.5 ? 1 : t * 2 * 0.6 + 0.1;
      colors[i * 3 + 2] = t > 0.7 ? 1 - (t - 0.7) * 3 : t > 0.4 ? 0.2 : 0;
    }
    trailGeo.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    trailGeo.current.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );
    if (coreRef.current.position.y < -3.5 || coreRef.current.position.x < -6) {
      coreRef.current.visible = false;
      if (lineRef.current) lineRef.current.visible = false;
      s.active = false;
      setTimeout(spawn, 2000 + Math.random() * 4000);
    }
  });

  return (
    <>
      <line
        ref={lineRef}
        visible={false}
        geometry={trailGeo.current}
        material={trailMat.current}
      />
      <mesh ref={coreRef} visible={false}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </>
  );
}

function MeteorShower() {
  const delays = useRef(
    Array.from({ length: 6 }, (_, i) => i * 1800 + Math.random() * 1200),
  );
  return (
    <>
      {delays.current.map((delay, i) => (
        <SingleMeteor key={i} initialDelay={delay} />
      ))}
    </>
  );
}

// ─── Starfield ────────────────────────────────────────────────────────────────
function Starfield() {
  const groupRef = useRef();

  useEffect(() => {
    const group = new THREE.Group();
    const bgGeo = new THREE.BufferGeometry();
    const bgPos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 220;
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 110;
      bgPos[i * 3 + 2] = -40 - Math.random() * 60;
    }
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
    group.add(
      new THREE.Points(
        bgGeo,
        new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.022,
          transparent: true,
          opacity: 0.6,
        }),
      ),
    );

    const midGeo = new THREE.BufferGeometry();
    const midCount = 900;
    const midPos = new Float32Array(midCount * 3);
    const midCol = new Float32Array(midCount * 3);
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xcce8ff),
      new THREE.Color(0xfff5cc),
      new THREE.Color(0xffd0ff),
    ];
    for (let i = 0; i < midCount; i++) {
      midPos[i * 3] = (Math.random() - 0.5) * 130;
      midPos[i * 3 + 1] = (Math.random() - 0.5) * 65;
      midPos[i * 3 + 2] = -12 - Math.random() * 28;
      const c = palette[Math.floor(Math.random() * palette.length)];
      midCol[i * 3] = c.r;
      midCol[i * 3 + 1] = c.g;
      midCol[i * 3 + 2] = c.b;
    }
    midGeo.setAttribute("position", new THREE.BufferAttribute(midPos, 3));
    midGeo.setAttribute("color", new THREE.BufferAttribute(midCol, 3));
    group.add(
      new THREE.Points(
        midGeo,
        new THREE.PointsMaterial({
          vertexColors: true,
          size: 0.055,
          transparent: true,
          opacity: 0.85,
        }),
      ),
    );

    groupRef.current = group;
    return () => {
      bgGeo.dispose();
      midGeo.dispose();
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.00006;
  });

  if (!groupRef.current) return null;
  return <primitive object={groupRef.current} />;
}

function TwinklingStars() {
  const groupRef = useRef();
  const starsRef = useRef([]);
  const palette = [0xffffff, 0xcce8ff, 0xfff8dd, 0xffd0ff, 0xaaffee];

  useEffect(() => {
    if (!groupRef.current) return;
    const stars = [];
    for (let i = 0; i < 320; i++) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(3);
      pos[0] = (Math.random() - 0.5) * 70;
      pos[1] = (Math.random() - 0.5) * 35;
      pos[2] = -4 - Math.random() * 18;
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: palette[Math.floor(Math.random() * palette.length)],
        size: 0.045 + Math.random() * 0.07,
        transparent: true,
        opacity: 0.6 + Math.random() * 0.4,
      });
      const star = new THREE.Points(geo, mat);
      star.userData.spd = 0.5 + Math.random() * 2;
      star.userData.offset = Math.random() * Math.PI * 2;
      star.userData.base = mat.opacity;
      groupRef.current.add(star);
      stars.push(star);
    }
    starsRef.current = stars;
    return () => {
      stars.forEach((s) => {
        s.geometry.dispose();
        s.material.dispose();
        groupRef.current?.remove(s);
      });
    };
  }, []);

  useFrame(({ clock }) => {
    starsRef.current.forEach((s) => {
      s.material.opacity =
        s.userData.base *
        (0.35 +
          0.65 *
            Math.abs(
              Math.sin(clock.elapsedTime * s.userData.spd + s.userData.offset),
            ));
    });
  });

  return <group ref={groupRef} />;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const avatarY = useTransform(scrollYProgress, [0, 0.35, 1], [0, -60, 120]);
  const avatarOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9, 1],
    [1, 0.9, 0.3, 0],
  );

  return (
    <section className="hero-wrapper" ref={sectionRef}>
      <div className="hero-card left">
        <div className="top-row">
          <div className="user">
            <img className="avatar" src={myPhoto} alt="Avatar" />
            <div>
              <p className="name">Hey, I'm Ramy IX.</p>
              <p className="role">UI/UX Designer</p>
            </div>
          </div>
          <div className="actions">
            <button className="icon-btn">𝕏</button>
            <button className="icon-btn">▶</button>
            <button className="cta" onClick={() => setIsModalOpen(true)}>
              Get In Touch
            </button>
          </div>
        </div>
        <h1 className="title">
          Obsessed with creating <i>timeless</i> digital experiences.
        </h1>
        <p className="desc">
          Hey, I'm Ramy, welcome to my world. I love building beautiful,
          timeless websites & digital experiences with Framer.
        </p>
      </div>

      <div className="hero-card right" ref={cardRef}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "32px",
            background: "linear-gradient(135deg, var(--card) 0%, #080808 100%)",
          }}
        >
          <Starfield />
          <TwinklingStars />
          <MeteorShower />
        </Canvas>

        <motion.img
          src={avatarPhoto}
          alt="avatar"
          style={{ x: "-50%", y: avatarY, opacity: avatarOpacity }}
          className="avatar-img"
        />
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
