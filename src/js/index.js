import Inputmask from "inputmask";

document.addEventListener('DOMContentLoaded', () => {
  validator()
  customRangeInput()
  calculator()
	sendForm()
})

function validator() {
  const inputs = document.querySelectorAll('.form__input')

  inputs.forEach((item) => {
    item.addEventListener('input', (e) => {
      item.value = e.target.value.replace(/\D/g, '')
    })
		item.value = formatValues(item.value)
  })
}

function customRangeInput() {
  for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value)
    e.style.setProperty('--min', e.min == '' ? '0' : e.min)
    e.style.setProperty('--max', e.max == '' ? '100' : e.max)
    e.addEventListener('input', () => e.style.setProperty('--value', e.value))
  }

  const auto = document.querySelector('#auto-price-num')
  const period = document.querySelector('#period-num')
  const inputs = [auto, period]

  inputs.forEach((item) => {
    item.addEventListener('change', () => {
      item.parentElement.lastElementChild.style.setProperty('--value', item.value)
    })
  })
}

function formatValues(value) {
	return Inputmask.format(value, { alias: "numeric", groupSeparator: ' '})
}
function unformatValues(value) {
	return Inputmask.unmask(value, { alias: "numeric", groupSeparator: ' '})
}

function calculator() {
  const autoPriceRange = document.querySelector('#auto-price-range')
  const autoPriceNum = document.querySelector('#auto-price-num')

  const initialPaymentRange = document.querySelector('#initial-payment-range')
  const initialPaymentPercent = document.querySelector('#initial-payment-percent')
  const initialPaymentNum = document.querySelector('#initial-payment-num')

  const periodRange = document.querySelector('#period-range')
  const periodNum = document.querySelector('#period-num')

  const total = document.querySelector('#total')
  const payment = document.querySelector('#monthly-payment')

  const mask = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'rub',
    minimumFractionDigits: 0,
  })

	const inputmask = new Inputmask('currency', {
		inputtype: "text",
		allowMinus: false,
		groupSeparator: ' ',
		rightAlign: false,
		digitsOptional: false,
		digits: '0',
	})

  //listening auto
  autoPriceNum.addEventListener('change', () => {
    valueValid(1500000, 10000000, autoPriceNum)
    assignValuesNum()
  })
  autoPriceRange.addEventListener('input', () => {
    assignValuesRange()
  })

  //listening period
  periodNum.addEventListener('change', () => {
    valueValid(6, 120, periodNum)
    assignValuesNum()
  })
  periodRange.addEventListener('input', () => {
    assignValuesRange()
  })

  //listening initial payment
  initialPaymentNum.addEventListener('change', () => {
    const preCalcPercents = calcPaymentPercent()
    if (preCalcPercents < 10 || preCalcPercents > 60) {
      let difference = preCalcPercents - 60
      if (difference >= (preCalcPercents - 60) / 2) {
        initialPaymentNum.value = formatValues(calcInitialPayment(60))
      } else {
        initialPaymentNum.value = formatValues(calcInitialPayment(10))
      }
    }
    assignValuesNum()
  })
  initialPaymentRange.addEventListener('input', () => {
    assignValuesRange()
  })

  //Assigment funcs
  function assignValuesNum() {
    const autoPrice = autoPriceNum.value
		const autoPriceFormated = formatValues(autoPrice)
    autoPriceNum.value = autoPriceFormated
    autoPriceRange.value = unformatValues(autoPrice)
    ///
    const period = periodNum.value
    periodNum.value = period
    periodRange.value = period
    ///
    if (calcPaymentPercent() < 10 || calcPaymentPercent() > 60) {
      initialPaymentNum.value = formatValues(calcInitialPayment(13))
      initialPaymentPercent.textContent = calcPaymentPercent() + '%'
    } else {
      initialPaymentPercent.textContent = calcPaymentPercent() + '%'
			initialPaymentNum.value = formatValues(initialPaymentNum.value)
    }

    initialPaymentRange.value = Number(initialPaymentPercent.textContent.slice(0, -1))
    initialPaymentRange.style.setProperty('--value', initialPaymentRange.value) //for range slider to work

    totalValues()
  }

  function assignValuesRange() {
    const autoPrice = autoPriceRange.value
		const autoPriceFormated = formatValues(autoPrice)
    autoPriceNum.value = autoPriceFormated
    autoPriceRange.value = autoPrice
    ///
    const period = periodRange.value
    periodNum.value = period
    periodRange.value = period
    ///
    initialPaymentPercent.textContent = initialPaymentRange.value + '%'
    initialPaymentNum.value = formatValues(Math.floor((autoPriceRange.value * initialPaymentRange.value) / 100))

    totalValues()
  }

  const totalValues = () => {
    payment.textContent = calcMontlyPayment()
    total.textContent = calcTotalPayment()

    payment.textContent = mask.format(Number(payment.textContent))
    total.textContent = mask.format(Number(total.textContent))
  }

  function valueValid(min, max, input) {
    if (input.value < min || input.value > max) {
      const difference = max - input.value
      if (difference <= (max - min) / 2) {
        input.value = max
      } else {
        input.value = min
      }
    }
  }

	function calcMontlyPayment() {
    return Math.floor(
      (autoPriceRange.value - unformatValues(initialPaymentNum.value)) * ((0.05 * Math.pow(1 + 0.05, periodNum.value)) / (Math.pow(1 + 0.05, periodNum.value) - 1)),
    )
  }

  function calcTotalPayment() {
    return Math.floor(periodNum.value * Number(payment.textContent) + Number(unformatValues(initialPaymentNum.value)))
  }

  function calcPaymentPercent(percents = 100) {
    return Math.floor((unformatValues(initialPaymentNum.value) * percents) / autoPriceRange.value)
  }

  function calcInitialPayment(percents) {
    return Math.floor((autoPriceRange.value * percents) / 100)
  }
}

function sendForm() {
	const form = document.querySelector('#form')

	const total = document.querySelector('#total')
  const payment = document.querySelector('#monthly-payment')

	form.addEventListener('submit', (e) => {
		e.preventDefault()
		
		const data = {
			autoPrice: form.elements.autoPrice.value,
			initialPayment: form.elements.initialPayment.value,
			period: form.elements.period.value,
			total: total.textContent.slice(0, -2),
			payment: payment.textContent.slice(0, -2)
		}

		alert(JSON.stringify(data))
	})
}