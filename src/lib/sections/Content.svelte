<script>
    import {Button, Row, Col} from 'sveltestrap'
    import {gun, user} from '../../frame/db'

    const obj = {arr: [], page: 0}
    gun.get('friends').get({'.': {'>': String(obj.page)}, '%': 50000}).once().map().once((data) => {
        const i = Number(data.id.split('-')[0])
        if(i > obj.page){
            obj.page = i
        }
        obj.arr.push(data)
        obj.arr = obj.arr
    })
</script>

<Row>
    <Col>
        <Row>
            
        </Row>
        <Row></Row>
    </Col>
</Row>

<style></style>