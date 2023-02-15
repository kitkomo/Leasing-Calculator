document.addEventListener('DOMContentLoaded', () => {
  validator()
  customRangeInput()
  calculator()
})

function validator() {
  const inputs = document.querySelectorAll('.form__input')

  inputs.forEach((item) => {
    item.addEventListener('input', (e) => {
      item.value = e.target.value.replace(/\D/g, '')
    })
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

  function calcMontlyPayment() {
    return Math.floor(
      (autoPriceNum.value - initialPaymentNum.value) * ((0.05 * Math.pow(1 + 0.05, periodNum.value)) / (Math.pow(1 + 0.05, periodNum.value) - 1)),
    )
  }

  function calcTotalPayment() {
    return Math.floor(periodNum.value * Number(payment.textContent) + Number(initialPaymentNum.value))
  }

  function calcPaymentPercent(percents = 100) {
    return Math.floor((initialPaymentNum.value * percents) / autoPriceNum.value)
  }

  function calcInitialPayment(percents) {
    return Math.floor((autoPriceNum.value * percents) / 100)
  }

  //memory variables
  let autoPrice = autoPriceNum.value
  let period = periodNum.value

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
    const preCalcPercents = calcPaymentPercent(100)
    if (preCalcPercents < 10 || preCalcPercents > 60) {
      let difference = preCalcPercents - 60
      if (difference >= (preCalcPercents - 60) / 2) {
        initialPaymentNum.value = calcInitialPayment(60)
      } else {
        initialPaymentNum.value = calcInitialPayment(10)
      }
    }
    assignValuesNum()
  })
  initialPaymentRange.addEventListener('input', () => {
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
    if (calcPaymentPercent() < 10 || calcPaymentPercent() > 60) {
      initialPaymentNum.value = calcInitialPayment(13)
      initialPaymentPercent.textContent = calcPaymentPercent() + '%'
    } else {
      initialPaymentPercent.textContent = calcPaymentPercent() + '%'
    }

    initialPaymentRange.value = Number(initialPaymentPercent.textContent.slice(0, -1))
    initialPaymentRange.style.setProperty('--value', initialPaymentRange.value) //for range slider to work

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
}
