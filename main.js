window.app = new Vue({
  el: '#app',
  data: function() {
    return {
      params: {
        k: 0,
        w: 0,
        h: 0,
        Tb: 0,
        Kot: 0,
      },
      formats: [
        {
          name: 'Малый',
          kvn: 2,
          kp: 3,
          z: 15,
        },
        {
          name: 'Средний',
          kvn: 3,
          kp: 4,
          z: 15,
        },
        {
          name: 'Большой',
          kvn: 4,
          kp: 5,
          z: 15,
        }
      ],
    }
  },
  methods: {
    calcP: function(k) {
      let str = k.split('').map(i => i == ',' ? '.' : i).join('');
      let P = 5 + Number(str) * 2;
      this.formats.forEach(obj => obj.p = P);
      return P
    }
    // fixComma: function(str) {
    //   return str.split('').map(i => i == ',' ? '.' : i).join('')
    // }
  },
  computed: {
    isButtonDisabled: function() {
      return +this.params.k && +this.params.w && +this.params.h && +this.params.Tb && +this.params.Kot ? false : true
    },
    
  },
});