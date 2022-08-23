<script>
    import {Button, Row, Col} from 'sveltestrap'
    import {gun, user} from '../../frame/db'
    let show = false
    export const cred = {}
    export const post = {}
</script>

<Row>
    <Col>
        <p>{post.picture}</p>
        <p>{post.alias}</p>
        {#if post.media}
            {#if ['.png', '.jpeg', '.jpg', '.ico', '.gif', '.svg', '.webp'].includes(post.media.slice(post.media.lastIndexOf('.')))}
                <img src={post.media} alt={post.media}>
            {:else if ['.mp4', '.webm', '.ogg'].includes(post.media.slice(post.media.lastIndexOf('.')))}
                <video src={post.media}></video>
            {:else if ['.mp3', '.wav', '.ogg'].includes(post.media.slice(post.media.lastIndexOf('.')))}
                <audio src={post.media}></audio>
            {:else}
                <p>media is not supported</p>
            {/if}
        {/if}
        {#if post.text}
        <p>{post.text}</p>
        {/if}
        {#if {show}}
            <!-- svelte self recursive component for replies, also keep id/replies path on the data to refer to it -->
        {:else}
            <!-- show button to load reply component -->
        {/if}
    </Col>
</Row>