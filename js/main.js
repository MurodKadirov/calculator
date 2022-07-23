const numbers = document.querySelectorAll('.num')
const signs = document.querySelectorAll('.sign')
const dot = document.querySelector('.dot')
const display = document.querySelector('input')
const equal = document.querySelector('.equal')
const clearButton = document.querySelector('.c')
const removeButton = document.querySelector('.r')

class Calculator {
    display 
    signOperator
    operators = ['+', '-', '✕', '÷']
    signView
    isDot = false
    setDisplay(value) {
        display.value = display.value + value
    }

    get lastValue () {
        return display.value[display.value.length - 1]
    }

    get firstValue () {
        return display.value[0]
    }

    numbers(event) {
        const num = +event.target.textContent.trim()

        /*
        
            oxirgi qiymati 0 bolsa va uzunligi 1 ga teng 
            ishoradan keyin oxirgi qiymati 0 bolsa
        
        */
        if(
            this.lastValue == 0 && display.value.length == 1
        ) return display.value = num

        if(
            this.lastValue == 0 && this.signView
        ) return display.value = display.value.slice(0, -1) + num

        return this.setDisplay(num)


    }

    signs(event) {
        const signView = event.target.textContent.trim()
        const signOperator = event.target.dataset.sign.trim()

        if(
            this.operators.includes(this.lastValue)
        ) return display.value = display.value.slice(0, -1) + signView

        if(
            !display.value ||
            this.lastValue == '.' || this.signOperator
        ) return

        /*

            display qiymati bosh bolsa
            oxirgi qiymati ishora bolsa 
            oxirgi qiymati nuqta bolsa

        */

        this.signView = signView
        this.signOperator = signOperator
        return this.setDisplay(signView)
    }

    dot() {

        /*
        
            display qiymati bosh bolsa
            oxirgi qiymati ishora bolsa 
            oxirgi qiymati nuqta bolsa
        
        */

        if(
            !display.value ||
            this.operators.includes(this.lastValue)
        ) {
            display.value = display.value + "0."
            return this.isDot = true
        }

        if(
            !display.value ||
            this.lastValue == "." ||
            this.operators.includes(this.lastValue) ||
            this.isDot
        ) return

        this.isDot = true
        return this.setDisplay('.')
    }

    calculate () {
        const [num1, num2] = display.value.split(this.signView)
        display.value = eval(num1 + this.signOperator + num2)
    }

    clear () {
        display.value = null

        this.signView = null
        this.signOperator = null
        this.isDot = false
    }

    remove () {
        if(
            this.operators.includes(this.lastValue)
        ) {
            this.signView = null
            this.signOperator = null
            if(display.value.includes('.')){
                this.isDot = true
            }
        }

        if(this.lastValue == "."){
            this.isDot = false
        }

        display.value = display.value.slice(0,- 1)

        // let deleted = display.value.split('')
        // let newValue = display.value.split('').slice(0,-1).join("")
        // console.log(deleted);
        // console.log(newValue);
        // display.value = newValue
    }

}

let calculator = new Calculator()
console.log(calculator);

for(let number of numbers){
    number.onclick = (event) => {
        return calculator.numbers(event)
    }
}

for(let sign of signs){
    sign.onclick = (event) => {
        return calculator.signs(event)
    }
}    

dot.onclick = () => {
    calculator.dot()
}

clearButton.onclick = () => {
    calculator.clear()
}

removeButton.onclick = () => {
    calculator.remove()
}
    
equal.onclick = () => {
    calculator.calculate()
}