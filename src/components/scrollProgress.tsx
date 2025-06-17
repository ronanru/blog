import { Component, createSignal, onCleanup, onMount } from "solid-js";

const ScrollProgress: Component = () => {
  const [scrollProgress, setScrollProgress] = createSignal(0);

  const updateScrollProgress = () => {
    setScrollProgress(
      (document.documentElement.scrollTop /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
        document.documentElement.clientWidth,
    );
  };

  onMount(updateScrollProgress);

  window.addEventListener("scroll", updateScrollProgress);
  window.addEventListener("resize", updateScrollProgress);

  onCleanup(() => {
    window.removeEventListener("scroll", updateScrollProgress);
    window.removeEventListener("resize", updateScrollProgress);
  });

  return (
    <div
      class="fixed top-0 left-0 h-1 bg-green-600"
      style={{ width: `${scrollProgress()}px` }}
    />
  );
};

export default ScrollProgress;
