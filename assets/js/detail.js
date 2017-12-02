var router = new VueRouter({
    mode: 'history',
    routes: []
});

var episodes_obj = new Vue({
    router,
    el: '.episodes-wrapper',
    data: {
        apiBaseUrlEpisodes: 'http://api.tvmaze.com/shows/',
        show_info: [],
        episodes: []
    },
    methods: {
        fetch_episodes: function (query) {
            var self = this;
            if (query) {
                axios.get(self.apiBaseUrlEpisodes + query + '?embed=episodes')
                    .then(function (response) {
                        self.show_info = response.data;
                        self.episodes = response.data._embedded.episodes;
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            }
        }
    },
    created: function () {
        show_id = router.history.router.history.current.query.show;
        if (show_id != '' && show_id != undefined) {
            this.fetch_episodes(show_id);
        }
        else {
            console.error('No Show ID provided');
        }
    }
});