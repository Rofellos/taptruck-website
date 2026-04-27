<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import Turnstile from '$lib/components/Turnstile.svelte';
  import { trackEvent } from '$lib/utils/analytics';


  onMount(() => {
    if (browser && (window as any).fbq) {
      (window as any).fbq('track', 'ViewForm', {
        content_name: 'Booking Page'
      });
    }

    const script = document.createElement('script');
		script.src =
			'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.min.js';
		script.async = true;

		script.onload = () => {
			setTimeout(() => {
				if ((window as any).iFrameResize) {
					(window as any).iFrameResize({ checkOrigin: false });
				}
			}, 30);
		};

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
  });

  let turnstileToken = '';

  // TRACK SUCCESS ONLY ONCE PER SUCCESSFUL SUBMISSION
	let bookingTracked = false;

	$: if (browser && $page.form?.success && !bookingTracked) {
		// GOOGLE ANALYTICS
    trackEvent('booking_inquiry_submit', {
			event_category: 'engagement',
			event_label: 'book_page'
		});

		if ($page.form?.newsletterOptIn) {
			trackEvent('newsletter_signup', {
				event_category: 'engagement',
				event_label: 'booking_form_opt_in'
			});
		}

    // META PIXEL 
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Booking Form'
      });
    }
		bookingTracked = true;
	}

  // RESET GUARD WHEN FORM IS NO LONGER IN SUCCESS STATE
	$: if (!$page.form?.success) {
		bookingTracked = false;
	}
</script>

<!-- New Booking Section -->
<section class="bg-bg text-fg">
  <!-- New Title/Intro section -->
	<div class="mx-auto max-w-7xl px-4 pt-36 pb-20">
		<div class="mx-auto max-w-3xl pb-20 text-center">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">Book</p>
			<h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Book the Tap Truck</h1>
			<p class="mt-6 text-base leading-7 text-fg/75 sm:text-lg">
				Tell us about your event and we'll get back to you with availability, details, and a quote.
			</p>
		</div>
		 <!-- New Form Section -->
		<div class="form-card">
			<iframe 
				title="Inquiry Form"
				src="https://hello.dubsado.com/public/form/view/69dab8599829afc4adbe609c?iframe=true" 
				frameBorder="0"
				style="width: 100%; border: 0; min-height: 800px;" 
			></iframe>
		</div>
	</div>
</section>

