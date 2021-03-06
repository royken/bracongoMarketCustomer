// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'firebase', 'ngCordova', 'ngMap', 'ionic.rating', 'ngCordova.plugins.nativeStorage', 'youtube-embed', 'ngSanitize'])

.run(function($ionicPlatform, $state, Application, $cordovaBadge) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        /*      $ionicPush.register({
            canShowAlert: true, //Can pushes show an alert on your screen?
            canSetBadge: true, //Can pushes update app icon badges?
            canPlaySound: true, //Can notifications play a sound?
            canRunActionsOnWake: true, //Can run actions outside the app,
            onNotification: function(notification) {
                // Handle new push notifications here

                $cordovaBadge.increase().then(function() {
                    // You have permission, badge increased.
                    console.log("increased");
                }, function(err) {
                    // You do not have permission.
                });
                console.log(notification);

                return true;
            }
        }).then(function(t) {
            return $ionicPush.saveToken(t);
        }).then(function(t) {
            console.log('Token saved:', t.token);
        });
*/

        var notificationOpenedCallback = function(jsonData) {
            // console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        var notificationReceivedCallback = function(jsonData) {
            //  console.log('notificationReceivedCallback: ' + JSON.stringify(jsonData));
            // console.log('Payload : ' + jsonData.payload);
            // console.log('Menu : ' + jsonData.payload.additionalData.menu);
            var menu = jsonData.payload.additionalData.menu;
            if (menu === 'events') {
                var badge = 0
                Application.getEventBadge().then(function(value) {
                    badge = value
                    Application.setEventBadge(badge + 1)
                }, function(error) {
                    Application.setEventBadge(badge + 1)
                })
            }
            if (menu === 'campagnes') {
                var badge = 0
                Application.getCampagneBadge().then(function(value) {
                    badge = value
                    Application.setCampagneBadge(badge + 1)
                }, function(error) {
                    Application.setCampagneBadge(badge + 1)
                })
            }
            if (menu === 'concours') {
                var badge = 0
                Application.getConcoursBadge().then(function(value) {
                    badge = value
                    Application.setConcoursBadge(badge + 1)
                }, function(error) {
                    Application.setConcoursBadge(badge + 1)
                })
            }
            $cordovaBadge.increase().then(function() {
                // You have permission, badge increased.
            }, function(err) {
                // You do not have permission.
            })
        };

        /*     window.plugins.OneSignal
                 .startInit("35a7d432-18c9-4a1a-b778-f1f178267270")
                 .handleNotificationOpened(notificationOpenedCallback)
                 .handleNotificationReceived(notificationReceivedCallback)
                 .endInit();
         */

        var result = null;
        Application.isInitialRun().then(function(value) {
            result = value;
            console.log("result1 ", result);
        });
        var state = "app.accueil";
        if (result === "true") {
            state = "app.login";
        }

        $state.go(state);
        if (navigator && navigator.splashscreen) {
            navigator.splashscreen.hide();
        }

    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider, $httpProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
    $httpProvider.defaults.useXDomain = true;
    /* $ionicCloudProvider.init({
        "core": {
            "app_id": "da4cdfc4"
        },
        "push": {
            "sender_id": "513360151004",
            "pluginConfig": {
                "ios": {
                    "badge": true,
                    "sound": true
                },
                "android": {
                    "iconColor": "#343434"
                }
            }
        }
    });
*/

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
            url: '/activity',
            views: {
                'menuContent': {
                    templateUrl: 'templates/activity.html',
                    controller: 'ActivityCtrl'
                },
                'fabContent': {
                    /* template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                     controller: function ($timeout) {
                         $timeout(function () {
                             document.getElementById('fab-activity').classList.toggle('on');
                         }, 200);
                     }*/
                }
            }
        })
        .state('app.listEvent', {
            url: '/listEvent',
            views: {
                'menuContent': {
                    templateUrl: 'templates/listEvents.html',
                    controller: 'EventsCtrl'
                }
            }
        })

    .state('app.itemEvent', {
            url: '/event/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/eventDetail.html',
                    controller: 'EventCtrl'
                },
                'fabContent': {
                    /*  template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                      controller: function ($timeout) {
                          $timeout(function () {
                              document.getElementById('fab-share').classList.toggle('on');
                          }, 200);
                      }*/
                }
            }
        })
        .state('app.listCampagnes', {
            url: '/listCampagnes',
            views: {
                'menuContent': {
                    templateUrl: 'templates/listCampagnes.html',
                    controller: 'CampagnesCtrl'
                }
            }
        })

    .state('app.itemCampagne', {
            url: '/campagne/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/campagneDetail.html',
                    controller: 'CampagneCtrl'
                },
                'fabContent': {
                    /* template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                     controller: function ($timeout) {
                         $timeout(function () {
                             document.getElementById('fab-share').classList.toggle('on');
                         }, 200);
                     }*/
                }
            }
        })
        .state('app.listJeux', {
            url: '/listJeux',
            views: {
                'menuContent': {
                    templateUrl: 'templates/listJeux.html',
                    controller: 'JeuxCtrl'
                }
            }
        })

    .state('app.itemJeux', {
            url: '/jeux/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/jeuxDetail.html',
                    controller: 'JeuCtrl'
                },
                'fabContent': {
                    /*   template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                       controller: function ($timeout) {
                           $timeout(function () {
                               document.getElementById('fab-share').classList.toggle('on');
                           }, 200);
                       }*/
                }
            }
        })
        .state('app.listLoisirs', {
            url: '/listLoisirs',
            views: {
                'menuContent': {
                    templateUrl: 'templates/listLoisirs.html',
                    controller: 'LoisirsCtrl'
                }
            }
        })

    .state('app.itemLoisir', {
            url: '/loisir/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/loisirDetail.html',
                    controller: 'LoisirCtrl'
                },
                'fabContent': {
                    /*   template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                       controller: function ($timeout) {
                           $timeout(function () {
                               document.getElementById('fab-share').classList.toggle('on');
                           }, 200);
                       }*/
                }
            }
        })
        .state('app.listEmplois', {
            url: '/emplois',
            views: {
                'menuContent': {
                    templateUrl: 'templates/listEmplois.html',
                    controller: 'EmploisCtrl'
                }
            }
        })
        .state('app.itemEmploi', {
            url: '/emploi/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/emploiDetail.html',
                    controller: 'EmploiCtrl'
                },
                'fabContent': {
                    /* template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                     controller: function ($timeout) {
                         $timeout(function () {
                             document.getElementById('fab-share').classList.toggle('on');
                         }, 200);
                     }*/
                }
            }
        })
        .state('app.about', {
            url: '/about',
            views: {
                'menuContent': {
                    templateUrl: 'templates/about.html',
                    controller: 'AboutCtrl'
                }
            }
        })
        .state('app.offline', {
            url: '/offline',
            views: {
                'menuContent': {
                    templateUrl: 'templates/offline.html',
                    controller: 'OfflineCtrl'
                }
            }
        })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function($timeout) {
                    $timeout(function() {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.gallery', {
            url: '/gallery/:level',
            views: {
                'menuContent': {
                    templateUrl: 'templates/gallery.html',
                    controller: 'GalleryCtrl'
                }
            }
        })
        .state('app.game', {
            url: '/gallery/game/:pack/:level',
            views: {
                'menuContent': {
                    templateUrl: 'templates/game.html',
                    controller: 'GameCtrl'
                },
                'fabContent': {
                    template: '<button id="seeView" class="hide button button-fab button-fab-top-right button-energized-900 on" ><i class="icon ion-eye"></i></button>',
                    controller: function($timeout) {
                        $timeout(function() {
                            $('#seeView').show();
                        }, 600);
                    }
                }
            }
        })

    .state('app.login', {
            cache: false,
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.accueil', {
            url: '/accueil',
            views: {
                'menuContent': {
                    templateUrl: 'templates/test.html',
                    controller: 'AccueilCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })

    .state('app.infos', {
        url: '/infos',
        views: {
            'menuContent': {
                templateUrl: 'templates/infos.html',
                controller: 'InfosCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.contact', {
            url: '/contact',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contact.html',
                    controller: 'ContactCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.nousJoindre', {
            url: '/joindre',
            views: {
                'menuContent': {
                    templateUrl: 'templates/joindre.html',
                    controller: 'JoindreCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.barProche', {
            url: '/barProche',
            views: {
                'menuContent': {
                    templateUrl: 'templates/pdv_proche.html',
                    controller: 'ContactCtrl'
                },
                'fabContent': {
                    template: ''

                }
            }
        })
        .state('app.barProcheMap', {
            url: '/barProcheMap',
            views: {
                'menuContent': {
                    templateUrl: 'templates/pdv_proche_map.html',
                    controller: 'MapCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.produits', {
            url: '/produits',
            views: {
                'menuContent': {
                    templateUrl: 'templates/produits.html',
                    controller: 'ProduitCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.produitList', {
            url: '/produits/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/produitList.html',
                    controller: 'ProduitListCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.cleCategorie', {
            url: '/cleCategorie',
            views: {
                'menuContent': {
                    templateUrl: 'templates/cleCategorie.html',
                    controller: 'ChateauCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.categorieList', {
            url: '/cleCategorie/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/categorieDetail.html',
                    controller: 'CategorieListCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.vinDetail', {
            url: '/vin/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/detailVin.html',
                    controller: 'VinCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.serviceFete', {
            url: '/serviceFete',
            views: {
                'menuContent': {
                    templateUrl: 'templates/serviceFete.html',
                    controller: 'ServiceFeteCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.contactChateau', {
            url: '/contactChateau',
            views: {
                'menuContent': {
                    templateUrl: 'templates/chateauPosition.html',
                    controller: 'ChateauPositionCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.simulateur', {
            url: '/simulateur',
            views: {
                'menuContent': {
                    templateUrl: 'templates/proforma.html',
                    controller: 'SimulateurCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.realite', {
            url: '/realite',
            views: {
                'menuContent': {
                    templateUrl: 'templates/realitePresentation.html',
                    controller: 'RealiteCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/profile.html',
                    controller: 'ProfileCtrl'
                },
                'fabContent': {
                    /* template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                     controller: function ($timeout) {
                         $timeout(function () {
                             document.getElementById('fab-profile').classList.toggle('on');
                         }, 800);
                     }*/
                }
            }
        });

    /*  $ionicAppProvider.identify({
      app_id: 'd9c83c08',
      api_key: '5280467be98f98efd3052407cb772fa98f3a58e96c2543ec',
      dev_push: true
    });
      */

    // if none of the above states are matched, use this as the fallback
    //  $urlRouterProvider.otherwise('/app/login');
}).constant('ApiEndpoint', {
    url: 'http://41.223.104.197:8080/pdv/api'
});