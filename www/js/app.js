// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput','firebase','ngCordova','lokijs','ngMap','ionic.rating','ngStorage','ngCordova.plugins.nativeStorage'])

.run(function($ionicPlatform,$state, Application) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
       /* if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        */
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        console.log("JE VEUX TESTER");
       var result = null;
        Application.isInitialRun().then(function(value){
            result = value;
            console.log("result1 ",result);
        });

        console.log("result2 ",result);

        var state = "app.accueil";
        if (result) {
            console.log("WEEEEEELLLLLLLLLCCCCCCCOO");
           Application.setInitialRun(false);
           state = "app.login";
        }
        console.log("J'AI TESTE");
        $state.go(state);

     /*   var push = new Ionic.Push({
            "debug":true
        });
        push.register(function(token){
            console.log("Device token:",token.token);
            push.saveToken(token);  // persist the token in the Ionic Platform
        });
        */
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

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
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
               /* controller: function ($timeout) {
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
                template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-share').classList.toggle('on');
                    }, 200);
                }
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
                template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-share').classList.toggle('on');
                    }, 200);
                }
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
                template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-share').classList.toggle('on');
                    }, 200);
                }
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
                template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-share').classList.toggle('on');
                    }, 200);
                }
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
                template: '<button id="fab-share" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-share-alt"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-share').classList.toggle('on');
                    }, 200);
                }
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

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
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
                controller:'InfosCtrl'
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
.state('app.planning', {
        url: '/planning',
        views: {
            'menuContent': {
                templateUrl: 'templates/planning.html',
                controller: 'PlanningCtrl'
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
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
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
