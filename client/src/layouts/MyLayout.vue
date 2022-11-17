<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          <q-avatar>
          </q-avatar> BY-Track-And-Trace
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="300"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list
          v-for="(menuItem, index) in menuList"
          :key="index"
        >

          <q-item
            clickable
            :active="menuItem.label === 'Outbox'"
            v-ripple
            :to='menuItem.to'
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: 'dashboard',
    label: 'Home',
    separator: true,
    to: '/'
  },
  {
    icon: 'library_add',
    label: 'Add Batch',
    separator: false,
    to: '/addbatch'
  },
  {
    icon: 'assignment',
    label: 'Trace the Batch',
    separator: true,
    to: '/viewbatch'
  }
]

export default {
  data () {
    return {
      drawer: false,
      menuList
    }
  }
}
</script>
