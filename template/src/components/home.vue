<template>
  <f7-page toolbar-fixed>
    <!-- navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center>Hello World</f7-nav-center>
    </f7-navbar>

    <!-- content -->
    <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu felis volutpat, rutrum ex quis, lobortis ex. Curabitur quis mattis lorem. Nullam magna lacus, interdum vel maximus nec, vestibulum non quam. Phasellus ornare efficitur porttitor. Quisque neque diam, imperdiet in fermentum nec, congue vitae ante. Nullam imperdiet maximus commodo. Morbi pharetra id purus ac ultrices. Duis non posuere 	<f7-link @click="openAlert">alert</f7-link>.</p>
    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    methods: {
      openAlert () {
        this.$f7.alert('Hi, this is alert', 'Alert Title')
      }
    }
  }
</script>
