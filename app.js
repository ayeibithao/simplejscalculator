class Calc {
    constructor(prevOperandTxt, curOperandTxt){
        this.prevOperandTxt = prevOperandTxt
        this.curOperandTxt = curOperandTxt
        this.toReset = false
        this.clear()
    }
    clear() {
        this.currOperand =  ''
        this.prevOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }
    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currOperand === '') return
        if(this.currOperand !== '' && this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }
    compute(){
        let computation 
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '*':
                computation = prev * current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.toReset = true
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const digitNumber = parseFloat(stringNumber.split('.')[0])
        const decimalNumber = stringNumber.split('.')[1]
        let intDisplay 
        if(isNaN(digitNumber)){
            intDisplay = ''
        } else {
            intDisplay = digitNumber.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalNumber != null) {
            return `${intDisplay}.${decimalNumber}`
        } else {
            return intDisplay
        }
        
    }
    updateDisplay(){
        this.curOperandTxt.innerText = this.getDisplayNumber(this.currOperand)
        if(this.operation != null){
            this.prevOperandTxt.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandTxt.innerText = ''
        }   
    }
}

const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation')
const equalsBtn = document.querySelector('[data-equals]')
const acBtn = document.querySelector('[data-all-clear]')
const delBtn = document.querySelector('[data-delete]')
const prevOperandTxt = document.querySelector('[data-previous-operand]')
const curOperandTxt = document.querySelector('[data-current-operand]')
const calculator = new Calc(prevOperandTxt, curOperandTxt)

acBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.prevOperand === "" && calculator.currOperand !== "" && calculator.toReset) {
            calculator.currOperand = ""
            calculator.toReset = false
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

delBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})