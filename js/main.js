

// Первая форма
const monthlyIncome = document.querySelector('#monthlypass') // Ежемесячный пассивный доход
const bidYear = document.querySelector('#bidyear') // Ставка годовая

const capital = document.querySelector('#capital') // Капитал

const bidsec = document.querySelector('#bidsec') // Годовая ставка 2
const yearstogoal = document.querySelector('#yearstogoal') // Лет до достижения цели
const firstcapital = document.querySelector('#firstcapital') // Первоначальный капитал


const monthlysum = document.querySelector('#monthlysum') // Ежемесячная сумма

monthlyIncome.addEventListener('change', e => {
    if(+monthlyIncome.value > +monthlyIncome.max){
        monthlyIncome.value = monthlyIncome.max
    } else if (+monthlyIncome.value < +monthlyIncome.min){
        monthlyIncome.value = monthlyIncome.min
    }
    writeCapital()
    writeMonthlySum()
})

bidYear.addEventListener('change', () => {
    writeCapital()
    writeMonthlySum()
})

bidsec.addEventListener('change', () => {
    writeMonthlySum()
})

yearstogoal.addEventListener('change', () => {
    if(+yearstogoal.value > +yearstogoal.max){
        yearstogoal.value = yearstogoal.max
    } else if (+yearstogoal.value < +yearstogoal.min){
        yearstogoal.value = yearstogoal.min
    }
    writeMonthlySum()
})
firstcapital.addEventListener('change', () => {
    if(+firstcapital.value > +firstcapital.max){
        firstcapital.value = firstcapital.max
    } else if (+firstcapital.value < +firstcapital.min){
        firstcapital.value = firstcapital.min
    }
    writeMonthlySum()
})





function calculateCapital(){
    const S = monthlyIncome.value * 12 / bidYear.value;
    return S;
}
function calculateMonthlySum(){
    const S = Math.ceil(( calculateCapital() - (firstcapital.value *  Math.pow((1 + bidsec.value / 12), 12 * yearstogoal.value))) / (12 / bidsec.value  * (Math.pow((1 + bidsec.value / 12), 12 * yearstogoal.value) - 1)))
    return Math.max(S, 0); // Бывают ситуации, когда сумма уходит в минус, поэтому логично, что никакой ежемесячной суммы быть не может в такой ситуации
}
function writeMonthlySum(){
    monthlysum.value = calculateMonthlySum()
}
function writeCapital(){
    capital.value = calculateCapital()
}
writeCapital()


writeMonthlySum()




// Вторая форма


const capitalsize = document.querySelector('#capitalsize') // Капитал

const bidinvest = document.querySelector('#bidinvest') // Годовая ставка 2
const yearstogoal2 = document.querySelector('#yearstogoal2') // Лет до достижения цели
const firstcapital2 = document.querySelector('#firstcapital2') // Первоначальный капитал


const monthlysum2 = document.querySelector('#monthlysum2') // Ежемесячная сумма

capitalsize.addEventListener('change', () => {
    if(+capitalsize.value > +capitalsize.max){
        capitalsize.value = capitalsize.max
    } else if (+capitalsize.value < +capitalsize.min){
        capitalsize.value = capitalsize.min
    }
    writeMonthlySum2()
})

bidinvest.addEventListener('change', () => {
    writeMonthlySum2()
})

yearstogoal2.addEventListener('change', () => {
    if(+yearstogoal2.value > +yearstogoal2.max){
        yearstogoal2.value = yearstogoal2.max
    } else if (+yearstogoal2.value < +yearstogoal2.min){
        yearstogoal2.value = yearstogoal2.min
    }
    writeMonthlySum2()
})

firstcapital2.addEventListener('change', () => {
    if(+firstcapital2.value > +firstcapital2.max){
        firstcapital2.value = firstcapital2.max
    } else if (+firstcapital2.value < +firstcapital2.min){
        firstcapital2.value = firstcapital2.min
    }
    writeMonthlySum2()
})

function calculateMonthlySum2(){
    const S = (capitalsize.value - (firstcapital2.value * Math.pow((1 + bidinvest.value / 12), 12 * yearstogoal2.value)) ) / ( 12 / bidinvest.value * (Math.pow((1 + bidinvest.value / 12), 12 * yearstogoal2.value) - 1))
    return Math.max(Math.ceil(S, 0));
}
function writeMonthlySum2(){
    monthlysum2.value = calculateMonthlySum2()
}
writeMonthlySum2()





const changePosition = {
    name: 'changePosition',
    enabled: true,
    phase: 'main',

    fn({ state }) {
        if (state.placement === 'top') {
          state.elements.popper.querySelector('.arrow').classList.remove('arrow--reverse')
        }
        if (state.placement === 'bottom') {
          state.elements.popper.querySelector('.arrow').classList.add('arrow--reverse')
        }
      },
}

if(window.matchMedia('(min-width: 1025px)').matches){
    const parents = document.querySelectorAll('.mb-3')
    parents.forEach(p => {
        const button = p.querySelector('.tooltip-parent');
        const tooltip = p.querySelector('.form-text');
        Popper.createPopper(button, tooltip, {
            
            modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 10],
                  },
                },
                changePosition
              ],
            placement: 'top',
          });
    })
}
