import Vuelidate from 'vuelidate'
import VueCompositionApi from '@vue/composition-api'

export default ({ Vue }) => {
  Vue.use(Vuelidate)
  Vue.use(VueCompositionApi)
}
