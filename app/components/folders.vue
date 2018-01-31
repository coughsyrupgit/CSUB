<template>
    <div class="uk-container">
        <div class="uk-grid-match uk-margin-large-bottom" uk-grid v-if="folders.length">
            <folder v-for="folder in folders"
                :key="folder.id"
                :folder="folder"></folder>
        </div>
    </div>
</template>

<script>
import folder from './folder.vue'


export default {
    data() {
        return {
            folders: [
                {
                    id: 0,
                    title: 'Test Folder',
                    image: ''
                },
                {
                    id: 1,
                    title: 'Test With Image',
                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAQnAAAEJwHZTx2AAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAO1QTFRF////asJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZasJZEJktkgAAAE50Uk5TAAECAwQGCgsMDg8SExQVGRweHzQ4PD1CQ0dKTltgYmxwc3yCg4SGiImQlZalp6uutbi6vr/AwcLDxcjLzs/Q0dLT2d7m6+zt8/f5+vz+46saEgAAA9NJREFUeNrNm2lb2kAUha91CRRrVVTE0gWoQC17aYGCWHYK5vz/n9MPImXJLGRmMjlf8fE9SjJzVyI/isZT2WK11RuO5/PxsNeqFrOpeJQCkZMsNEbw1KhRSDpG4ceJ+/YCXC3aXxPHhvBXD1NIafpwpZ9+mRlgDw0yl1rx8YqLPeVW4trwNzX4Uu1GC/62Cd9q3irjz8tQUvlcCX+UnkFRs/SRf/51HxrUv/aJP8y50CI3d+jr229Bm1o+noS7CTRqcrcn/iDvQqvc/MFet04J2lXa446K1GFA9Ygs/6wDI+qcyfEvBjCkwYXU32+MDwwk/geRDgyqI3wOjuswqrrgXTgowbBK/PMgD+PKc89f17wBl3Mqn08QgCbMm+mwhUDUYt3OOQSkHCP+cYMy4HrGSEd9BKa+V5yYRoBKe7wBsyANzHbfhDICVXkn/0HA2s6ZmkEbaG7ln4Ywf9kfbWauNTP83+9/sHPnjfzfEP8tnbAdrNcPKqb4RCcN1seVtfqLa4xPdPKTdSD/r+JkDPKJHJaDzMrAwCSfyPnFiJFX9TezfLaD12reg2E+keN9zn1fRuJT03yiiGewNX2J0RPm+USfPX8wQURE9wHwP3m/6PdERNS2xkebiMhZWONj4RBR0h4fSBJRwSIfBSJqWOSjQUQji3yMiKI2+UBUZyzig484pazykaKsVT6yVLTKR5GqVvmokqgoMf/2bJCPFvUE/A+UejbHR4+GIj6JHfjnY0hjIV/oQIGPMc3FfIEDFT7mPAMrPteBEh9zzlewxuc4UONjzH4IN/hMB4p8DJmv4Raf4UCVjx7zIPq485s9HCjz0WIexX/eiR2o81FlX0ZiBxr4KHKuY5EDHXxkeQEJ34EWPlLckIznQA8fcX5Q+sR0oImPqCAsZznQxR8JExNvB7r4aIhTMy8HbV18FCSS06fTHdobXXwkZdJzDwe6+AtHqkDROzXEfylQSJRoBA5885clGokiFdeBf/6ySCVTpuM4UOAvy3RShUqmAwX+a6FSrlTLcKDCX5Vq5YrVj6e6+YM9y/WPMb38tXK9ZMNix4Eaf61hIduy2XKgxl9v2UgXijYcKPI3mlbSbbtuTBu/5q9xuXKgyt9qXMq3bpcOlPlN383rbkwHf6d5vUf7vhvTwC+rDDB0vyjzPQYYrI9w2B9isT7GY3+Qyf4ol/VhNvvjfPYHGu2PdFofarU/1mt/sNn+aLf94Xb74/32Fxzsr3jYX3IJwZqP/UUn+6teIVh2s7/uF4KFxxCsfIZg6TUEa78hWHwOw+p3CJbfV9K4/v8P5Xm4bZyiqdcAAAAASUVORK5CYII='
                }
            ]
        }
    },
    components: {
        folder
    }
}
</script>
