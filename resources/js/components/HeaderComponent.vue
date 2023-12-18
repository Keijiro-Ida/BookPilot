<template>
    <div class="container-fluid bg-dark mb-3">
        <div class="container">
            <nav class="navbar navbar-dark">
                <span class="navbar-brand mb-0 h1">Vue Laravel SPA</span>
                <div>
                    <button class="btn btn-success">List</button>
                    <router-link v-bind:to="{name: 'book.search'}">
                        <button class="btn btn-success">本検索</button>
                    </router-link>
                    <router-link v-bind:to="{name: 'book.shelf'}">
                        <button class="btn btn-success">本棚</button>
                    </router-link>
                    <button class="btn btn-success">ADD</button>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {}
</script>
