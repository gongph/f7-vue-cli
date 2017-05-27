<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>

    <!-- panel -->
    <f7-panel left reveal layout="dark" theme="pink">
      <f7-view navbar-fixed name="left">
        <f7-pages>
          <f7-page>
            <f7-navbar title="left panel"></f7-navbar>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>
    
    <!-- views -->
    <f7-views navbar-through>
      <f7-view main url="/home/" :dynamic-navbar="true"></f7-view>
    </f7-views>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'hello, vue.js!'
      }
    },
    methods: {
      toggle () {
        console.log('hello!')
      }
    }
  }
</script>

<style>
  p { font-size: 13px; }
</style>
