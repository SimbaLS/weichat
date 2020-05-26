const operate = require('../../utils/operate.js');
Component({
  properties: {
    dto: {
      type: Object,
      value: {},
    }
   
  },

  data: {

  },

  methods: {
  
    addNum(event) {
      let self = this;
      let obj = this.properties.dto;
      console.log(event);
      let id = event.currentTarget.dataset.contentid;
      obj.num = ++obj.num;
      self.setData({
        dto: obj
      })
    },
  
    //向父级传值
    numToTop() {
      let that = this;
      let num = that.properties.dto.num;
      this.triggerEvent('numChange', {
        num: num
      })
    }
  }
});

