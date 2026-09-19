import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import styles from "./effects.module.scss";

export const ProgressiveLayerBlur: React.FC<{
  width: number|string,
  height: number|string,
  blurDirection?: string,}>
  = ({ width, height, blurDirection = "to bottom"}) => {
  const validDirectionList = [
    "to top", "to bottom", "to left", "to right",
    "to bottom right", "to bottom left",
    "to top right", "to top left"
  ];
  const getCssVariables = ()=> {
    return {
    '--progressiveBlur-layer-width': typeof width == "number"?`${width}px`:width,
    '--progressiveBlur-layer-height': typeof height == "number"?`${height}px`:height,
    '--progressiveBlur-blur-direction': validDirectionList.includes(blurDirection)?blurDirection:"to bottom",
    } as React.CSSProperties;
  }
  return ( <div className={styles.progressiveLayerBlur} style={getCssVariables()}>
    {Array(5).fill(null).map((_, index) => ( <div key={index} className={styles.blurLayer}/> ))}
  </div> )
}

export const SpawnAnimationWrapper: React.FC<{
  children: React.ReactElement,
  time?: number,
  delay?: number,
  onSpawn?: () => void | null}>
  = ({children, time = .8, delay=0, onSpawn = null}) => {
  const spawnerRef = useRef<HTMLDivElement>(null);
  const getCssVariables = () => {return {'--spawn-animation-wrapper-time': `${time}s`,} as React.CSSProperties}
  useEffect(()=>{
    const spawner = spawnerRef.current;
    if (!spawnerRef || !spawner) return;
    const scrollCheck = () => {
      const bottomTrigger = window.innerHeight*0.9;
      const currentTop = spawner.getBoundingClientRect().top;
      if (currentTop < bottomTrigger) {
        if (onSpawn) onSpawn();
        if (delay !== 0) setTimeout(()=>spawner.classList.add(styles.spawn), delay*1000);
        else spawner.classList.add(styles.spawn);
      }
    }
    scrollCheck(); window.addEventListener("scroll", scrollCheck);
    return () => window.removeEventListener("scroll", scrollCheck);
  },[delay, onSpawn]);
  return ( <div className={styles.spawnAnimationWrapper} ref={spawnerRef} style={getCssVariables()}>
    {children}
  </div> )
}

export const AnimatedNumber: React.FC<{
  to: number,
  from: number,
  duration: number,
  start?: boolean,}>
  = ({to, from, duration, start = true}) => {

    const count = useMotionValue(from);
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(()=>{
      if (!start) return;
      const animation = animate(count, to, {
        duration,
        ease: 'easeOut',
      }); return () => animation.stop();
    }, [to, duration, count, start]);

    return ( <motion.span>{rounded}</motion.span> )

  }
