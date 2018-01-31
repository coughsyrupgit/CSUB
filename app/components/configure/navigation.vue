<template>
    <ul class="uk-tab-right" uk-tab="connect: #configTabsContent">
        <li v-for="item in items"
        :key="item.id">
            <a href="#">{{ item.title }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    id: 0,
                    title: 'Nav Item'
                },
                {
                    id: 1,
                    title: 'Item #2'
                },
                {
                    id: 2,
                    title: 'Another Nav Item'
                }
            ]
        }
    }
}
</script>
