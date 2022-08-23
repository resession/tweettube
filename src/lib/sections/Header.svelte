<script>
  import {link, location, push, pop, replace} from 'svelte-spa-router'
  import {gun, user} from '../../frame/db.js'
  import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Input, Button, InputGroup, FormText } from 'sveltestrap';
  import {auth} from '../../frame/store.js'

  let isOpen = false;

  let isAuth

  auth.subscribe((value) => {isAuth = value})

  let username
  let password
  let registerOrLogin = 'login'

  let search
  let category = 'title'

  let textError

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

  function test(e){
    e.preventdefault()
    // const formData = new FormData(e.target as HTMLFormElement)
  }

  function lookUp(e){
    console.log(e.target)
    if(search){}
  }

  function session(e){
    console.log(e.target)
    if(username && password){
      if(registerOrLogin === 'login'){
        user.auth(username, password, (data) => {
          if(data.err){
            textError = 'BAD'
            setTimeout(() => {textError = null}, 3000)
          } else {
            const check = data.sea
            check.expire = Date.now() + 86400000
            check.alias = username

            username = ''
            password = ''

            localStorage.setItem('auth', JSON.stringify(check))
            auth.set(check)
            textError = 'GOOD'
            setTimeout(() => {textError = null}, 3000)
          }
        })
      } else if(registerOrLogin === 'register'){
        user.create(username, password, (data) => {
          username = ''
          password = ''
        if(data.err){
          textError = 'BAD'
          setTimeout(() => {textError = null}, 3000)
        } else {
          textError = 'GOOD'
          setTimeout(() => {textError = null}, 3000)
        }
      })
      } else {
        textError = 'BAD'
        setTimeout(() => {textError = null}, 3000)
      }
    }
  }

  function logout(e){
    console.log(e.target)
    localStorage.removeItem('auth')
    auth.set(null)
  }
</script>

<Navbar color="light" light expand="md">
  <!-- svelte-ignore a11y-missing-attribute -->
  <NavbarBrand><a use:link={{href: '/', disabled: false}} class="pass-down">sveltestrap</a></NavbarBrand>
  <NavbarToggler on:click={(e) => {console.log(e.target);isOpen = !isOpen}} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav navbar>
      <NavItem>
        <NavLink href="#components/">Components</NavLink>
      </NavItem>
      <NavItem class="mx-3">
        <NavLink href="#components/">Components</NavLink>
      </NavItem>
      {#if textError}
      <NavItem>
        <span>{textError}</span>
      </NavItem>
      {/if}
    </Nav>
    <Nav class="ms-auto" navbar>
      <Form inline class="mx-3">
        <InputGroup>
          <Input type="text" bind:value={search}></Input>
          <Input type="select" bind:value={category}>
            <option>title</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          <Button type="button" on:click={lookUp}>Search</Button>
        </InputGroup>
      </Form>
      {#if isAuth}
        <NavItem class="mx-1">
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- <Button on:click={(e) => {console.log(e.target);if($location === '/profile'){replace('/profile')}else{push('/profile')}}}>Profile</Button> -->
          <Button><a use:link={{href: '/profile', disabled: false}} class="pass-down">Profile</a></Button>
        </NavItem>
        <NavItem class="mx-1">
          <!-- svelte-ignore a11y-missing-attribute -->
          <Button><a use:link={{href: '/account', disabled: false}} class="pass-down">Account</a></Button>
        </NavItem>
        <NavItem>
          <Button on:click={logout}>Logout</Button>
        </NavItem>
      {:else}
        <Form inline>
          <InputGroup>
            <Input type="text" bind:value={username}></Input>
            <Input type="text" bind:value={password}></Input>
            <Input type="select" bind:value={registerOrLogin}>
              <option>login</option>
              <option>register</option>
            </Input>
            <Button type="button" on:click={session}>Session</Button>
          </InputGroup>
        </Form>
      {/if}
    </Nav>
  </Collapse>
</Navbar>

<style>
  .pass-down {
    color: inherit;
    text-decoration: inherit;
  }
</style>