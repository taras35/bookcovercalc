window.app = new Vue({
  el: '#app',
  data: function() {
    return {
      k: 0,
      w: 0,
      h: 0,
      Tb: 0,
      Kot: 0,
      Lk: 0,
      spineType: '',
      params: {

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
    },
    addInParams: function() {
      this.params.k = +this.k;
      this.params.w = +this.w;
      this.params.h = +this.h;
      this.params.Tb = +this.Tb;
      this.params.Kot = +this.Kot;
      this.params.Lk = +this.Lk;
      let selectFormat = document.querySelector('#format-type');
      this.formats.map(function(obj){
        if (obj.name == selectFormat.value) {
          for (let key in obj) {
            if (key == 'name') continue
            app.params[key] = +obj[key]
          }
        }
      });
    },
    calculationValue: function() {
      let Wkc = this.params.w + this.params.kp - this.params.p; // ширина кортонных сторонок
      let Hkc = this.params.h + 2 * this.params.kvn; // высота кортонных сторонок
      let Hot = this.params.h + 2 * this.params.kvn; // высота отстава допуск -0,5 - -1
      let Hm = this.params.h + 2 * (this.params.kvn + this.params.k + this.params.z); // высота покровного материала крышек
      let Wop = Wok = Wmp = Wmk = Wshp = Wshk = Wkp = Wkk = 0;
      
      if (this.spineType == 'Прямой') {
        Wop  = this.params.Tb + 2 * this.params.Kot;
        Wmp  = this.params.Tb + 2 * (this.params.w + this.params.k + this.params.Kot + this.params.kp + this.params.z);
        Wshp = this.params.Tb + 2 * (this.params.p + this.params.Kot);
        Wkp  = this.params.Tb + 2 * (this.params.w + this.params.kp + this.params.Kot);
      } else if (this.spineType == 'Кругленый') {
        Wok  = this.params.Lk;
        Wmk  = this.params.Lk + 2 * (this.params.w + this.params.k + this.params.kp + this.params.z);
        Wshk = this.params.Lk + 2 * this.params.p;
        Wkk  = this.params.Lk + 2 * (this.params.w + this.params.kp);
      }

      return {Wop: Wop, Wok: Wok, Wmp: Wmp, Wmk: Wmk, Wshp: Wshp, Wshk: Wshk, Wkp: Wkp, Wkk: Wkk, Wkc: Wkc, Hkc: Hkc, Hot: Hot, Hm: Hm,}
    },
    renderScheme: function() {
      this.addInParams();
      Object.assign(this.params, this.calculationValue());
      console.log(this.params)
      render.innerHTML = '';
      document.querySelector('.text').style.opacity = 0
      render.insertAdjacentHTML('beforeend', `
        <span class="Wmp">${this.params.Wmp}</span>
        <span class="Hm">${this.params.Hm}</span>
        <div>
          <span class="Wkp">${this.params.Wkp}</span>
          <div>
            <span class="Wkc">${this.params.Wkc}</span>
            <span class="Hkc">${this.params.Hkc}</span>
            <div>
              <span class="P">${this.params.p + this.params.Kot}</span>
              <div>
                <span class="Tb">${this.params.Tb}</span>
              </div>
            </div>
          </div>
        </div>`)
    }
    // lightInputs: function() {
    //   let elements = document.querySelectorAll('input, select');
      
    //   console.log(elements);
    //   elements.forEach(elem => {
    //     if (!elem.value || elem.value == 0) elem.style.outline = 'red solid 1px'
    //   })
    // }
  },
  computed: {
    isButtonDisabled: function() {
      return +this.k && +this.w && +this.h && +this.Tb && +this.Kot ? false : true
    },

  },
});
