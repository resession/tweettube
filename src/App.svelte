<script>
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import Router from 'svelte-spa-router'
  import Header from './lib/sections/Header.svelte'
  import Footer from './lib/sections/Footer.svelte'
  import {auth} from './frame/store.js'
  import {routes} from './frame/routes.js'
  import {Container, Row, Col} from 'sveltestrap'

  let isLoggedIn

  auth.subscribe((value) => {isLoggedIn = value})

  // start up
  let check = localStorage.getItem('auth')
  if(check){
    check = JSON.parse(check)
    if(Date.now() < check.expire){
      auth.set(check)
    } else {
      localStorage.removeItem('auth')
      auth.set(null)
    }
  }
</script>
<Container fluid>
  <Row>
    <Col>
      <Header/>
    </Col>
  </Row>
  <Row>
    <Col>
      <Router {routes}/>
    </Col>
  </Row>
  <Row>
    <Col>
      <Footer/>
    </Col>
  </Row>
</Container>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
