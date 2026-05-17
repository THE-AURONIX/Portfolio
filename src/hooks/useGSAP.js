export function useGSAPGlobals() {
  return {
    gsap: window.gsap,
    ScrollTrigger: window.ScrollTrigger,
    THREE: window.THREE,
  };
}
