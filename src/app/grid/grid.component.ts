import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  orders = []
  filteredOrders = []
  tabFilter = ''
  value = ''
  checked : {id:any,checked:boolean}[] = []
  allChecked = false

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getOrders().subscribe(res => {
      this.orders = res;
      this.filteredOrders = res;
      res.map((item: any) => {
        this.checked.push({ id: item['id'], checked: false });
      })
    })
  }
  formatDateTop(time:any) {
    let date  = new Date(time);
    let formatedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return formatedDate;
  }
  formatDateBottom(time:any) {
    let date  = new Date(time);
    let formatedDate = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
    return formatedDate;
  }
  formatTotal(number:any) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number)
  }

  searchFilter(event:any) {
    this.value = event.target.value;
    this.filteredOrders = this.orders.filter(orders =>
      Object.keys(orders).some(key => this.tabFilter === '' ? String(orders[key]).toLowerCase().includes(this.value.toLowerCase()) : String(orders[key]).toLowerCase().includes(this.value.toLowerCase()) && orders['status'] === this.tabFilter));
  }
  tabFilterClick(string:any) {
    this.tabFilter = string;
    this.filteredOrders = this.orders.filter(orders =>
      Object.keys(orders).some(key => this.tabFilter === '' ? String(orders[key]).toLowerCase().includes(this.value.toLowerCase()) : String(orders[key]).toLowerCase().includes(this.value.toLowerCase()) && orders['status'] === this.tabFilter));
  }
  orderTotal(string:any) {
    let total = this.orders.filter(order => order['status'] === string).length
    return total
  }
  checkBoxCheck(string:any) {
    return this.checked[string]?.checked;
  }
  checkBoxClick(string:any) {
    this.checked[string].checked = !this.checked[string].checked;
    this.allCheckboxCheck()
  }
  checkAll(event:any) {
    this.checked.map((item:any) => {
      item.checked = event.target.checked;
    })
  }
  allCheckboxCheck() {
    this.allChecked = this.checked.filter(item => item.checked === false).length === 0
    return this.allChecked;
  }
}
