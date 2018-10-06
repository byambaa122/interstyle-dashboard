import Vue from 'vue'
import { dateFormat } from '~/utils/filters'

Vue.filter('date', dateFormat)
