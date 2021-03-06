/* global angular, document, window */
'use strict'

angular.module('starter.controllers', ['ionic', 'firebase', 'ionic.cloud', 'ngCordova'])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $state, $ionicPopover, $timeout, $ionicPlatform, $cordovaBadge, ApiEndpoint, Application) {
    // Form data for the login modal
    $scope.loginData = {}
    $scope.isExpanded = false
    $scope.hasHeaderFabLeft = false
    $scope.hasHeaderFabRight = false
    var vm = this

    $ionicPlatform.ready(function() {
        //   $cordovaBadge.promptForPermission()
    })


    var navIcons = document.getElementsByClassName('ion-navicon')
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active')
        })
    }

    // //////////////////////////////////////
    // Layout Methods
    // //////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none'
    }

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block'
    }

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content')
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header')
            }
        }
    }

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool
    }

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false
        var hasHeaderFabRight = false

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true
                break
            case 'right':
                hasHeaderFabRight = true
                break
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft
        $scope.hasHeaderFabRight = hasHeaderFabRight
    }

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content')
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header')
            }
        }
    }

    $scope.hideHeader = function() {
        $scope.hideNavBar()
        $scope.noHeader()
    }

    $scope.showHeader = function() {
        $scope.showNavBar()
        $scope.hasHeader()
    }

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab')
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove()
        }
    }
})

.controller('AccueilCtrl', function($scope, $state, $ionicSlideBoxDelegate, $timeout, $stateParams, ionicMaterialInk, $cordovaBadge, Application, serviceFactory, $cordovaToast, Connectivity) {
    $scope.$parent.showHeader()
    $scope.$parent.clearFabs()
    $scope.isExpanded = false
    $scope.$parent.setExpanded(false)
    $scope.$parent.setHeaderFab(false)
    $scope.$parent.setHeaderFab('right')
    $scope.$parent.clearFabs();

    // cordova.plugins.firebase.analytics.setEnabled(true);
    //  cordova.plugins.firebase.analytics.setCurrentScreen("Accueil");



    Application.getEventBadge().then(function(value) {
        $scope.badgeEvent = value
    })

    //  $scope.badgeEvent = 1

    Application.getCampagneBadge().then(function(value) {
        $scope.badgeCampagne = value
    })

    //  $scope.badgeCampagne  = 1

    Application.getConcoursBadge().then(function(value) {
            $scope.badgeConcours = value
        })
        /*
            $cordovaBadge.set($scope.badgeEvent + $scope.badgeCampagne + $scope.badgeConcours).then(function() {
                // You have permission, badge set.
            }, function(err) {
                // You do not have permission.
            })
        */


    // $scope.badgeConcours  = 1

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next()
    }

    $scope.products = null;
    // $scope.products = serviceFactory.getAllAccueilImages()

    if (Connectivity.ifOffline()) {
        $scope.products = [{ titre: 'RUMBA, AU RYTHME DE CHEZ NOUS!', image: 'img/accueil/rumba.jpg' }, { titre: "MEDAILLE YA MUTUYA", image: 'img/accueil/nkoyi.jpg' }];
    } else {
        serviceFactory.getAllAccueilImages().$loaded().then(function(data) {
            $scope.products = data;
            $ionicSlideBoxDelegate.update();
        })
    }


    $scope.eventsPage = function() {
        $state.go('app.listEvent')
    }
    $scope.campagnesPage = function() {
        $state.go('app.listCampagnes')
    }
    $scope.jeuxPage = function() {
        //$cordovaToast.show('Coming soon!!! ...', 'long', 'bottom').then(function(success) {}, function(error) {})
        $state.go('app.realite');
        //   $state.go('app.listJeux');        
    }
    $scope.loisirsPage = function() {
        $state.go('app.listLoisirs')
    }
    $scope.emploisPage = function() {
        $state.go('app.listEmplois')
    }
    $scope.aboutPage = function() {
        $state.go('app.about')
    }
    $scope.fete = function() {
        $state.go('app.serviceFete')
    }
    $scope.barProche = function() {
        $state.go('app.barProcheMap')
    }
    $scope.animation = function() {
        $state.go('app.produits')
    }
    $scope.chateaux = function() {
        $state.go('app.cleCategorie')
    }
    $scope.game = function() {
        $state.go('app.profile')
    }
    $scope.contact = function() {
        $state.go('app.nousJoindre')
    }
    $scope.infos = function() {
        $state.go('app.infos')
    }

    /*      $cordovaBadge.clear().then(function() {
                  // You have permission, badge cleared.
              }, function(err) {
                  // You do not have permission.
          })
*/
    ionicMaterialInk.displayEffect()
})

.controller('LoginCtrl', function($scope, $timeout, $state, $ionicHistory, $stateParams, ionicMaterialInk, Application, firebase, Connectivity, $cordovaToast) {
        $scope.$parent.clearFabs()
        $scope.loginData = {}
        $scope.isExpanded = false
        $scope.hasHeaderFabLeft = false
        $scope.hasHeaderFabRight = false
        $timeout(function() {
            $scope.$parent.hideHeader()
        }, 0)
        ionicMaterialInk.displayEffect()
        Application.setInitialRun(true);

        $scope.accueil = function() {
            var refEvent = firebase.database().ref().child('users')
            var objet = {
                nom: 'anonyme',
                mail: 'anonyme',
                login: 'anonyme',
                date: new Date()
            }
            Application.setInitialRun(false)
            refEvent.push(objet)
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            })
            $state.go('app.accueil')
        }

        $scope.login = function() {
            // console.log("credentials",$scope.loginData)

            if (Connectivity.ifOffline()) {
                $cordovaToast.show('Pas de connexion internet, veuillez essayer plus tard', 'long', 'bottom').then(function(success) {}, function(error) {})
            } else {
                Application.registerUser($scope.loginData.login, $scope.loginData.mail, $scope.loginData.nom)
                var refUsers = firebase.database().ref().child('users')
                var objet = {
                    nom: $scope.loginData.nom,
                    mail: $scope.loginData.mail,
                    login: $scope.loginData.login,
                    date: new Date()
                }
                Application.setInitialRun(false)
                refUsers.push(objet)
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                })
                $state.go('app.accueil')
            }
        }
    })
    .controller('RealiteCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, Application) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false)

        $timeout(function() {
            $scope.isExpanded = true
            $scope.$parent.setExpanded(true)
        }, 300)
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Realité");

        // Set Motion
        //  ionicMaterialMotion.fadeSlideInRight()

        // Set Ink
        ionicMaterialInk.displayEffect()
    })

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader()
    $scope.$parent.clearFabs()
    $scope.$parent.setHeaderFab('left')

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
    }, 300)

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight()

    // Set Ink
    ionicMaterialInk.displayEffect()
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader()
    $scope.$parent.clearFabs()
    $scope.isExpanded = false
    $scope.$parent.setExpanded(false)
    $scope.$parent.setHeaderFab(false)

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        })
    }, 300)

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        })
    }, 700)

    // Set Ink
    ionicMaterialInk.displayEffect()
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory) {
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            })
        }, 200)

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('EventsCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, Connectivity, Application, $cordovaToast) {
        $scope.events = []
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.clearFabs()

        Application.setEventBadge(0)

        //    cordova.plugins.firebase.analytics.setEnabled(true);
        //    cordova.plugins.firebase.analytics.setCurrentScreen("Evènements");
        //$cordovaGoogleAnalytics.trackView('Evènements');
        //$cordovaGoogleAnalytics.setAllowIDFACollection(true);

        if (Connectivity.ifOffline()) {
            $cordovaToast.show('Pas de connexion internet, veuillez essayer plus tard', 'long', 'bottom').then(function(success) {}, function(error) {})
            $state.go('app.accueil')
        } else {
            show()
            serviceFactory.getAllEvent().$loaded().then(function(data) {
                $scope.events = data.reverse();
                hide()
            })
        }

        function show() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                animation: 'fade-in'
            })
        }

        function hide() {
            $ionicLoading.hide()
        }


        $scope.detailEvent = function(id) {
            $state.go('app.itemEvent', { id: id })
        }

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('EventCtrl', function($scope, $stateParams, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, Application) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false
        $scope.$parent.setExpanded(false)
        $scope.$parent.setHeaderFab(false)
        $scope.event = null
        var eventId = $stateParams.id;

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)

        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.event = serviceFactory.getOneEvent(eventId);
        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen('EventDetail' + $scope.event.titre);


        function getContent() {
            return $scope.event.titre + "\n" + $scope.event.description;
        }
        $scope.twitterShare = function() {
            window.plugins.socialsharing.shareViaTwitter(getContent(), $scope.event.image, null);
        }
        $scope.facebookShare = function() {
            console.log("L'images ", $scope.event.image);
            window.plugins.socialsharing.shareViaFacebook(getContent(), $scope.event.image, null, function() { console.log('share ok') }, function(errormsg) { alert(errormsg) })
        }

        $scope.whatsappShare = function() {
            console.log("L'images ", $scope.event.image);
            window.plugins.socialsharing.shareViaWhatsApp(getContent(), $scope.event.image, $scope.event.image, function() { console.log('share ok') }, function(errormsg) { alert(errormsg) });
        }

        $scope.otherShare = function() {
            //  var imageUrl = decodeURIComponent($scope.event.image);
            var options = {
                message: $scope.event.titre + "\n" + $scope.event.date, // not supported on some apps (Facebook, Instagram)
                subject: $scope.event.titre, // fi. for email : Normalement $scope.event.description
                files: [$scope.event.image], // an array of filenames either locally or remotely
                url: '',
                chooserTitle: 'Partager via' // Android only, you can override the default share sheet title
            }

            console.log("options", options);
            var onSuccess = function(result) {

                console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
            }

            var onError = function(msg) {
                console.log("Sharing failed with message: " + msg);
            }

            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        }


        $ionicLoading.hide()

        // Set Ink
        ionicMaterialInk.displayEffect()
    })
    .controller('CampagnesCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, Application, $cordovaToast, Connectivity) {
        $scope.campagnes = []
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.$parent.clearFabs()
            //$cordovaGoogleAnalytics.debugMode();
            //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Campagnes");


        if (Connectivity.ifOffline()) {
            $cordovaToast.show('Pas de connexion internet, veuillez essayer plus tard', 'long', 'bottom').then(function(success) {}, function(error) {})
            $state.go('app.accueil')
        } else {
            show()
            serviceFactory.getAllCampagnes().$loaded().then(function(data) {
                $scope.campagnes = data.reverse();
                hide()
            })
        }

        Application.setCampagneBadge(0)

        function show() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                animation: 'fade-in'
            })
        }

        function hide() {
            $ionicLoading.hide()
        }



        $scope.detailCampagne = function(id) {
            $state.go('app.itemCampagne', { id: id })
        }

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('CampagneCtrl', function($scope, $stateParams, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false
        $scope.$parent.setExpanded(false)
        $scope.$parent.setHeaderFab(false)
        $scope.campagne = null
        var campagneId = $stateParams.id
        console.log("L'id de l'event", $stateParams.id)
        console.log("L'id de l'event", $stateParams)
        console.log(campagneId)

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)

        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.campagne = serviceFactory.getOneCampagne(campagneId)
            //console.log('campagnes', $scope.campagne.titre)
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen('CampagneDetail' + $scope.campagne.titre);
        $ionicLoading.hide()

        // Set Ink
        ionicMaterialInk.displayEffect()
    })
    .controller('JeuxCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, Application, $cordovaToast, Connectivity) {
        $scope.jeux = []
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.$parent.clearFabs()

        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Concours");
        // $cordovaGoogleAnalytics.trackView('Concours');
        //$cordovaGoogleAnalytics.setAllowIDFACollection(true);

        if (Connectivity.ifOffline()) {
            $cordovaToast.show('Pas de connexion internet, veuillez essayer plus tard', 'long', 'bottom').then(function(success) {}, function(error) {})
            $state.go('app.accueil')
        } else {
            show()
            serviceFactory.getAllJeux().$loaded().then(function(data) {
                $scope.jeux = data.reverse();
                hide()
            })
        }

        Application.setConcoursBadge(0)

        function show() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                animation: 'fade-in'
            })
        }

        function hide() {
            $ionicLoading.hide()
        }



        $scope.detailJeux = function(id) {
            $state.go('app.itemJeux', { id: id })
        }

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('JeuCtrl', function($scope, $stateParams, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, Application) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false
        $scope.$parent.setExpanded(false)
        $scope.$parent.setHeaderFab(false)
        $scope.jeu = null
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Concours Détails");
        // $cordovaGoogleAnalytics.debugMode();
        // $cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        /* Application.getName().then(function(value) {
                 $scope.name = value
                     // $cordovaGoogleAnalytics.setUserId($scope.name);
             }, function(error) {
                 // $cordovaGoogleAnalytics.setUserId('Anonyme');
             })
         */
        //$cordovaGoogleAnalytics.trackView('Concours Détails');
        //$cordovaGoogleAnalytics.setAllowIDFACollection(true);

        var jeuId = $stateParams.id
            // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)

        $scope.jeu = serviceFactory.getOneJeux(jeuId)
        console.log('jeu', $scope.jeu.titre)
        console.log('lien', $scope.jeu.lien)

        // Set Ink
        ionicMaterialInk.displayEffect()
    })
    .controller('EmploisCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, $cordovaToast, Connectivity, Application) {
        $scope.emplois = []
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.$parent.clearFabs()
        $scope.load = 0
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Emplois");
        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        /*Application.getName().then(function(value) {
                $scope.name = value
                    //$cordovaGoogleAnalytics.setUserId($scope.name);
            }, function(error) {
                //$cordovaGoogleAnalytics.setUserId('Anonyme');
            })
        */
        // $cordovaGoogleAnalytics.trackView('Emplois');
        //$cordovaGoogleAnalytics.setAllowIDFACollection(true);

        if (Connectivity.ifOffline()) {
            $cordovaToast.show('Pas de connexion internet, veuillez essayer plus tard', 'long', 'bottom').then(function(success) {}, function(error) {})
            $state.go('app.accueil')
        } else {
            show()
            serviceFactory.getAllEmplois().$loaded().then(function(data) {
                $scope.emplois = data.reverse();
                hide()
                $scope.load = 1
            })
        }

        function show() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                animation: 'fade-in'
            })
        }

        function hide() {
            $ionicLoading.hide()
        }


        $scope.detailEmploi = function(id) {
            $state.go('app.itemEmploi', { id: id })
        }

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('EmploiCtrl', function($scope, $stateParams, $timeout, $ionicLoading, $ionicModal, ionicMaterialMotion, ionicMaterialInk, serviceFactory) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false
        $scope.$parent.setExpanded(false)
        $scope.$parent.setHeaderFab(false)
        $scope.emploi = null
        var emploiId = $stateParams.id

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)

        $scope.emploi = serviceFactory.getOneEmploi(emploiId)
        $ionicLoading.hide()
        $ionicModal.fromTemplateUrl('templates/postuler.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
        })
        $scope.openModal = function() {
            $scope.modal.show()
        }
        $scope.closeModal = function() {
            $scope.modal.hide()
        }

        $scope.envoyerMail = function(nom, prenom, mail, tel, linkedin) {
            if (window.plugins && window.plugins.emailComposer) {
                window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                            console.log('Response -> ' + result)
                        },
                        "Réponse Offre d'emploi ref: " + $scope.emploi.reference, // Subject
                        ' Nom : ' + nom + '\n Prenom : ' + prenom + '\n Email : ' + mail + '\n Téléphone : ' + tel + '\n LinkedIn : ' + linkedin, // Body
                        ['recrutement@bracongo.cd'], // To
                        null, // CC
                        null, // BCC
                        false, // isHTML
                        null, // Attachments
                        null) // Attachment Data
            }
            $scope.closeModal()
        }

        // Set Ink
        ionicMaterialInk.displayEffect()
    })

.controller('ChateauCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, $cordovaToast, Connectivity, Application) {
        $scope.categories = []

        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.$parent.clearFabs()
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Châteaux");
        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        /*Application.getName().then(function(value) {
                $scope.name = value
                    //$cordovaGoogleAnalytics.setUserId($scope.name);
            }, function(error) {
                // $cordovaGoogleAnalytics.setUserId('Anonyme');
            })
        */
        //$cordovaGoogleAnalytics.trackView('Châteaux');
        //$cordovaGoogleAnalytics.setAllowIDFACollection(true);

        if (Connectivity.ifOffline()) {
            $cordovaToast.show('Pas de connexion internet, veuillez essayer plus tard', 'long', 'bottom').then(function(success) {}, function(error) {})
            $state.go('app.accueil')
        } else {
            show()
            serviceFactory.getAllCategories().$loaded().then(function(data) {
                $scope.categories = data
                hide()
            })
        }

        $scope.pageMap = function() {
            $state.go('app.contactChateau')
        }

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next()
        }

        // $scope.images = serviceFactory.getAllChateauxImages()
        $scope.images = [{ title: 'SKOL MOLANGI YA MBOKA', image: 'img/chateau/chateau1.jpg' }, { title: "D'JINO EXPLOSION FRUITEE", image: 'img/chateau/chateau2.jpg' }, { title: 'JAZZ KIFF', image: 'img/chateau/chateau3.jpg' }, { title: 'SKOL MOLANGI YA MBOKA', image: 'img/chateau/chateau4.jpg' }, { title: 'SKOL MOLANGI YA MBOKA', image: 'img/chateau/chateau5.jpg' }, { title: 'SKOL MOLANGI YA MBOKA', image: 'img/chateau/chateau6.jpg' }, { title: 'SKOL MOLANGI YA MBOKA', image: 'img/chateau/chateau7.jpg' }]

        function show() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                animation: 'fade-in'
            })
        }

        function hide() {
            $ionicLoading.hide()
        }



        $scope.detailCat = function(id) {
            $state.go('app.categorieList', { id: id })
        }

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('CategorieListCtrl', function($scope, $stateParams, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false
        $scope.$parent.setExpanded(false)
        $scope.$parent.setHeaderFab(false)
        $scope.$parent.clearFabs()
        var categorieId = $stateParams.id
        $scope.zoomMin = 1
        $scope.cat = null
        $ionicLoading.show({
            template: '<div class="icon ion-loading-a"></div> Loading... ',
            animation: 'fade-in',
            showBackdrop: true
        })
        $scope.cat = serviceFactory.getOneCategorie($stateParams.id)
        $scope.produits = serviceFactory.getCategorieProductList($scope.cat.code)

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)

        $scope.detailVin = function(id) {
            state.go('app.vinDetail', { id: id })
        }

        $scope.showImages = function(index) {
            $scope.activeSlide = index
            $scope.showModal('templates/gallery-zoomview-chateau.html')
        }

        $scope.showModal = function(templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal
                $scope.modal.show()
            })
        }

        $scope.closeModal = function() {
            $scope.modal.hide()
            $scope.modal.remove()
        }

        $scope.updateSlideStatus = function(slide) {
            var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom
            if (zoomFactor == $scope.zoomMin) {
                $ionicSlideBoxDelegate.enableSlide(true)
            } else {
                $ionicSlideBoxDelegate.enableSlide(false)
            }
        }


        $ionicLoading.hide()

        // Set Ink
        ionicMaterialInk.displayEffect()
    })
    .controller('ChateauPositionCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk) {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.$parent.clearFabs()
        $ionicLoading.hide()

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('VinCtrl', function($scope, $stateParams, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false
        $scope.$parent.setExpanded(false)
        $scope.$parent.setHeaderFab(false)
        $scope.vin = null
        var vinId = $stateParams.id
        $scope.$parent.clearFabs()
            // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)

        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.vin = serviceFactory.getOneVin(vinId)
        $ionicLoading.hide()

        // Set Ink
        ionicMaterialInk.displayEffect()
    })
    .controller('ProduitCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, $cordovaToast, Connectivity, Application) {
        $scope.emplois = []
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.$parent.clearFabs()
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Nos Produits");
        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        /*Application.getName().then(function(value) {
                $scope.name = value
                    //$cordovaGoogleAnalytics.setUserId($scope.name);
            }, function(error) {
                //$cordovaGoogleAnalytics.setUserId('Anonyme');
            })
        */
        //$cordovaGoogleAnalytics.trackView('Nos ¨Produist');

        //$cordovaGoogleAnalytics.trackView('Nos ¨Produist');


        if (Connectivity.ifOffline()) {
            $cordovaToast.show('Pas de connexion internet, veuillez essayer plus tard', 'long', 'bottom').then(function(success) {}, function(error) {})
            $state.go('app.accueil')
        } else {
            show()
            serviceFactory.getAllCategoriesBrac().$loaded().then(function(data) {
                $scope.categories = data
                hide()
            })
        }

        function show() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                animation: 'fade-in'
            })
        }

        function hide() {
            $ionicLoading.hide()
        }



        $scope.listProduit = function(id) {
            $state.go('app.produitList', { id: id })
        }

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })

.controller('ProduitListCtrl', function($scope, $stateParams, $state, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
    // Set Header
    $scope.$parent.showHeader()
    $scope.$parent.clearFabs()
    $scope.isExpanded = false
    $scope.$parent.setExpanded(false)
    $scope.$parent.setHeaderFab(false)
    $scope.categorie = null
    $scope.zoomMin = 1
    var catId = $stateParams.id
    $scope.$parent.clearFabs()
        // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        })
    }, 300)

    $scope.categorie = serviceFactory.getOneCategorieBrac(catId)
        // console.log("catttttttt",$scope.categorie)
    $scope.produits = serviceFactory.getCategorieBracProductList($scope.categorie.code)
    $scope.showImages = function(index) {
        $scope.activeSlide = index
        $scope.showModal('templates/gallery-zoomview-brac.html')
    }

    $scope.gotoCampagne = function() {
        $scope.closeModal()
        $state.go('app.listCampagnes')
    }

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal
            $scope.modal.show()
        })
    }


    $scope.closeModal = function() {
        $scope.modal.hide()
        $scope.modal.remove()
    }


    $scope.updateSlideStatus = function(slide) {
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom
        if (zoomFactor == $scope.zoomMin) {
            $ionicSlideBoxDelegate.enableSlide(true)
        } else {
            $ionicSlideBoxDelegate.enableSlide(false)
        }
    }

    // Set Ink
    ionicMaterialInk.displayEffect()
})

.controller('MapCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory, GoogleMaps, $cordovaToast, Connectivity, Application) {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("PDV Proches");
        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        /*Application.getName().then(function(value) {
                $scope.name = value
                    //$cordovaGoogleAnalytics.setUserId($scope.name);
            }, function(error) {
                //$cordovaGoogleAnalytics.setUserId('Anonyme');
            })
        */
        //$cordovaGoogleAnalytics.trackView('PDV Proches');

        if (Connectivity.ifOffline()) {
            $cordovaToast.show('Pas de connexion internet, veuillez essayer plus tard', 'long', 'bottom').then(function(success) {}, function(error) {})
            $state.go('app.accueil')
        } else {
            GoogleMaps.init()
        }

        $ionicLoading.hide()



        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('JoindreCtrl', function($scope, $state, ionicMaterialMotion, ionicMaterialInk) {
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')

        $scope.gotoContact = function() {
            $state.go('app.contact')
        }

        $scope.gotoInfos = function() {
            $state.go('app.infos')
        }

        $scope.gotoJobs = function() {
                $state.go('app.listEmplois')
            }
            // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('ContactCtrl', function($scope, $state, $stateParams, $http, $timeout, $ionicPopup, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, $cordovaGeolocation, serviceFactory, Application) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false
        $scope.$parent.setExpanded(false)
        $scope.$parent.setHeaderFab(false)
        $scope.$parent.clearFabs()
        $scope.emailSend = 'rdsid@bracongo.cd'
        $scope.rating = {}
        $scope.rating.rate = 3
        $scope.rating.max = 5
        $scope.pdvs = [];
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Nous Contacter");
        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        /*Application.getName().then(function(value) {
                $scope.name = value
                    //$cordovaGoogleAnalytics.setUserId($scope.name);
            }, function(error) {
                $cordovaGoogleAnalytics.setUserId('Anonyme');
            })
        */
        //$cordovaGoogleAnalytics.trackView('Nous Contacter');

        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');


        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)

        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $ionicLoading.hide()

        $scope.toto = function() {
            console.log('helooooooooo')
        }

        $scope.showMap = function() {
            $state.go('app.barProcheMap')
        }

        $scope.$on('mapInitialized', function(event, map) {
            $scope.map = map
        })



        var options = { timeout: 10000, enableHighAccuracy: true }

        $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions)
                // Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        animation: google.maps.Animation.DROP,
                        position: latLng
                    })

                    var infoWindow = new google.maps.InfoWindow({
                        content: 'Je suis ici!'
                    })

                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.open($scope.map, marker)
                    })
                })
                // ///////
        }, function(error) {
            console.log('Could not get location')
                /*A retier après*/
            showPopup()
        })

        function showPopup() {
            var alertPopup = $ionicPopup.alert({
                title: 'Etat GPS!',
                template: 'Veuillez activer votre GPS :-)!!! '
            })
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone')
            })
        }

        $scope.envoyerSuggestion = function(contenu) {
            if (window.plugins && window.plugins.emailComposer) {
                window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                            console.log('Response -> ' + result)
                        },
                        'Message pour boîte à suggestion', // Subject
                        contenu, // Body
                        ['conso@bracongo.cd'], // To
                        null, // CC
                        null, // BCC
                        false, // isHTML
                        null, // Attachments
                        null) // Attachment Data
            }
            // $scope.closeModal()
        }

        // Set Ink
        ionicMaterialInk.displayEffect()
    })
    .controller('InfosCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk) {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.$parent.clearFabs()
        $ionicLoading.hide()

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('ServiceFeteCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, $state, $ionicLoading, $ionicModal, ionicMaterialMotion, ionicMaterialInk, serviceFactory, Application, $ionicPopup) {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = false
        $scope.$parent.setExpanded(false)
        $scope.$parent.setHeaderFab(false)
        $scope.tel = '+2437726627'
        $scope.mail = 'servicefetes@bracongo.cd';
        cordova.plugins.firebase.analytics.setEnabled(true);
        cordova.plugins.firebase.analytics.setCurrentScreen("Service Fête");
        //$cordovaGoogleAnalytics.debugMode();
        //$cordovaGoogleAnalytics.startTrackerWithId('UA-106202214-1');
        /*Application.getName().then(function(value) {
                $scope.name = value
                    //$cordovaGoogleAnalytics.setUserId($scope.name);
            }, function(error) {
                // $cordovaGoogleAnalytics.setUserId('Anonyme');
            })
        */
        // $cordovaGoogleAnalytics.trackView('Service Fête');

        $scope.pageSimuler = function() {
            $state.go('app.simulateur')
        }

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next()
        }

        // $scope.images = serviceFactory.getAllFeteImages()

        $scope.images = [{ title: 'SKOL MOLANGI YA MBOKA', image: 'img/fete/fete1.jpg' }, { title: "D'JINO EXPLOSION FRUITEE", image: 'img/fete/fete2.jpg' }, { title: 'JAZZ KIFF', image: 'img/fete/fete3.jpg' }, { title: 'SKOL MOLANGI YA MBOKA', image: 'img/fete/fete4.jpg' }, { title: 'SKOL MOLANGI YA MBOKA', image: 'img/fete/fete5.jpg' }, { title: 'SKOL MOLANGI YA MBOKA', image: 'img/fete/fete6.jpg' }]

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)

        $ionicModal.fromTemplateUrl('templates/proforma.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
        })
        $scope.openModal = function() {
            $scope.reinitialier()
            $scope.modal.show()
        }
        $scope.closeModal = function() {
            $scope.modal.hide()
        }
        $scope.biere
        $scope.bg
        $scope.casier
        $scope.pression
        $scope.nbrFutTembo
        $scope.nbrFutSkol
        $scope.nbrCasierBeau
        $scope.nbrCasierCastel
        $scope.nbrCasierDoppel
        $scope.nbrCasierCastel
        $scope.nbrCasierNkoyi
        $scope.nbrCasierNkoyiBlaclk
        $scope.nbrCasierTembo
        $scope.nbrCasierSkol
        $scope.nbrCasierBg
        $scope.loginData = {}
        $scope.prixUnique = -1
        $scope.nbrBarman
        $scope.nbrHotesse
        $scope.boissonPrise
        $scope.prixG
        $scope.nom
        $scope.data = {}
        $scope.cancel = false;
        Application.getName().then(function(value) {
            $scope.nom = value
                // console.log("Le nom du user",$scope.nom)
        })

        // When button is clicked, the popup will be shown...
        $scope.showPopup = function() {


            // Custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type = "text" placeholder="Votre Nom" ng-model = "data.nom"/> <br/><input type = "email" placeholder="Votre No de Email" ng-model = "data.mail"/><br/> <input type="tel" placeholder="Votre No de Téléphone" ng-model="data.tel"/>',
                title: 'Title',
                subTitle: 'Subtitle',
                scope: $scope,

                buttons: [{
                    text: 'Annuler',
                    onTap: function(e) {
                        $scope.cancel = true;
                        return $scope.cancel;
                    }
                }, {
                    text: '<b>Envoyer</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if ((!$scope.data.nom) || (!$scope.data.mail) || (!$scope.data.tel)) {
                            //don't allow the user to close unless he enters model...
                            e.preventDefault();
                        } else {
                            $scope.cancel = false;
                            return $scope.data;
                        }
                    }
                }]
            });

            myPopup.then(function(res) {
                console.log('Tapped!', res);
                //console.log("cancelled", $scope.cancel);
                if ($scope.cancel !== true) {
                    //  console.log("J'envoie");
                    var refUsers = firebase.database().ref().child('feteUsers')
                    var objet = {
                        nom: res.nom,
                        mail: res.mail,
                        tel: res.tel,
                        date: new Date()
                    }
                    refUsers.push(objet)
                    $scope.envoyerCommande();
                }
            });
        };

        $scope.envoyerCommande = function() {
            var message = "Bonjour BRACONGO, \n J'organise une réception dans laquelle j'attends " + $scope.loginData.nbrPlace + ' invités. \n Le prix estimé par la plate-forme est de ' + $scope.prixG + '$.\n Nom : ' + $scope.data.nom + '\n Email : ' + $scope.data.mail + '\n Téléphone : ' + $scope.data.tel

            if (window.plugins && window.plugins.emailComposer) {
                window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                            console.log('Response -> ' + result)
                        },
                        'Commande Service Fête : ' + $scope.data.nom, // Subject
                        message, // Body
                        ['servicefetes@bracongo.cd'], // To
                        null, // CC
                        null, // BCC
                        false, // isHTML
                        null, // Attachments
                        null) // Attachment Data
            }
            $scope.closeModal()
        }

        $scope.prixGlobal = function() {
            $scope.prixUnique = $scope.prixIndividus($scope.loginData.nbrPlace)
                //$scope.prixG = $scope.prixUnique * $scope.loginData.nbrPlace
            $scope.prixG = $scope.prixUnique;
        }

        $scope.reinitialier = function() {
            $scope.loginData = {}
            $scope.prixUnique = -1
            $scope.nbrBarman = null
            $scope.nbrHotesse = null
            $scope.boissonPrise = null
        }

        $scope.calculer = function() {
            console.log('Data', $scope.loginData)
            console.log('biere', $scope.loginData.biere)
            console.log('casier', $scope.loginData.casier)
            console.log('pression', $scope.loginData.pression)
            $scope.prixUnique = $scope.prixIndividus($scope.loginData.nbrPlace)
            $scope.nbrBarman = $scope.barman($scope.loginData.nbrPlace)
            $scope.nbrHotesse = $scope.hotesse($scope.loginData.nbrPlace)
            console.log('Prix par personne', $scope.prixIndividus($scope.loginData.nbrPlace))
            var temp
            if ($scope.loginData.biere && $scope.loginData.casier && $scope.loginData.pression && $scope.loginData.bg) {
                temp = 'Vous prenez de la bière en casier et en préssion ainsi que des boissons gazeuses. Nous allons vous proposer un mélange de différents parfums '
            }
            if ($scope.loginData.biere && $scope.loginData.casier && $scope.loginData.pression && !($scope.loginData.bg)) {
                temp = 'Vous prenez de la bière en casier et en préssion. Nous allons vous proposer un mélange de différents parfums '
            }
            if ($scope.loginData.biere && $scope.loginData.casier && !($scope.loginData.pression) && !($scope.loginData.bg)) {
                temp = 'Vous prenez de la bière en casier. Nous allons vous proposer un mélange de différents parfums '
            }
            if ($scope.loginData.biere && $scope.loginData.casier && !($scope.loginData.pression) && $scope.loginData.bg) {
                temp = 'Vous prenez de la bière en casier et des boissons gazeuses. Nous allons vous proposer un mélange de différents parfums '
            }
            if ($scope.loginData.biere && !($scope.loginData.casier) && $scope.loginData.pression && $scope.loginData.bg) {
                temp = 'Vous prenez de la bière en pression et des boissons gazeuses. Nous allons vous proposer un mélange de différents parfums '
            }
            if ($scope.loginData.biere && !($scope.loginData.casier) && $scope.loginData.pression && !($scope.loginData.bg)) {
                temp = 'Vous prenez de la bière en pression uniquement.'
            }
            if (!($scope.loginData.biere) && $scope.loginData.bg) {
                temp = 'Vous prenez des boissons gazeuses uniquement.'
            }

            if ($scope.loginData.biere && !($scope.loginData.bg)) {
                temp = 'Vous prenez de la bière.'
            }

            if (!($scope.loginData.biere) && !($scope.loginData.bg)) {
                temp = "Vous n'arrivez pas à vous décider côté boisson? Faites nous confiance!!!"
            }

            $scope.boissonPrise = temp
        }

        $scope.calculerPrixInd = function(nombrePersonne) {
            // var result
            if (0 <= nombrePersonne && nombrePersonne <= 50)
                return 5
            if (50 <= nombrePersonne && nombrePersonne <= 100)
                return 4
            if (100 <= nombrePersonne && nombrePersonne <= 500)
                return 3
        }

        /* Calcul le nombre de barmans en fonction du nombre d'hotesse*/
        $scope.barman = function(nombrePersonne) {
            if (nombrePersonne < 50)
                return 1
            if (50 < nombrePersonne && nombrePersonne < 100)
                return 2
            return 4
        }

        /* Calcul le nombre d'hotesse en fonction du nombre d'hotesse*/
        $scope.hotesse = function(nombrePersonne) {
            if (nombrePersonne < 50)
                return 2
            if (50 < nombrePersonne && nombrePersonne < 100)
                return 5
            return 20
        }

        /* Calcul du prix individuel en fonction du nombre de personnes*/
        $scope.prixIndividus = function(nombrePersonne) {
            var result = ((3 / 1900000) * Math.pow(nombrePersonne, 3)) - ((541 / 342000) * Math.pow(nombrePersonne, 2)) + ((3659 / 1140) * nombrePersonne) + (15950.0 / 171);
            return Math.round(result)
        }

        $ionicLoading.hide()

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('SimulateurCtrl', function($scope, $state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, serviceFactory) {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>',
            duration: 3000
        })
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.nbrPlace = null
        $scope.mail = 'servicefete@bracongo.cd'
        $scope.biere
        $scope.bg
        $scope.casier
        $scope.pression
        $scope.nbrFutTembo
        $scope.nbrFutSkol
        $scope.nbrCasierBeau
        $scope.nbrCasierCastel
        $scope.nbrCasierDoppel
        $scope.nbrCasierCastel
        $scope.nbrCasierNkoyi
        $scope.nbrCasierNkoyiBlaclk
        $scope.nbrCasierTembo
        $scope.nbrCasierSkol
        $scope.nbrCasierBg
        $scope.loginData = {}

        $scope.calculer = function() {
            console.log('Data', $scope.loginData)
            console.log('biere', $scope.loginData.biere)
            console.log('casier', $scope.loginData.casier)
            console.log('pression', $scope.loginData.pression)
            console.log('nbrFutTembo', $scope.loginData.nbrFutTembo)
            console.log('nbrCasierBeau', $scope.loginData.nbrCasierBeau)
            console.log('nbrCasierNkoyi', $scope.loginData.nbrCasierNkoyi)
            console.log('biere', $scope.loginData.biere)
        }

        $ionicLoading.hide()

        // Activate ink for controller
        ionicMaterialInk.displayEffect()
    })
    .controller('AboutCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, firebase, Application) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.nom = null

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next()
        }

        $scope.products = [{ title: 'JAZZ KIFF', image: 'img/kwilu_big.png' }, { title: 'ICE BAR NEW KWILU', image: 'img/kwilu_big.png' }, { title: 'WORLD COLA', image: 'img/kwilu_big.png' }, { title: 'WHATSAPP SELFIE', image: 'img/kwilu_big.png' }]

        $scope.getNom = function() {
                Application.getName().then(function(value) {
                    $scope.nom = value
                    console.log('Le nom du user', $scope.nom)
                })
            }
            // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)


        $ionicLoading.hide()

        // Set Ink
        ionicMaterialInk.displayEffect()
    })

.controller('OfflineCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader()
        $scope.$parent.clearFabs()
        $scope.isExpanded = true
        $scope.$parent.setExpanded(true)
        $scope.$parent.setHeaderFab('right')
        $scope.nom = null

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            })
        }, 300)


        $ionicLoading.hide()

        // Set Ink
        ionicMaterialInk.displayEffect()
    })
    .factory('GoogleMaps', function($cordovaGeolocation, serviceFactory, $ionicPopup, $ionicLoading) {
        function show() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                animation: 'fade-in'
            })
        }

        function hide() {
            $ionicLoading.hide()
        }

        var apiKey = false
        var map = null
        var markerCache = []

        function initMap() {
            show()

            var options = { timeout: 10000, enableHighAccuracy: true }

            $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                map = new google.maps.Map(document.getElementById('map'), mapOptions)

                // Wait until the map is loaded
                google.maps.event.addListenerOnce(map, 'idle', function() {

                    // add the user's position marker
                    var markerPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

                    var marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        position: markerPos,
                        icon: 'img/pin/green-dot.png'
                    })
                    var infoWindowContent = '<h3>' + 'Je suis ici' + '</h3>'

                    addInfoWindow(marker, infoWindowContent, latLng)

                    // Load the markers
                    loadMarkers(position.coords.latitude, position.coords.longitude)
                    hide()
                        // Reload markers every time the map moves
                        /* google.maps.event.addListener(map, 'dragend', function(){
                           console.log("moved!")
                           loadMarkers()
                         })
                         */

                    // Reload markers every time the zoom changes
                    /* google.maps.event.addListener(map, 'zoom_changed', function(){
                       console.log("zoomed!")
                       loadMarkers()
                     })
                     */
                    // enableMap()

                })
            }, function(error) {
                // Triggered on a button click, or some other target
                hide()
                showPopup()
            })
        }

        function showPopup() {
            var alertPopup = $ionicPopup.alert({
                    title: 'Etat GPS!',
                    template: 'Veuillez activer votre GPS :-)!!! '
                })
                /* alertPopup.then(function(res) {
                     console.log('Thank you for not eating my delicious ice cream cone')
                 })
                 */
        }

        function enableMap() {
            $ionicLoading.hide()
        }

        function disableMap() {
            $ionicLoading.show({
                template: 'You must be connected to the Internet to view this map.'
            })
        }

        function loadMarkers(latitude, longitude) {
            var rating = {}
            rating.rate = 3
            rating.max = 5
            var center = map.getCenter()
            var bounds = map.getBounds()
            var zoom = map.getZoom()

            // Convert objects returned by Google to be more readable
            var centerNorm = {
                lat: center.lat(),
                lng: center.lng()
            }

            var boundsNorm = {
                northeast: {
                    lat: bounds.getNorthEast().lat(),
                    lng: bounds.getNorthEast().lng()
                },
                southwest: {
                    lat: bounds.getSouthWest().lat(),
                    lng: bounds.getSouthWest().lng()
                }
            }

            /*   var boundingRadius = getBoundingRadius(centerNorm, boundsNorm)
 
         var params = {
           "centre": centerNorm,
           "bounds": boundsNorm,
           "zoom": zoom,
           "boundingRadius": boundingRadius
         }
       */
            // Get all of the markers from our Markers factory
            // var toto = []
            // toto = serviceFactory.getSavedPdv()
            // console.log("I've got ",toto)

            // console.log("My Possss",centerNorm)
            serviceFactory.getPdvs(latitude, longitude).then(function(markers) {
                var records = markers
                    /*Test*/
                    // console.log("HELLLLOOOO")
                    // console.log("My Possss 2",centerNorm)
                    /* for(var i = 0; i < records.length; i++){
                         records[i].distance = getDistanceBetweenPoints(centerNorm, record[i], 'km').toFixed(2)
                     }
                     */
                for (var i = 0; i < records.length; i++) {
                    var record = records[i]
                    record.distance = getDistanceBetweenPoints(centerNorm, record, 'km').toFixed(2)
                        // console.log("Markers: ", records[i]); 
                        /* var markerPos = new google.maps.LatLng(record.latitude, record.longitude)
 
           // Add the markerto the map
           var marker = new google.maps.Marker({
               map: map,
               animation: google.maps.Animation.DROP,
               position: markerPos
           })
 
           var infoWindowContent = "<h4>" + record.nom + "</h4>";          
 
           addInfoWindow(marker, infoWindowContent, record)
           */
                    if (!markerExists(record.latitude, record.longitude)) {
                        var markerPos = new google.maps.LatLng(record.latitude, record.longitude)
                            // add the marker
                        var marker = new google.maps.Marker({
                            map: map,
                            animation: google.maps.Animation.DROP,
                            position: markerPos,
                            icon: 'img/pin/bar.png'
                        })

                        // Add the marker to the markerCache so we know not to add it again later
                        var markerData = {
                            latitude: record.latitude,
                            longitude: record.longitude,
                            marker: marker
                        }

                        markerCache.push(markerData)

                        var infoWindowContent = '<h3>' + record.nom + '</h3>' + '</br>' + '<h4>' + record.adresse + '</h4>' + '</br>' + '<h4>' + 'Vous êtes à ' + record.distance + ' km du lieu' + '</h4>' + '<rating ng-model=3 max=5 readonly=true>' + '</rating>'

                        addInfoWindow(marker, infoWindowContent, record)
                    }
                }
            })
            hide()
        }

        function getDistanceBetweenPoints(start, end, units) {
            var earthRadius = {
                miles: 3958.8,
                km: 6371
            }

            var R = earthRadius[units || 'miles']
            var lat1 = start.lat
            var lon1 = start.lng
            var lat2 = end.latitude
            var lon2 = end.longitude

            var dLat = toRad((lat2 - lat1))
            var dLon = toRad((lon2 - lon1))
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2)
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            var d = R * c

            return d
        }

        function toRad(x) {
            return x * Math.PI / 180
        }

        function markerExists(lat, lng) {
            var exists = false
            var cache = markerCache
            for (var i = 0; i < cache.length; i++) {
                if (cache[i].latitude === lat && cache[i].longitude === lng) {
                    exists = true
                }
            }

            return exists
        }

        function addInfoWindow(marker, message, record) {
            var infoWindow = new google.maps.InfoWindow({
                content: message
            })

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open(map, marker)
            })
        }

        return {
            init: function() {
                initMap()
            }
        }
    })
    .factory('serviceFactory', function($ionicLoading, $firebaseArray, $firebaseObject, $http, ApiEndpoint) {
        var auth = firebase.auth()
        var database = firebase.database().ref()
        var storage = firebase.storage()
        var refEvent = database.child('events').orderByChild('datePub');
        var refJeux = database.child('jeux').orderByChild('datePub');
        var refCampagnes = database.child('campagnes').orderByChild('datePub');
        var refLoisirs = database.child('loisirs')
        var refEmplois = database.child('emplois').orderByChild('datePub');
        var refCategories = database.child('categories')
        var refVins = database.child('vins')
        var refCategoriesBrac = database.child('categoriesBrac')
        var refProduits = database.child('produits')
        var refAccueilImage = database.child('accueilImage')
        var refFeteImage = database.child('feteImage')
        var refChateauxImage = database.child('chateauxImage')
        var localEvents = []
        var localJeux = []
        var localCampagnes = []
        var localLoisirs = []
        var emplois = []
        var pdvProche = []
        var pdvProches = []
        var localCategories = []
        var localVins = []
        var localCategoriesBrac = []
        var localProduits = []
        var localAccueilImages = []
        var localFeteImages = []
        var localChateauxImages = []
        var i



        return {
            getPdvs: function(latitude, longitude) {
                console.log('HELLLLOOOO MAAAPPPPP xxxxxxxxx')
                return $http.get('https://api.bracongo-cd.com:8443/pdv/rest/pdvs/nearest/' + latitude + '/' + longitude, { timeout: 30000 }).then(function(response) {
                    console.log('HELLLLOOOO MAAAPPPPP')
                    pdvProche = response
                    pdvProches = response.data.payload.content;
                    // console.log("fresh", JSON.stringify(response))
                    return pdvProches
                })
            },

            getSavedPdv: function() {
                return pdvProches
            },

            getAllAccueilImages: function() {
                localAccueilImages = $firebaseArray(refAccueilImage)
                return $firebaseArray(refAccueilImage)
            },

            getAllFeteImages: function() {
                localFeteImages = $firebaseArray(refFeteImage)
                return $firebaseArray(refFeteImage)
            },

            getAllChateauxImages: function() {
                localChateauxImages = $firebaseArray(refChateauxImage)
                return $firebaseArray(refChateauxImage)
            },

            getAllEvent: function() {
                localEvents = $firebaseArray(refEvent);
                return $firebaseArray(refEvent);
            },
            getOneEvent: function(id) {
                for (i = 0; i < localEvents.length; i++) {
                    if (localEvents[i].$id == id) {
                        return localEvents[i]
                    }
                }
            },
            getAllCampagnes: function() {
                localCampagnes = $firebaseArray(refCampagnes)
                return $firebaseArray(refCampagnes)
            },
            getOneCampagne: function(id) {
                for (i = 0; i < localCampagnes.length; i++) {
                    if (localCampagnes[i].$id == id) {
                        return localCampagnes[i]
                    }
                }
            },
            getAllJeux: function() {
                localJeux = $firebaseArray(refJeux)
                return $firebaseArray(refJeux)
            },
            getOneJeux: function(id) {
                for (i = 0; i < localJeux.length; i++) {
                    if (localJeux[i].$id == id) {
                        return localJeux[i]
                    }
                }
            },
            getAllLoisirs: function() {
                localLoisirs = $firebaseArray(refLoisirs)
                return $firebaseArray(refLoisirs)
            },
            getOneLoisir: function(id) {
                for (i = 0; i < localLoisirs.length; i++) {
                    if (localLoisirs[i].$id == id) {
                        return localLoisirs[i]
                    }
                }
            },
            getAllEmplois: function() {
                emplois = $firebaseArray(refEmplois)
                return $firebaseArray(refEmplois)
            },
            getOneEmploi: function(id) {
                for (i = 0; i < emplois.length; i++) {
                    if (emplois[i].$id == id) {
                        return emplois[i]
                    }
                }
            },
            getAllCategories: function() {
                localCategories = $firebaseArray(refCategories)
                localVins = $firebaseArray(refVins)
                console.log('vins', localVins)
                return $firebaseArray(refCategories)
            },
            getOneCategorie: function(id) {
                for (i = 0; i < localCategories.length; i++) {
                    if (localCategories[i].$id == id) {
                        return localCategories[i]
                    }
                }
            },

            getCategorieProductList: function(code) {
                var result = []
                for (i = 0; i < localVins.length; i++) {
                    if (localVins[i].categorie === code) {
                        result.push(localVins[i])
                    }
                }
                return result
            },
            getAllVins: function() {
                localVins = $firebaseArray(refVins)
                return $firebaseArray(refVins)
            },
            getOneVin: function(id) {
                for (i = 0; i < localVins.length; i++) {
                    if (localVins[i].$id == id) {
                        return localVins[i]
                    }
                }
            },
            getAllCategoriesBrac: function() {
                localCategoriesBrac = $firebaseArray(refCategoriesBrac)
                localProduits = $firebaseArray(refProduits)
                    // console.log("vins",localProduits)
                return $firebaseArray(refCategoriesBrac)
            },
            getOneCategorieBrac: function(id) {
                for (i = 0; i < localCategoriesBrac.length; i++) {
                    if (localCategoriesBrac[i].$id == id) {
                        return localCategoriesBrac[i]
                    }
                }
            },
            getCategorieBracProductList: function(code) {
                var result = []
                for (i = 0; i < localProduits.length; i++) {
                    if (localProduits[i].categorie === code) {
                        result.push(localProduits[i])
                    }
                }
                return result
            }
        }
    })

.factory('Connectivity', function($rootScope, $cordovaNetwork) {
    return {
        isOnline: function() {
            if (ionic.Platform.isWebView()) {
                return $cordovaNetwork.isOnline()
            } else {
                return navigator.onLine
            }
        },
        ifOffline: function() {
            if (ionic.Platform.isWebView()) {
                return !$cordovaNetwork.isOnline()
            } else {
                return !navigator.onLine
            }
        },
        startWatching: function() {
            if (ionic.Platform.isWebView()) {
                $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                    console.log('went online')
                })

                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                    console.log('went offline')
                })
            } else {
                window.addEventListener('online', function(e) {
                    console.log('went online')
                }, false)

                window.addEventListener('offline', function(e) {
                    console.log('went offline')
                }, false)
            }
        }
    }
})

.factory('Application', function($cordovaNativeStorage, $state) {
    return {
        setInitialRun: function(initial) {
            $cordovaNativeStorage.setItem('initialRun', initial).then(function() {
                console.log('Initialrun set')
            }, function(error) {
                // console.log("ERRRRUUUURRRRRRR")
                // console.log(error);  
            })
        },
        isInitialRun: function() {
            // console.log("TOOOOOTTTTOOOOOO")
            return $cordovaNativeStorage.getItem('initialRun').then(function(value) {
                //  console.log("InitialRun",value)
                return value === 'true'
            }, function(error) {
                // console.log("EROR GET INITIALRUN")
                $cordovaNativeStorage.setItem('initialRun', true).then(function() {
                    // console.log("Initialrun set 2")
                }, function(error) {
                    // console.log("roor setting initial run")
                    // console.log(error);  
                })
                $state.go('app.login')
                    // console.log(error);  
            })
        },
        registerUser: function(login, mail, name) {
            $cordovaNativeStorage.setItem('login', login).then(function() {
                    console.log('YOUUUPIIII login')
                }, function(error) {
                    console.log(error)
                })
                /*
                       $cordovaNativeStorage.setItem("mdp", mdp).then(function () {
                           console.log("YOUUUPIIII mdp")
                       }, function(error){
                            console.log("ERRRRUUUURRRRRRR mdp")
                            console.log(error);  
                       });*/
            $cordovaNativeStorage.setItem('mail', mail).then(function() {
                console.log('YOUUUPIIII mail')
            }, function(error) {
                console.log(error)
            })
            $cordovaNativeStorage.setItem('name', name).then(function() {
                console.log('YOUUUPIIII')
            }, function(error) {
                console.log(error)
            })
        },

        getName: function() {
            return $cordovaNativeStorage.getItem('name').then(function(value) {
                console.log('name', value)
                return value
            }, function(error) {
                console.log(error)
            })
        },

        getMail: function() {
            $cordovaNativeStorage.getItem('mail').then(function(value) {
                console.log('name', value)
                return value
            }, function(error) {
                console.log(error)
            })
        },

        getEventBadge: function() {
            return $cordovaNativeStorage.getItem('eventBadge').then(function(value) {
                return value
            }, function(error) {
                console.log(error)
                return 0
            })
        },
        getCampagneBadge: function() {
            return $cordovaNativeStorage.getItem('campagneBadge').then(function(value) {
                return value
            }, function(error) {
                console.log(error)
                return 0
            })
        },
        getConcoursBadge: function() {
            return $cordovaNativeStorage.getItem('concoursBadge').then(function(value) {
                return value
            }, function(error) {
                console.log(error)
                return 0
            })
        },
        setEventBadge: function(badge) {
            $cordovaNativeStorage.setItem('eventBadge', badge).then(function() {}, function(error) {
                console.log(error)
            })
        },
        setCampagneBadge: function(badge) {
            $cordovaNativeStorage.setItem('campagneBadge', badge).then(function() {}, function(error) {
                console.log(error)
            })
        },
        setConcoursBadge: function(badge) {
            $cordovaNativeStorage.setItem('concoursBadge', badge).then(function() {}, function(error) {
                console.log(error)
            })
        }
    }
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader()
    $scope.$parent.clearFabs()
    $scope.isExpanded = true
    $scope.$parent.setExpanded(true)
    $scope.$parent.setHeaderFab(false)

    cordova.plugins.firebase.analytics.setEnabled(true);
    cordova.plugins.firebase.analytics.setCurrentScreen('Jeux');

    // Activate ink for controller
    ionicMaterialInk.displayEffect()

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    })
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    })

    $scope.puzzels = []
    if ($stateParams.level == 1) {
        $scope.puzzels.push({
            titre: 'SKOL',
            nom: 'skol',
            lien: "app.game({pack: 'skol', level: '3'})",
            src: 'img/skol.png',
            time: 7,
            pts: 50
        })
        $scope.puzzels.push({
            titre: 'Castel',
            nom: 'castel2',
            lien: "app.game({pack: 'castel2', level: '3'})",
            src: 'img/castel2.jpg',
            time: 5,
            pts: 40
        })
        $scope.puzzels.push({
            titre: 'Doppel',
            nom: 'doppel',
            lien: "app.game({pack: 'doppel', level: '3'})",
            src: 'img/doppel.jpg',
            time: 7,
            pts: 56
        })
        $scope.puzzels.push({
            titre: 'World Cola',
            nom: 'world',
            lien: "app.game({pack: 'world', level: '3'})",
            src: 'img/world.jpg',
            time: 10,
            pts: 30
        })
    } else if ($stateParams.level == 2) {
        $scope.puzzels.push({
            titre: 'Nkoyi',
            nom: 'nkoyi',
            lien: "app.game({pack: 'nkoyi', level: '4'})",
            src: 'img/nkoyi.jpg',
            time: 7,
            pts: 50
        })
        $scope.puzzels.push({
            titre: 'Beaufort',
            nom: 'beaufort',
            lien: "app.game({pack: 'beaufort', level: '4'})",
            src: 'img/beaufort.jpg',
            time: 5,
            pts: 40
        })
        $scope.puzzels.push({
            titre: 'Castel',
            nom: 'castel',
            lien: "app.game({pack: 'castel', level: '4'})",
            src: 'img/castel.jpg',
            time: 7,
            pts: 56
        })
        $scope.puzzels.push({
            titre: 'Tembo',
            nom: 'tembo',
            lien: "app.game({pack: 'tembo', level: '4'})",
            src: 'img/tembo.jpg',
            time: 10,
            pts: 30
        })
    } else if ($stateParams.level == 3) {
        $scope.puzzels.push({
            titre: '33 Export',
            nom: 'export',
            lien: "app.game({pack: 'export', level: '5'})",
            src: 'img/export.jpg',
            time: 7,
            pts: 50
        })
        $scope.puzzels.push({
            titre: 'XXL',
            nom: 'xxl',
            lien: "app.game({pack: 'xxl', level: '5'})",
            src: 'img/xxl.jpg',
            time: 5,
            pts: 40
        })
        $scope.puzzels.push({
            titre: 'Top',
            nom: 'top',
            lien: "app.game({pack: 'top', level: '5'})",
            src: 'img/top.jpg',
            time: 7,
            pts: 56
        })
        $scope.puzzels.push({
            titre: "D'Jino",
            nom: 'djino',
            lien: "app.game({pack: 'djino', level: '5'})",
            src: 'img/djino.jpg',
            time: 10,
            pts: 30
        })
    }
})

.controller('GameCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader()
    $scope.$parent.clearFabs()
    $scope.isExpanded = true
    $scope.$parent.setExpanded(true)
    $scope.$parent.setHeaderFab(false)
        // Activate ink for controller
    ionicMaterialInk.displayEffect()

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    })
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    })

    $scope.niveau = 1
    $scope.packImg = $stateParams.pack
    $scope.nombre = $stateParams.level
    $scope.lists = []

    $scope.toto = function() {
            console.log('BONJOURRRRRRRRRR')
        }
        // $scope.generique = (new Audio("audio/"+$scope.packImg+".mp3",0.2)).play()
        // console.log("La musique",$scope.generique)

    if ($scope.nombre == 3) {
        var list = []
        list.push([3, 1, 5, 2, 8, 7, 6, 0, 4]);
        list.push([3, 1, 5, 2, 8, 7, 0, 6, 4]);
        list.push([3, 1, 5, 0, 8, 7, 2, 6, 4]);
        list.push([0, 1, 5, 3, 8, 7, 2, 6, 4]);
        list.push([1, 0, 5, 3, 8, 7, 2, 6, 4]);
        list.push([1, 8, 5, 3, 0, 7, 2, 6, 4]);
        list.push([1, 8, 5, 0, 3, 7, 2, 6, 4]);
        list.push([0, 8, 5, 1, 3, 7, 2, 6, 4]);
        list.push([8, 0, 5, 1, 3, 7, 2, 6, 4]);
        list.push([8, 3, 5, 1, 0, 7, 2, 6, 4]);
        list.push([8, 3, 5, 1, 6, 7, 2, 0, 4]);
        list.push([8, 3, 5, 1, 6, 7, 0, 2, 4]);
        list.push([8, 3, 5, 0, 6, 7, 1, 2, 4]);
        list.push([8, 3, 5, 6, 0, 7, 1, 2, 4]);
        list.push([8, 3, 5, 6, 2, 7, 1, 0, 4]);
        list.push([8, 3, 5, 6, 2, 7, 1, 4, 0]);
        list.push([8, 3, 5, 6, 2, 0, 1, 4, 7]);
        list.push([8, 3, 5, 6, 0, 2, 1, 4, 7]);
        list.push([8, 0, 5, 6, 3, 2, 1, 4, 7]);
        list.push([8, 5, 0, 6, 3, 2, 1, 4, 7]);
        list.push([8, 5, 2, 6, 3, 0, 1, 4, 7]);
        list.push([8, 5, 2, 6, 0, 3, 1, 4, 7]);
        list.push([8, 5, 2, 6, 4, 3, 1, 0, 7]);
        list.push([8, 5, 2, 6, 4, 3, 0, 1, 7]);
        list.push([8, 5, 2, 0, 4, 3, 6, 1, 7]);
        list.push([0, 5, 2, 8, 4, 3, 6, 1, 7]);
        list.push([5, 0, 2, 8, 4, 3, 6, 1, 7]);
        list.push([5, 4, 2, 8, 0, 3, 6, 1, 7]);
        list.push([5, 4, 2, 0, 8, 3, 6, 1, 7]);
        list.push([5, 4, 2, 6, 8, 3, 0, 1, 7]);
        list.push([5, 4, 2, 6, 8, 3, 1, 0, 7]);
        list.push([5, 4, 2, 6, 0, 3, 1, 8, 7]);
        list.push([5, 4, 2, 6, 3, 0, 1, 8, 7]);
        list.push([5, 4, 2, 6, 3, 7, 1, 8, 0]);
        list.push([5, 4, 2, 6, 3, 7, 1, 0, 8]);
        list.push([5, 4, 2, 6, 0, 7, 1, 3, 8]);
        list.push([5, 4, 2, 6, 7, 0, 1, 3, 8]);
        list.push([5, 4, 0, 6, 7, 2, 1, 3, 8]);
        list.push([5, 0, 4, 6, 7, 2, 1, 3, 8]);
        list.push([5, 7, 4, 6, 0, 2, 1, 3, 8]);
        list.push([5, 7, 4, 0, 6, 2, 1, 3, 8]);
        list.push([0, 7, 4, 5, 6, 2, 1, 3, 8]);
        list.push([7, 0, 4, 5, 6, 2, 1, 3, 8]);
        list.push([7, 6, 4, 5, 0, 2, 1, 3, 8]);
        list.push([7, 6, 4, 5, 2, 0, 1, 3, 8]);
        list.push([7, 6, 4, 5, 2, 8, 1, 3, 0]);
        list.push([7, 6, 4, 5, 2, 8, 1, 0, 3]);
        list.push([7, 6, 4, 5, 2, 8, 0, 1, 3]);
        list.push([7, 6, 4, 0, 2, 8, 5, 1, 3]);
        list.push([0, 6, 4, 7, 2, 8, 5, 1, 3]);
        list.push([6, 0, 4, 7, 2, 8, 5, 1, 3]);
        list.push([6, 4, 0, 7, 2, 8, 5, 1, 3])
        var taille = list.length
        var randomnumber = Math.floor(Math.random() * (taille))
        $scope.lists = list[randomnumber]
    } else if ($scope.nombre == 4) {
        var list = []
        list.push([1, 5, 2, 3, 4, 6, 10, 7, 8, 13, 9, 11, 12, 14, 15, 0]);
        list.push([1, 5, 2, 3, 4, 6, 10, 7, 8, 13, 9, 0, 12, 14, 15, 11]);
        list.push([1, 5, 2, 3, 4, 6, 10, 7, 8, 13, 0, 9, 12, 14, 15, 11]);
        list.push([1, 5, 2, 3, 4, 6, 0, 7, 8, 13, 10, 9, 12, 14, 15, 11]);
        list.push([1, 5, 2, 3, 4, 0, 6, 7, 8, 13, 10, 9, 12, 14, 15, 11]);
        list.push([1, 5, 2, 3, 4, 13, 6, 7, 8, 0, 10, 9, 12, 14, 15, 11]);
        list.push([1, 5, 2, 3, 4, 13, 6, 7, 0, 8, 10, 9, 12, 14, 15, 11]);
        list.push([1, 5, 2, 3, 0, 13, 6, 7, 4, 8, 10, 9, 12, 14, 15, 11]);
        list.push([1, 5, 2, 3, 13, 0, 6, 7, 4, 8, 10, 9, 12, 14, 15, 11]);
        list.push([1, 0, 2, 3, 13, 5, 6, 7, 4, 8, 10, 9, 12, 14, 15, 11]);
        list.push([0, 1, 2, 3, 13, 5, 6, 7, 4, 8, 10, 9, 12, 14, 15, 11]);
        list.push([13, 1, 2, 3, 0, 5, 6, 7, 4, 8, 10, 9, 12, 14, 15, 11]);
        list.push([13, 1, 2, 3, 5, 0, 6, 7, 4, 8, 10, 9, 12, 14, 15, 11]);
        list.push([13, 1, 2, 3, 5, 8, 6, 7, 4, 0, 10, 9, 12, 14, 15, 11]);
        list.push([13, 1, 2, 3, 5, 8, 6, 7, 4, 14, 10, 9, 12, 0, 15, 11]);
        list.push([13, 1, 2, 3, 5, 8, 6, 7, 4, 14, 10, 9, 12, 15, 0, 11]);
        list.push([13, 1, 2, 3, 5, 8, 6, 7, 4, 14, 0, 9, 12, 15, 10, 11]);
        list.push([13, 1, 2, 3, 5, 8, 6, 7, 4, 0, 14, 9, 12, 15, 10, 11]);
        list.push([13, 1, 2, 3, 5, 0, 6, 7, 4, 8, 14, 9, 12, 15, 10, 11]);
        list.push([13, 0, 2, 3, 5, 1, 6, 7, 4, 8, 14, 9, 12, 15, 10, 11]);
        list.push([13, 2, 0, 3, 5, 1, 6, 7, 4, 8, 14, 9, 12, 15, 10, 11]);
        list.push([13, 2, 6, 3, 5, 1, 0, 7, 4, 8, 14, 9, 12, 15, 10, 11]);
        list.push([13, 2, 6, 3, 5, 1, 14, 7, 4, 8, 0, 9, 12, 15, 10, 11]);
        list.push([13, 2, 6, 3, 5, 1, 14, 7, 4, 0, 8, 9, 12, 15, 10, 11]);
        list.push([13, 2, 6, 3, 5, 0, 14, 7, 4, 1, 8, 9, 12, 15, 10, 11]);
        list.push([13, 2, 6, 3, 0, 5, 14, 7, 4, 1, 8, 9, 12, 15, 10, 11]);
        list.push([13, 2, 6, 3, 4, 5, 14, 7, 0, 1, 8, 9, 12, 15, 10, 11]);
        list.push([13, 2, 6, 3, 4, 5, 14, 7, 12, 1, 8, 9, 0, 15, 10, 11]);
        list.push([13, 2, 6, 3, 4, 5, 14, 7, 12, 1, 8, 9, 15, 0, 10, 11]);
        list.push([13, 2, 6, 3, 4, 5, 14, 7, 12, 1, 8, 9, 15, 10, 0, 11]);
        list.push([13, 2, 6, 3, 4, 5, 14, 7, 12, 1, 0, 9, 15, 10, 8, 11]);
        list.push([13, 2, 6, 3, 4, 5, 14, 7, 12, 0, 1, 9, 15, 10, 8, 11]);
        list.push([13, 2, 6, 3, 4, 0, 14, 7, 12, 5, 1, 9, 15, 10, 8, 11]);
        list.push([13, 2, 6, 3, 4, 14, 0, 7, 12, 5, 1, 9, 15, 10, 8, 11]);
        list.push([13, 2, 6, 3, 4, 14, 7, 0, 12, 5, 1, 9, 15, 10, 8, 11]);
        list.push([13, 2, 6, 3, 4, 14, 7, 9, 12, 5, 1, 0, 15, 10, 8, 11]);
        list.push([13, 2, 6, 3, 4, 14, 7, 9, 12, 5, 1, 11, 15, 10, 8, 0]);
        list.push([13, 2, 6, 3, 4, 14, 7, 9, 12, 5, 1, 11, 15, 10, 0, 8]);
        list.push([13, 2, 6, 3, 4, 14, 7, 9, 12, 5, 0, 11, 15, 10, 1, 8]);
        list.push([13, 2, 6, 3, 4, 14, 0, 9, 12, 5, 7, 11, 15, 10, 1, 8]);
        list.push([13, 2, 6, 3, 4, 14, 9, 0, 12, 5, 7, 11, 15, 10, 1, 8]);
        list.push([13, 2, 6, 3, 4, 14, 9, 11, 12, 5, 7, 0, 15, 10, 1, 8]);
        list.push([13, 2, 6, 3, 4, 14, 9, 11, 12, 5, 0, 7, 15, 10, 1, 8]);
        list.push([13, 2, 6, 3, 4, 14, 0, 11, 12, 5, 9, 7, 15, 10, 1, 8]);
        list.push([13, 2, 0, 3, 4, 14, 6, 11, 12, 5, 9, 7, 15, 10, 1, 8]);
        list.push([13, 0, 2, 3, 4, 14, 6, 11, 12, 5, 9, 7, 15, 10, 1, 8]);
        list.push([13, 14, 2, 3, 4, 0, 6, 11, 12, 5, 9, 7, 15, 10, 1, 8]);
        list.push([13, 14, 2, 3, 0, 4, 6, 11, 12, 5, 9, 7, 15, 10, 1, 8]);
        list.push([13, 14, 2, 3, 12, 4, 6, 11, 0, 5, 9, 7, 15, 10, 1, 8]);
        list.push([13, 14, 2, 3, 12, 4, 6, 11, 5, 0, 9, 7, 15, 10, 1, 8]);
        list.push([13, 14, 2, 3, 12, 0, 6, 11, 5, 4, 9, 7, 15, 10, 1, 8]);
        list.push([13, 0, 2, 3, 12, 14, 6, 11, 5, 4, 9, 7, 15, 10, 1, 8]);
        list.push([0, 13, 2, 3, 12, 14, 6, 11, 5, 4, 9, 7, 15, 10, 1, 8]);
        list.push([12, 13, 2, 3, 0, 14, 6, 11, 5, 4, 9, 7, 15, 10, 1, 8]);
        list.push([12, 13, 2, 3, 14, 0, 6, 11, 5, 4, 9, 7, 15, 10, 1, 8]);
        list.push([12, 13, 2, 3, 14, 6, 0, 11, 5, 4, 9, 7, 15, 10, 1, 8]);
        list.push([12, 13, 2, 3, 14, 6, 9, 11, 5, 4, 0, 7, 15, 10, 1, 8]);
        list.push([12, 13, 2, 3, 14, 6, 9, 11, 5, 0, 4, 7, 15, 10, 1, 8]);
        list.push([12, 13, 2, 3, 14, 6, 9, 11, 5, 10, 4, 7, 15, 0, 1, 8]);
        list.push([12, 13, 2, 3, 14, 6, 9, 11, 5, 10, 4, 7, 15, 1, 0, 8]);
        list.push([12, 13, 2, 3, 14, 6, 9, 11, 5, 10, 0, 7, 15, 1, 4, 8]);
        list.push([12, 13, 2, 3, 14, 6, 9, 11, 5, 10, 7, 0, 15, 1, 4, 8]);
        list.push([12, 13, 2, 3, 14, 6, 9, 0, 5, 10, 7, 11, 15, 1, 4, 8]);
        list.push([12, 13, 2, 0, 14, 6, 9, 3, 5, 10, 7, 11, 15, 1, 4, 8]);
        list.push([12, 13, 0, 2, 14, 6, 9, 3, 5, 10, 7, 11, 15, 1, 4, 8]);
        list.push([12, 13, 9, 2, 14, 6, 0, 3, 5, 10, 7, 11, 15, 1, 4, 8]);
        list.push([12, 13, 9, 2, 14, 0, 6, 3, 5, 10, 7, 11, 15, 1, 4, 8]);
        list.push([12, 13, 9, 2, 14, 10, 6, 3, 5, 0, 7, 11, 15, 1, 4, 8]);
        list.push([12, 13, 9, 2, 14, 10, 6, 3, 0, 5, 7, 11, 15, 1, 4, 8]);
        list.push([12, 13, 9, 2, 0, 10, 6, 3, 14, 5, 7, 11, 15, 1, 4, 8]);
        list.push([0, 13, 9, 2, 12, 10, 6, 3, 14, 5, 7, 11, 15, 1, 4, 8])
        var taille = list.length
        var randomnumber = Math.floor(Math.random() * (taille))
        $scope.lists = list[randomnumber]
    } else if ($scope.nombre == 5) {
        var list = []
        list.push([1, 2, 7, 3, 4, 5, 6, 13, 12, 9, 10, 11, 0, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 5, 6, 13, 12, 9, 10, 0, 11, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 5, 0, 13, 12, 9, 10, 6, 11, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 0, 5, 13, 12, 9, 10, 6, 11, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 0, 6, 11, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 6, 11, 8, 14, 0, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 6, 11, 8, 14, 16, 0, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 0, 11, 8, 14, 16, 6, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 0, 8, 14, 16, 6, 17, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 17, 8, 14, 16, 6, 0, 18, 19, 20, 21, 22, 23, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 17, 8, 14, 16, 6, 22, 18, 19, 20, 21, 0, 23, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 17, 8, 14, 16, 6, 22, 18, 19, 20, 21, 23, 0, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 17, 8, 14, 16, 6, 22, 0, 19, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 17, 8, 14, 16, 6, 0, 22, 19, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 0, 8, 14, 16, 6, 17, 22, 19, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 8, 0, 14, 16, 6, 17, 22, 19, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 8, 14, 0, 16, 6, 17, 22, 19, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 8, 14, 19, 16, 6, 17, 22, 0, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 8, 14, 19, 16, 6, 17, 0, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 12, 9, 15, 11, 8, 0, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 0, 9, 15, 11, 8, 12, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 4, 10, 5, 13, 9, 0, 15, 11, 8, 12, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 3, 0, 10, 5, 13, 9, 4, 15, 11, 8, 12, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 7, 0, 3, 10, 5, 13, 9, 4, 15, 11, 8, 12, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 0, 7, 3, 10, 5, 13, 9, 4, 15, 11, 8, 12, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 10, 5, 0, 9, 4, 15, 11, 8, 12, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 10, 5, 8, 9, 4, 15, 11, 0, 12, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 10, 5, 8, 9, 4, 15, 11, 12, 0, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 10, 5, 8, 0, 4, 15, 11, 12, 9, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 10, 5, 0, 8, 4, 15, 11, 12, 9, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 10, 0, 5, 8, 4, 15, 11, 12, 9, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 0, 10, 5, 8, 4, 15, 11, 12, 9, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 0, 11, 12, 9, 19, 16, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 11, 12, 9, 19, 0, 6, 17, 14, 22, 20, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 11, 12, 9, 19, 20, 6, 17, 14, 22, 0, 21, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 11, 12, 9, 19, 20, 6, 17, 14, 22, 21, 0, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 11, 12, 9, 19, 20, 0, 17, 14, 22, 21, 6, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 0, 12, 9, 19, 20, 11, 17, 14, 22, 21, 6, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 12, 0, 9, 19, 20, 11, 17, 14, 22, 21, 6, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 12, 17, 9, 19, 20, 11, 0, 14, 22, 21, 6, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 12, 17, 9, 19, 20, 11, 14, 0, 22, 21, 6, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 8, 4, 16, 12, 17, 0, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([1, 2, 13, 7, 3, 15, 10, 5, 0, 4, 16, 12, 17, 8, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([1, 2, 13, 0, 3, 15, 10, 5, 7, 4, 16, 12, 17, 8, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([1, 2, 0, 13, 3, 15, 10, 5, 7, 4, 16, 12, 17, 8, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([1, 0, 2, 13, 3, 15, 10, 5, 7, 4, 16, 12, 17, 8, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([0, 1, 2, 13, 3, 15, 10, 5, 7, 4, 16, 12, 17, 8, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 0, 10, 5, 7, 4, 16, 12, 17, 8, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 0, 5, 7, 4, 16, 12, 17, 8, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 16, 0, 17, 8, 19, 20, 11, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 16, 11, 17, 8, 19, 20, 0, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 16, 11, 17, 8, 19, 0, 20, 14, 9, 22, 21, 6, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 16, 11, 17, 8, 19, 21, 20, 14, 9, 22, 0, 6, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 16, 11, 17, 8, 19, 21, 20, 14, 9, 22, 6, 0, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 16, 11, 17, 8, 19, 21, 0, 14, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 16, 0, 17, 8, 19, 21, 11, 14, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 0, 16, 17, 8, 19, 21, 11, 14, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 21, 16, 17, 8, 19, 0, 11, 14, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 21, 16, 17, 8, 19, 11, 0, 14, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 21, 16, 17, 8, 19, 11, 14, 0, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 21, 16, 0, 8, 19, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 7, 4, 21, 16, 8, 0, 19, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 5, 0, 4, 21, 16, 8, 7, 19, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 0, 5, 4, 21, 16, 8, 7, 19, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 8, 5, 4, 21, 16, 0, 7, 19, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 8, 5, 4, 21, 16, 7, 0, 19, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 8, 5, 4, 21, 16, 7, 19, 0, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 8, 5, 0, 21, 16, 7, 19, 4, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 13, 3, 10, 12, 8, 0, 5, 21, 16, 7, 19, 4, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 0, 3, 10, 12, 8, 13, 5, 21, 16, 7, 19, 4, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 3, 0, 10, 12, 8, 13, 5, 21, 16, 7, 19, 4, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 0, 21, 16, 7, 19, 4, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 7, 19, 0, 11, 14, 17, 9, 22, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 7, 19, 22, 11, 14, 17, 9, 0, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 7, 19, 22, 11, 14, 17, 0, 9, 6, 20, 23, 18, 24]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 7, 19, 22, 11, 14, 17, 18, 9, 6, 20, 23, 0, 24]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 7, 19, 22, 11, 14, 17, 18, 9, 6, 20, 23, 24, 0]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 7, 19, 22, 11, 14, 17, 18, 0, 6, 20, 23, 24, 9]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 7, 19, 22, 11, 14, 17, 0, 18, 6, 20, 23, 24, 9]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 7, 19, 22, 11, 14, 0, 17, 18, 6, 20, 23, 24, 9]);
        list.push([15, 1, 2, 3, 5, 10, 12, 8, 13, 4, 21, 16, 0, 19, 22, 11, 14, 7, 17, 18, 6, 20, 23, 24, 9]);
        list.push([15, 1, 2, 3, 5, 10, 12, 0, 13, 4, 21, 16, 8, 19, 22, 11, 14, 7, 17, 18, 6, 20, 23, 24, 9]);
        list.push([15, 1, 2, 3, 5, 10, 12, 13, 0, 4, 21, 16, 8, 19, 22, 11, 14, 7, 17, 18, 6, 20, 23, 24, 9]);
        list.push([15, 1, 2, 3, 5, 10, 12, 13, 19, 4, 21, 16, 8, 0, 22, 11, 14, 7, 17, 18, 6, 20, 23, 24, 9])
        var taille = list.length
        var randomnumber = Math.floor(Math.random() * (taille))
        $scope.lists = list[randomnumber]
    }
})