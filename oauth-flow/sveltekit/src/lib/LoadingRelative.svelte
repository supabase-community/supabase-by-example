<script>
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const width = tweened(0, {
		duration: 1e3,
		easing: cubicOut
	});

	async function animate() {
		// inch along until 90% complete
		// ~> wait for loading=false signal
		let jump = (Math.random() * 20 + 4) | 0;
		width.update((val) => Math.min(90, val + jump));
	}

	onMount(() => {
		const interval = setInterval(animate, 750);
		return () => clearInterval(interval);
	});
</script>

<div class="top-0 left-0 z-10 block w-full h-full bg-transparent">
	<span class="relative block w-full h-full mx-auto my-0 text-center text-green-500 opacity-75">
		<span class="block w-0 h-1 bg-red-500" style="width: {$width}%" />
	</span>
</div>
