class Calc extends React.Component {
    constructor(props) {
        super(props);
        this._onPressNum = this._onPressNum.bind(this);
        this._onClear = this._onClear.bind(this);
        this._onBack = this._onBack.bind(this);
        this._onFractional = this._onFractional.bind(this);
        this._modeToggle = this._modeToggle.bind(this);
        this._changeState = this._changeState.bind(this);
        this._refreshDisplay = this._refreshDisplay.bind(this);
        this._changeSign = this._changeSign.bind(this);
        this._onEqual = this._onEqual.bind(this);
        this._request = this._request.bind(this);
        this._displayAnswer = this._displayAnswer.bind(this);
        this.state = {
            display: '',
            num1: '',
            num2: '',
            operation: '',
            mode: 'classic',
            isNum1Fractional: false,
            isNum2Fractional: false,
            isNum1Positive: true,
            isNum2Positive: true,
            currentState: 'num1',
        };
    }
    _displayAnswer(answer)
    {
        this._onClear();
        this.setState({
            display: answer,
        });
    }

    _request(string)
    {
        var response;
        if (!string) {
            return null;
        }
       fetch(string)
       .then((response) => {
           return response.json();
       }).then((json) => {
           console.log(json);
           response = json;
           this._displayAnswer(json)
       });
       return response;
    }

    _onEqual()
    {
        var base = '/api/operation/'
        var string;
        var response;
        switch(this.state.operation)
        {   
            case '+':
                string = base + 'addition/' + ((this.state.isNum1Positive) ? '' : '-') + this.state.num1 + '/' + ((this.state.isNum2Positive) ? '' : '-') + this.state.num2 + '/';
                this._request(string);
                break;
            case '-':
                string = base + 'subtract/' + ((this.state.isNum1Positive) ? '' : '-') + this.state.num1 + '/' + ((this.state.isNum2Positive) ? '' : '-') + this.state.num2 + '/'
                this._request(string);
                break;
            case '*':
                string = base + 'multiplicate/' + ((this.state.isNum1Positive) ? '' : '-') + this.state.num1 + '/' + ((this.state.isNum2Positive) ? '' : '-') + this.state.num2 + '/'
                this._request(string);
                break;
            case '/':
                string = base + 'division/' + ((this.state.isNum1Positive) ? '' : '-') + this.state.num1 + '/' + ((this.state.isNum2Positive) ? '' : '-') + this.state.num2 + '/'
                this._request(string);
                break;
            case '^2':
                string = base + 'square/' + ((this.state.isNum1Positive) ? '' : '-') + this.state.num1 + '/'
                this._request(string);
                break;
            case '√':
                string = base + 'sqrt/' + ((this.state.isNum1Positive) ? '' : '-') + this.state.num1 + '/'
                this._request(string);
                break;
            default:
                break;
        }
        console.log(string);
    }
    _changeSign()
    {
        this.setState({
            isNum1Positive: (this.state.currentState == 'num1') ? !this.state.isNum1Positive :  this.state.isNum1Positive,
            isNum2Positive: (this.state.currentState == 'num2') ? !this.state.isNum2Positive :  this.state.isNum2Positive,
        }, function afterChange() { this._refreshDisplay(); }
     );
    }


    _changeState(state) {
        if ((state == 'num1') || (state == 'num2'))
            this.setState({ currentState: state },
             function afterChange() {
                 this._refreshDisplay();
             });
    }

    
    _onOperate(operate)
    {
        if ((operate == '^2') || (operate == '√'))
            {}
        var numState = ((this.state.currentState == 'num1') && ((operate != '^2') || (operate != '√'))) ? 'num2' : 'num1'
        this.setState({
            operation: operate,
            isNum2Positive: ((operate == '^2') || (operate == '√')) ? true : this.state.isNum2Positive,
            num2: ((operate == '^2') || (operate == '√')) ? '' : this.state.num2,
            isNum2Fractional: ((operate == '^2') || (operate == '√')) ? false : this.state.isNum2Fractional,
        },
        function afterChange() { this._refreshDisplay(); this._changeState(numState); });
    }

    _onFractional()
    {
        if (!this.state.isNum1Fractional)
        {
            this.setState({
                num1: (this.state.currentState == 'num1') ? this.state.num1 + '.' : this.state.num1,
                isNum1Fractional: (this.state.currentState == 'num1') ? true : this.state.isNum1Fractional,
            },
            function afterChange() { this._refreshDisplay(); }
            );
        }
        if (!this.state.isNum2Fractional) {
            this.setState({
                num2: (this.state.currentState == 'num2') ? this.state.num2 + '.' : this.state.num2,
                isNum2Fractional: (this.state.currentState == 'num2') ? true : this.state.isNum2Fractional
            },
            function afterChange() { this._refreshDisplay(); }
            );
        }
    }
    _modeToggle()
    {
        if (this.state.mode=='classic')
            this.setState({
                mode: 'engineer'
            });
        else
            this.setState({
                mode: 'classic'
            });
    }
    _onClear()
    {
        this.setState({
            num1: '',
            num2: '',
            display: '',
            operation: '',
            currentState: 'num1',
            isNum2Fractional: false,
            isNum1Fractional: false,
            isNum1Positive: true,
            isNum2Positive: true,
        });
    }

    _onPressNum (value)  {
        console.log(this.state.currentState);
        currentNum = (this.state.currentState == 'num1')? this.state.num1 : this.state.num2
        num = currentNum;
        num = num.toString() + value.toString();
        this.setState({
            num1: (this.state.currentState == 'num1') ? num : this.state.num1,
            num2: (this.state.currentState == 'num2') ? num : this.state.num2,
        },
        function afterChange() { this._refreshDisplay(); });

        return null;
    };

    _onBack() {
        currentNum = (this.state.currentState == 'num1') ? this.state.num1 : this.state.num2
        last = currentNum.slice(-1);
        num = currentNum.slice(0, -1);
        //Если число num2 закончилось
        var isEndNum2 = ((currentNum == '') && (this.state.currentState == 'num2')) ? true : false;
        this._changeState((isEndNum2) ? 'num1' : this.state.currentState);
        this.setState(
            {
                operation: (isEndNum2) ? '' : this.state.operation,
                isNum2Positive: (isEndNum2) ? true : this.state.isNum2Positive,
                num1: (this.state.currentState == 'num1') ? num : this.state.num1,
                num2: (this.state.currentState == 'num2') ? num : this.state.num2,
                isNum1Fractional: (((this.state.currentState == 'num1') && (this.state.isNum1Fractional) && (last == '.'))) ? false : true,
                isNum2Fractional: (((this.state.currentState == 'num2') && (this.state.isNum2Fractional) && (last == '.'))) ? false : true
            },
            function afterChange() {  this._refreshDisplay();  }
            );
        }

    _refreshDisplay() {
        this.setState(
            { display: ((this.state.isNum1Positive) ? '' : '-') + this.state.num1 + ' ' + this.state.operation + ' ' + ((this.state.isNum2Positive) ? '' : '-') + this.state.num2 }
        );
    }


    render() {
        var engineerButtonsClass = this.state.mode == 'engineer' ? 'btn' : 'btn hide';
        return (
       <div>
            <div>
                <input type="text" value={this.state.display} readOnly/>
                <br />
                <br />
            </div>
            <div>
                <button className="btn" onClick={() =>this._modeToggle()}>{this.state.mode == 'classic' ? 'Инженерный' : 'Классический'}</button>
            </div>
            <div>
                <button className="btn" onClick={() =>this._onBack()}>back</button>
                <button className="btn" onClick={() =>this._onClear()}>C</button>
                <button className="btn" onClick={() =>this._onOperate('/')}>/</button>
                <button className={engineerButtonsClass} onClick={() => this._onOperate('^2')}>x^2</button>
                <button className={engineerButtonsClass} onClick={() => this._onOperate('√')}>sqrt</button>
            </div>
            <div>
                <button className="btn" onClick={() =>this._onPressNum(7)}>7</button>
                <button className="btn" onClick={() => this._onPressNum(8)}>8</button>
                <button className="btn" onClick={() => this._onPressNum(9)}>9</button>
                <button className="btn" onClick={() => this._onOperate('*')}>X</button>
            </div>
            <div>
                <button className="btn" onClick={() => this._onPressNum(4)}>4</button>
                <button className="btn" onClick={() => this._onPressNum(5)}>5</button>
                <button className="btn" onClick={() => this._onPressNum(6)}>6</button>
                <button className="btn" onClick={() => this._onOperate('-')}>-</button>
            </div>
            <div>
                <button className="btn" onClick={() => this._onPressNum(1)}>1</button>
                <button className="btn" onClick={() => this._onPressNum(2)}>2</button>
                <button className="btn" onClick={() => this._onPressNum(3)}>3</button>
                <button className="btn"  onClick={() => this._onOperate('+')}>+</button>
            </div>
            <div>
                <button className="btn" onClick={() => this._changeSign()}>+/-</button>
                <button className="btn" onClick={() => this._onPressNum(0)}>0</button>
                <button className="btn" onClick={() => this._onFractional()}>,</button>
                <button className="btn" onClick={() => this._onEqual() }>=</button>
             </div>
       </div>
    );
    }
}




ReactDOM.render(
  <Calc />,
  document.getElementById('content')
);