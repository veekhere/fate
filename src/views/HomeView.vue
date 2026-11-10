<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="brand-signal">Fate</p>
      <h1 class="headline">{{ t.home.headline }}</h1>
      <p class="lede">{{ t.home.lede }}</p>
    </div>

    <div class="hero-visual" aria-hidden="true">
      <div class="plane"><div class="plane-card" /></div>
      <div class="orbit" />
      <div class="shard shard-a" />
      <div class="shard shard-b" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: center;
  min-height: calc(100svh - 6.5rem);
  padding-bottom: 3rem;
}

.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 34rem;
  animation: rise 0.8s var(--ease) both;
}

.brand-signal {
  margin: 0 0 1rem;
  font-family: var(--display);
  font-size: clamp(2.8rem, 7vw, 4.6rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.95;
  color: var(--ink);
}

.headline {
  margin: 0 0 1rem;
  font-family: var(--display);
  font-size: clamp(1.55rem, 3.2vw, 2.15rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.15;
  color: var(--ink);
}

.lede {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.55;
  color: var(--muted);
  max-width: 28rem;
}

.hero-visual {
  position: relative;
  min-height: 22rem;
  animation: fade-slide 1s 0.15s var(--ease) both;
}

.plane {
  position: absolute;
  inset: 8% 4% 8% 12%;
  animation: float 7s ease-in-out infinite;
}

.plane-card {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--accent) 55%, #ffc2a1), transparent 55%),
    linear-gradient(320deg, #2c211c 0%, #c4532a 48%, #f0b089 100%);
  box-shadow: var(--shadow-float);
  transition: box-shadow 0.25s var(--ease);
}

.orbit {
  position: absolute;
  width: 72%;
  aspect-ratio: 1;
  left: 8%;
  top: 10%;
  border: 1px solid color-mix(in srgb, var(--glass) 55%, transparent);
  border-radius: 50%;
  animation: spin 18s linear infinite;
}

.orbit::after {
  content: '';
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  background: var(--glass);
  border-radius: 50%;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
}

.shard {
  position: absolute;
  border-radius: 10px;
  backdrop-filter: blur(6px);
  background: color-mix(in srgb, var(--glass) 55%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass) 40%, transparent);
}

.shard-a {
  width: 28%;
  height: 18%;
  right: 6%;
  top: 18%;
  animation: float 5.5s 0.4s ease-in-out infinite;
}

.shard-b {
  width: 34%;
  height: 14%;
  left: 2%;
  bottom: 16%;
  animation: float 6.5s 0.8s ease-in-out infinite reverse;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-slide {
  from {
    opacity: 0;
    transform: translateX(18px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 1rem 0 2.5rem;
    gap: 1.5rem;
  }

  .hero-visual {
    min-height: 16rem;
    order: -1;
  }

  .plane {
    inset: 0 8%;
  }
}
</style>
