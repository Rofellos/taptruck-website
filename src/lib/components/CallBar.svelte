<script lang="ts">
	import { trackEvent } from '$lib/utils/analytics';
</script>

<a
	href="tel:14373500049"
    on:click={(e) => {
	e.preventDefault();

	trackEvent('call_click', {
		event_category: 'engagement',
		event_label: 'floating_call_button'
	});
	setTimeout(() => {
		window.location.href = 'tel:14373500049';
	}, 150);
    }}
    
	class="
		fixed bottom-4 right-4
		inline-flex items-center gap-2 rounded-full
		bg-[rgb(var(--brand-primary-dark))]/95
		px-4 md:px-6 py-3 text-sm font-semibold text-white
		shadow-2xl backdrop-blur-md transition
		hover:bg-[rgb(var(--brand-accent))]
		sm:left-auto sm:right-6 sm:translate-x-0 sm:gap-3 sm:px-5
	"
	aria-label="Call Tap Truck VI to book now"

    
>
	<!-- Icon -->
	<span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
		📞
	</span>

	<!-- Text -->
	<div class="flex flex-col leading-tight md:pl-2">
		<span class="text-xs text-white/70">Call to book</span>
		<span class="text-sm font-semibold tracking-tight">
			437-350-0049
		</span>
	</div>
</a>
