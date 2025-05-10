import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: props.amount
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';

    const dateStr = this.state.date.toLocaleString();
    const amountStr = `$${this.state.amount}`;

    const dateElement = document.createElement('span');
    dateElement.textContent = `${dateStr} - `;

    const amountElement = document.createElement('b');
    amountElement.textContent = amountStr;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
      if (props.onDelete) {
        props.onDelete(this.state.amount);
      }
      this.$rootElement.remove();
    });

    this.$rootElement.appendChild(dateElement);
    this.$rootElement.appendChild(amountElement);
    this.$rootElement.appendChild(deleteButton);
  }
}