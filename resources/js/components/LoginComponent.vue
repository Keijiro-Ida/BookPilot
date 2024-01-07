<template>
    <div>
        <form @submit.prevent="submitLogin">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <p><router-link to="signup">新規登録はこちらから</router-link></p>

    </div>





</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                email: '',
                password: '',
            };
        },
    methods: {
        ...mapActions('auth', ['login']),
            async submitLogin() {
                try {
                    console.log('submitLogin');
                    await this.login({ email: this.email, password: this.password });
                    this.$router.push({ name: 'book.shelf' });
                } catch (error) {
                    console.log('error', error.message);
                    alert('ログインに失敗しました。もう一度お試しください。');
                }
            },
        },
    };

</script>
