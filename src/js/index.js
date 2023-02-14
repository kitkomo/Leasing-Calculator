document.addEventListener('DOMContentLoaded', () => {
	validator()
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
	
	const auto = document.querySelector('#auto-price-num')
	const period = document.querySelector('#period-num')
	const inputs = [auto, period]

	inputs.forEach(item => {
		item.addEventListener('change', () => {
			item.parentElement.lastElementChild.style.setProperty('--value', item.value)
		})
	})
}

function validator() {
	const inputs = document.querySelectorAll('.form__input')

	inputs.forEach(item => {
		item.addEventListener('input', (e) => {
			item.value = e.target.value.replace(/\D/g, '')
		})
	})
}

function calculator() {
	//Auto price
	const autoPriceRange = document.querySelector('#auto-price-range')
	const autoPriceNum = document.querySelector('#auto-price-num')

	let autoPrice = autoPriceNum.value

	autoPriceNum.addEventListener('change', () => {
		if (autoPriceNum.value >= 1500000 && autoPriceNum.value <= 10000000) {
			assignValuesNum()
		} else {
			let difference = 10000000 - autoPriceNum.value
			if (difference <= ((10000000 - 1500000) / 2)) {
				autoPriceNum.value = 10000000
				assignValuesNum()
			} else {
				autoPriceNum.value = 1500000
				assignValuesNum()
			}
		}
		
	})

	autoPriceRange.addEventListener('input', () => {
		assignValuesRange()
	})

	//Initioal payment
	const initialPaymentRange = document.querySelector('#initial-payment-range')
	const initialPaymentPercent = document.querySelector('#initial-payment-percent')
	const initialPaymentNum = document.querySelector('#initial-payment-num')

	initialPaymentNum.addEventListener('change', () => {
		const precalculatedPercents = Math.floor((initialPaymentNum.value * 100) / autoPriceNum.value)
		if (precalculatedPercents <= 60 && precalculatedPercents >= 10) {
			assignValuesNum()
		} else {
			let difference = precalculatedPercents - 60
			if (difference >= (precalculatedPercents - 60) / 2) {
				initialPaymentNum.value = Math.floor((autoPriceNum.value * 60) / 100)
				assignValuesNum()
			} else {
				initialPaymentNum.value = Math.floor((autoPriceNum.value * 10) / 100)
				assignValuesNum()
			}
		}
	})

	initialPaymentRange.addEventListener('input', () => {
		assignValuesRange()
	})

	//Period
	const periodRange = document.querySelector('#period-range')
	const periodNum = document.querySelector('#period-num')
	let period = periodNum.value

	periodNum.addEventListener('change', () => {
		if (periodNum.value <= 120 && periodNum.value >= 6) {
			assignValuesNum()
		} else {
			let difference = 120 - periodNum.value
			if (difference <= 0) {
				periodNum.value = 120
				assignValuesNum()
			} else {
				periodNum.value = 6
				assignValuesNum()
			}
		}
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
		if (Math.floor((initialPaymentNum.value * 100) / autoPriceNum.value) < 10 || Math.floor((initialPaymentNum.value * 100) / autoPriceNum.value) > 60) {
			initialPaymentNum.value = Math.floor((autoPriceNum.value * 13) / 100)
			initialPaymentPercent.textContent = Math.floor((initialPaymentNum.value * 100) / autoPriceNum.value) + '%'
		} else {
			initialPaymentPercent.textContent = Math.floor((initialPaymentNum.value * 100) / autoPriceNum.value) + '%'
		}
		initialPaymentRange.value = Number((initialPaymentPercent.textContent).slice(0, -1))
		initialPaymentRange.style.setProperty('--value', initialPaymentRange.value)
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

		const mask = new Intl.NumberFormat('ru', {
			style: 'currency',
			currency: 'rub',
			minimumFractionDigits: 0
		})

		payment.textContent = mask.format(Number(payment.textContent))
		total.textContent = mask.format(Number(total.textContent))
	}
}

