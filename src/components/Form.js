import { Component } from '../core/Component';

export class Form extends Component {
  setup(props) {
    this.state = {
      amount: ''
    };

    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';

    this.labelElement = document.createElement('label');
    this.labelElement.className = 'donate-form__input-label';
    this.labelElement.textContent = 'Введите сумму в $';

    this.$input = document.createElement('input');
    this.$input.className = 'donate-form__donate-input';
    this.$input.type = 'number';
    this.$input.min = '1';
    this.$input.max = '100';
    this.$input.required = true;
    this.$input.name = 'amount';

    this.$button = document.createElement('button');
    this.$button.className = 'donate-form__submit-button';
    this.$button.textContent = 'Задонатить';
    this.$button.disabled = true;
    this.$button.type = 'submit';

    this.labelElement.appendChild(this.$input);
    this.$rootElement.appendChild(this.labelElement);
    this.$rootElement.appendChild(this.$button);

    this.$input.addEventListener('input', this.handleInput.bind(this));
    this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this));

    this.onSubmitCallback = props.onSubmit;
  }

  get isValid() {
    const amount = Number(this.state.amount);
    return !isNaN(amount) && amount >= 1 && amount <= 100;
  }

  handleInput(event) {
    this.state.amount = event.target.value;
    this.$button.disabled = !this.isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid) {
      this.onSubmitCallback(Number(this.state.amount));
      this.state.amount = '';
      this.$input.value = '';
      this.$button.disabled = true;
    }
  }
}