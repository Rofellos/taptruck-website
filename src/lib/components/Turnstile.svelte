<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let siteKey: string;
  export let token: string = '';

  let el: HTMLDivElement;
  let widgetId: string | number | null = null;

  async function waitForTurnstile() {
    for (let i = 0; i < 50; i++) {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.turnstile) return;
      await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error('Turnstile script not loaded');
  }

  onMount(async () => {
    token = '';
    await waitForTurnstile();

    // @ts-ignore
    widgetId = window.turnstile.render(el, {
      sitekey: siteKey,
      callback: (t: string) => (token = t),
      'expired-callback': () => (token = ''),
      'error-callback': () => (token = '')
    });
  });

  onDestroy(() => {
    if (widgetId != null) {
      // @ts-ignore
      window.turnstile.remove(widgetId);
    }
  });
</script>

<div bind:this={el}></div>
