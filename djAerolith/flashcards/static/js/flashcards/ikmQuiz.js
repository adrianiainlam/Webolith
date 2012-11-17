var IKMQuizApp = (function(Backbone, $) {
    "use strict";

    Backbone.emulateHTTP = true;

    /* models & collections */
    var IKMRun = Backbone.Model.extend({
        initialize: function() {}
    });

    var IKMRunList = Backbone.Collection.extend({
        model: IKMRun,
        url: '/flashcards/api/ikmruns/'
    });

    var IKMCard = Backbone.Model.extend({});
    var IKMCardList = Backbone.Collection.extend({
        model: IKMCard
    });

    /* views */

    var IKMRunView = Backbone.View.extend({
        // tagName: "div",
        events: {
            "click button.deleteRun": "deleteRun",
            "click button.continueRun": "continueRun",
        },

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        render: function() {
            var json = this.model.toJSON();
            this.$el.html(ich.runTemplate(json));
            return this;
        },

        deleteRun: function() {
            var agree = confirm("Are you sure you wish to delete this run? You will not " +
                                "be able to get it back!");
            if (agree) {
                this.$("button.deleteUser").attr("disabled", "disabled");
                this.model.destroy({
                    wait: true,
                    error: function(model, error) {
                        $("#errorMsg").text(error.responseText).show();
                        self.$("button.deleteRun").removeAttr("disabled");
                    },
                    success: function() {
                        // nothin, just delete
                    }
                });
            }
        },

        continueRun: function() {
            this.trigger('continueRunEvent', this.model);
        }
    });

    var RunsView = Backbone.View.extend({
        events: {
            "click #listStart": "createRun"
        },
        initialize: function() {
            // bind to relevant events in collections
            this.collection.on('add', this.addOneRun, this);
            this.collection.on('reset', this.addAllRuns, this);
            this.collection.on('all', this.render, this);   // for all other events
        },

        createRun: function() {
            var self = this;
            this.collection.create({list: $("#wordList").val()}, {
                success: function() {
                    self.$("#errorMsg").text("").hide();
                },

                error: function(model, error) {
                    if (error.responseText) {
                        self.$("#errorMsg").text(error.responseText).show();
                    } else {
                        self.$("#errorMsg").text(error).show();
                    }
                }
            });
        },

        addOneRun: function(run) {
            var view = new IKMRunView({model: run});
            view.on('continueRunEvent', this.continueRun, this);
            this.$("#runList").append(view.render().$el);
        },

        addAllRuns: function() {
            this.collection.each(this.addOneRun, this);
        },

        render: function() {

        },

        continueRun: function(model) {
            this.$el.hide();
            this.trigger('continueRunEvent', model);
        }
    });

    var CardView = Backbone.View.extend({
        tagName: "div",
        className: "flashcard",
        events: {
            "click .answerButton": "clickedAnswer"
        },
        initialize: function() {

        },
        clickedAnswer: function() {

            this.trigger('answeredCard', this.model);
        },
        render: function() {
            var json = this.model.toJSON();
            this.$el.html(ich.ikmQuizTemplate(json));
            return this;
        }
    });

    var CardsView = Backbone.View.extend({
        initialize: function() {
            this.collection.on('add', this.addCard, this);
        },

        addCard: function(card) {
            var view = new CardView({model: card});
            view.on('answeredCard', this.answeredCard, this);
            this.$("#cardList").prepend(view.render().$el);

        },

        answeredCard: function() {
            // go to the next card
            this.collection.create()

        },

        fetchCards: function(runModel) {
            $.get('/api/')
        }
    });

    /* handle CSRF */
    $('html').ajaxSend(function (event, xhr, settings) {
        function getCookie(name) {
            var cookieValue = null,
                cookies,
                cookie,
                i;
            if (document.cookie && document.cookie !== '') {
                cookies = document.cookie.split(';');
                for (i = 0; i < cookies.length; i += 1) {
                    cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    });

    return {
        init: function(ikmRunList) {
            var RunList = new IKMRunList();
            var RunsApp = new RunsView({collection: RunList, el: $("#mainDiv")});
            RunList.reset(ikmRunList);

            var CardList = new IKMCardList();
            var CardsApp = new CardsView({collection: CardList, el: $("#quizDiv")});

            // var Dispatcher = _.clone(Backbone.Events);

            RunsApp.on('continueRunEvent', function(model) {
                console.log('continueRunEvent triggered by model', model);
                // CardList.add({'question': 'ACHIMNOR',
                //       'answers': [{'answer': 'HARMONIC',
                //                   'definition': 'pertaining to harmony'},
                //                   {'answer': 'OMNIARCH',
                //                   'definition': 'better than a tetrarch'}]
                //     });
                CardsApp.fetchCards(model);
            });

        }
    }

}(Backbone, jQuery));