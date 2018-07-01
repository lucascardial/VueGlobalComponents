# Vue Global Components
Uma explicação rápida de uma abordagem para centralizar o registro global de componentes Vue
![Alt Text](https://github.com/lucca-cardial/VueGlobalComponents/raw/master/screenshot/screen.png)

# Importante
Para que esta abordagem funcione, é obrigatório que todos os componentes que deverão ser importados, possuam o atributo `name` definido.

### Criando os Componentes
Neste exemplo, possuo dois componentes `btnPrimary.vue` e `btnSuccess.vue` no diretório: `components/buttons/`.
##### btnPrimary.vue
```
<template>
  <button type="button" name="button"> {{ btnLabel }} </button>
</template>
<script>
export default {
  name: "btn-primary",
  data: () => ({ 
  btnLabel: 'PRIMARY'
  })
}
</script>
```
##### btnSuccess.vue

```
<template>
  <button type="button" name="button"> {{ btnLabel }} </button>
</template>
<script>
export default {
  name: "btn-success",
  data: () => ({
    btnLabel: 'SUCESS'
  })
}
</script>
```
No mesmo diretório, defini um `index.js` apenas para seguir o [padrão Re-exporting](http://exploringjs.com/es6/ch_modules.html#_re-exporting) do ES6
```
export { default as btnPrimary } from './btnPrimary.vue'
export { default as btnSuccess } from './btnSuccess.vue'
```
### Registrando Componentes
Agora basta criar um `index.js` no diretório `components`, para registrar todos os componentes desejados. Este arquivo registrará e exportará todos os componentes importados e declarados no `array components`

```
import { btnPrimary, btnSuccess } from './buttons'

const components = [
  btnPrimary,
  btnSuccess
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
```
### Finalmente
Por fim, basta importar o arquivo ` import MyComponents from './components/'` no `main.js`, e adicioná-lo ao escopo do vue com: `Vue.use(MyComponents)`

```
import Vue from 'vue'
import App from './App'

import MyComponents from './components/'

Vue.use(MyComponents)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```
Tornando possível chamar qualquer componente (baseado em seu atributo name) em qualquer arquivo Vue:
```
<template>
  <div id="app">
    <btn-primary/>
    <btn-success/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```
#
