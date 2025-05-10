import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

export class App extends Component {
  setup() {
    this.state = {
      total: 0,
      donates: []
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    this.header = document.createElement('h1');
    this.header.className = 'total-amount';
    this.header.textContent = 'Итого: $';

    this.$total = document.createElement('span');
    this.$total.textContent = this.state.total;
    this.header.appendChild(this.$total);
    this.$rootElement.appendChild(this.header);

    this.donateForm = new Form({
      onSubmit: (amount) => this.onItemCreate(amount)
    });
    this.$rootElement.appendChild(this.donateForm.$rootElement);

    this.donateList = new List();
    this.$rootElement.appendChild(this.donateList.$rootElement);
  }

  onItemCreate(amount) {
    const item = new ListItem({
      amount,
      onDelete: (itemAmount) => {
        this.state.total -= itemAmount;
        this.$total.textContent = this.state.total;
      }
    });

    this.state.donates.push(item);
    this.state.total += amount;
    this.$total.textContent = this.state.total;
    this.donateList.addItem(item);
  }
}