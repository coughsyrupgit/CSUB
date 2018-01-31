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
                    title: 'Global'
                },
                {
                    id: 1,
                    title: 'Folders'
                }
            ]
        }
    }
}
</script>
