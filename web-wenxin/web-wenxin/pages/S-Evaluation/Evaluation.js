Page({
  /*单选按钮*/
  data: {
    items: [
      {name: '很好', value: 'value1', checked: false},
      {name: '一般', value: 'value2', checked: false},
      {name: '较差', value: 'value3', checked: false}
    ]
  },
  radioChange: function(e) {
    const items = this.data.items;
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value;
    }
    this.setData({
      items: items
    });
  }
})