import IMask from "imask"

export default function validator() {
	const inputs = document.querySelectorAll('.form__input')

	inputs.forEach(item => {
		const numberMask = IMask(item, {
			mask: Number,
			signed: false,
			thousandsSeparator: ' '
		});
	})
}