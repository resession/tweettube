import { wrap } from 'svelte-spa-router/wrap'
import Content from '../lib/sections/Content.svelte'
import Page from '../lib/sections/Page.svelte'
import Profile from '../lib/contents/Profile.svelte'
import Account from '../lib/contents/Account.svelte'

export const routes = {
    '/': wrap({
        component: Content
    }),
    '/profile': wrap({
        component: Profile
    }),
    '/account': wrap({
        component: Account
    }),
    '*': wrap({
        component: Page
    })
}