import gsap from "gsap";

export function animation() {
	const field = document.querySelector('.form__field-wrapper')
	const tl = gsap.timeline()

	tl
		.to(document.body, {opacity: 1})
		.from(field, {opacity: 0, y: 5, duration: 0.4, delay: 1})
		.from(field.nextElementSibling, {opacity: 0, y: 5, duration: 0.4})
		.from(field.nextElementSibling.nextElementSibling, {opacity: 0, y: 5, duration: 0.4})
		.from('.form__field-calculated', {opacity: 0, duration: 1})
		.from('.title', {opacity: 0, x: -50, duration: 1})
		.from('.form__submit', {opacity: 0, x: 50, duration: 1}, '-=1')
}