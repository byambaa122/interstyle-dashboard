export default function ({ store, redirect }) {
    // Check authentication
    if (!store.state.auth.loggedIn) {
        return redirect('/login')
    }
}
