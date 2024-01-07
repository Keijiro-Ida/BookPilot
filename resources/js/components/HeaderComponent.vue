<template>
    <div class="container-fluid bg-dark mb-3">
        <div class="container">
            <nav class="navbar navbar-dark">
                <span class="navbar-brand mb-0 h1">Book Pilot</span>
                <div>
                    <button class="btn btn-success">List</button>
                    <router-link v-bind:to="{name: 'book.search'}">
                        <button class="btn btn-success">本検索</button>
                    </router-link>
                    <router-link v-bind:to="{name: 'book.shelf'}">
                        <button class="btn btn-success">本棚</button>
                    </router-link>
                    <button class="btn btn-success" @click="logout">ログアウト</button>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                this.$store.dispatch('auth/logout');
                this.$router.push({name: 'login'});
            }
        }
    }
</script>
