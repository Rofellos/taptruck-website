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
      (window as any).fbq('track', 'ViewContent', {
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
<section class="booking-shell">
  <!-- New Title/Intro section -->
	<div class="booking-intro">
		<p class="eyebrow">BOOK</p>
		<h1>Book the Tap Truck</h1>
		<p>
			Tell us about your event and we'll get back to you with availability, details, and a quote.
		</p>
	</div>

  <!-- New Form Section -->
	<div class="form-card">
		<iframe
			src="https://hello.dubsado.com/public/form/view/69dab8599829afc4adbe609c?iframe=true"
			title="Tap Truck Inquiry Form"
			frameborder="0"
			style="width: 100%; border: 0; min-height: 800px;"
		></iframe>
	</div>
</section>

