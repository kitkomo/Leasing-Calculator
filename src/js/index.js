document.addEventListener('DOMContentLoaded', () => {
	customRangeInput()
	calculator()
})

function customRangeInput() {
	for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
		e.style.setProperty('--value', e.value);
		e.style.setProperty('--min', e.min == '' ? '0' : e.min);
		e.style.setProperty('--max', e.max == '' ? '100' : e.max);
		e.addEventListener('input', () => e.style.setProperty('--value', e.value));
	}
}

function calculator() {

	//Auto price
	const autoPriceRange = document.querySelector('#auto-price-range')
	const autoPriceNum = document.querySelector('#auto-price-num')

	let autoPrice = autoPriceNum.value

	autoPriceNum.addEventListener('input', () => {
		assignValuesNum()
	})

	autoPriceRange.addEventListener('input', () => {
		assignValuesRange()
	})

	//Initioal payment
	const initialPaymentRange = document.querySelector('#initial-payment-range')
	const initialPaymentPercent = document.querySelector('#initial-payment-percent')
	const initialPaymentNum = document.querySelector('#initial-payment-num')

	initialPaymentRange.addEventListener('input', () => {
		assignValuesRange()
	})

	initialPaymentNum.addEventListener('input', () => {
		assignValuesNum()
	})

	//Period
	const periodRange = document.querySelector('#period-range')
	const periodNum = document.querySelector('#period-num')

	let period = periodNum.value

	periodNum.addEventListener('input', () => {
		assignValuesNum()
	})

	periodRange.addEventListener('input', () => {
		assignValuesRange()
	})

	//Assigment funcs

	function assignValuesNum() {
		autoPrice = autoPriceNum.value
		autoPriceNum.value = autoPrice
		autoPriceRange.value = autoPrice

		///

		period = periodNum.value
		periodNum.value = period
		periodRange.value = period

		///

		initialPaymentPercent.textContent = Math.floor((initialPaymentNum.value * 100) / autoPriceNum.value)
		initialPaymentRange.value = initialPaymentPercent.value

		totalValues()
	}

	function assignValuesRange() {
		autoPrice = autoPriceRange.value
		autoPriceNum.value = autoPrice
		autoPriceRange.value = autoPrice

		///

		period = periodRange.value
		periodNum.value = period
		periodRange.value = period

		///

		initialPaymentPercent.textContent = initialPaymentRange.value + '%'
		initialPaymentNum.value = Math.floor((autoPriceNum.value * initialPaymentRange.value) / 100)

		totalValues()
	}

	const totalValues = () => {
		const total = document.querySelector('#total')
		const payment = document.querySelector('#monthly-payment')

		payment.textContent = Math.floor((autoPriceNum.value - initialPaymentNum.value) * (0.05 * Math.pow((1 + 0.05), periodNum.value) / (Math.pow((1 + 0.05), periodNum.value) - 1)))

		total.textContent = Math.floor((periodNum.value * Number(payment.textContent) + Number(initialPaymentNum.value)))
	}
}

