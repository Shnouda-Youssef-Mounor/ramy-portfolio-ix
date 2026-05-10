import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function HumanAvatar() {
  const { scene } = useGLTF("/models/source/model.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;

      const mat = child.material;

      if (!mat) return;

      // clone material عشان الأمان
      child.material = mat.clone();

      const newMat = child.material;

      // =========================
      // 🧠 أهم خطوة: احترام الـ texture
      // =========================
      if (newMat.map) {
        newMat.map.colorSpace = THREE.SRGBColorSpace;
        newMat.map.needsUpdate = true;
      }

      // تحسين الشكل بدون تدمير الـ texture
      newMat.roughness = 0.9;
      newMat.metalness = 0.0;

      // ❌ ممنوع overwrite للـ color مع وجود texture
      // newMat.color.set(...) ← متستخدمهاش هنا

      newMat.needsUpdate = true;
    });
  }, [scene]);

  return <primitive object={scene} scale={2.3} position={[0, -1, 0]} />;
}

export default HumanAvatar;
