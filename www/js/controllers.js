/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['ionic','firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,$ionicPlatform,UserService) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    var vm = this;

    $ionicPlatform.ready(function() {

        // Initialize the database.
        UserService.initDB();

        // Get all birthday records from the database.
       /* UserService.getAllUsers()
                        .then(function (users) {
                            vm.users = users;
                        });
                        */
    });

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('AccueilCtrl', function($scope ,$state, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
        $scope.eventsPage = function(){ 
            $state.go('app.listEvent');        
        }
        $scope.campagnesPage = function(){ 
            $state.go('app.listCampagnes');        
        }
        $scope.jeuxPage = function(){ 
            $state.go('app.listJeux');        
        }
        $scope.loisirsPage = function(){ 
            $state.go('app.listLoisirs');        
        }
        $scope.emploisPage = function(){ 
            $state.go('app.listEmplois');        
        }
        $scope.aboutPage = function(){ 
            $state.go('app.about');        
        }
    ionicMaterialInk.displayEffect();
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,UserService) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('EventsCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.events = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
            
    $scope.events = serviceFactory.getAllEvent();
        console.log( $scope.events) ; 

    $scope.detailEvent = function(id){ 
        console.log("J'envoie", id);
        $state.go('app.itemEvent', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('EventCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.event = null;
    var eventId = $stateParams.id;
    console.log("L'id de l'event", $stateParams.id);
     console.log("L'id de l'event", $stateParams);
    console.log(eventId) ;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.event = serviceFactory.getOneEvent(eventId);
  //console.log("l'event",$scope.event.titre);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('CampagnesCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.campagnes = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    $scope.campagnes = serviceFactory.getAllCampagnes();
        console.log( $scope.campagnes) ; 

    $scope.detailCampagne = function(id){ 
        console.log("J'envoie", id);
        $state.go('app.itemCampagne', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('CampagneCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.campagne = null;
    var campagneId = $stateParams.id;
    console.log("L'id de l'event", $stateParams.id);
     console.log("L'id de l'event", $stateParams);
    console.log(campagneId) ;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.campagne = serviceFactory.getOneCampagne(campagneId);
  console.log("campagnes",$scope.campagne.titre);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('JeuxCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.jeux = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    $scope.jeux = serviceFactory.getAllJeux();
        console.log( $scope.jeux) ; 

    $scope.detailJeux = function(id){ 
        console.log("J'envoie", id);
        $state.go('app.itemJeux', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('JeuCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.jeu = null;
    var jeuId = $stateParams.id;
    console.log("L'id de l'event", $stateParams.id);
     console.log("L'id de l'event", $stateParams);
    console.log(jeuId) ;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.jeu = serviceFactory.getOneJeux(jeuId);
  console.log("jeu",$scope.jeu.titre);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('LoisirsCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.loisirs = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    $scope.loisirs = serviceFactory.getAllLoisirs();

    $scope.detailLoisir = function(id){ 
        $state.go('app.itemLoisir', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('LoisirCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.loisir = null;
    var loisirId = $stateParams.id;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.loisir = serviceFactory.getOneLoisir(loisirId);
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('EmploisCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.emplois = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    $scope.emplois = serviceFactory.getAllEmplois();
    $scope.detailEmploi = function(id){ 
        $state.go('app.itemEmploi', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('EmploiCtrl', function($scope, $stateParams, $timeout,$ionicLoading,$ionicModal, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.emploi = null;
    var emploiId = $stateParams.id;
    $scope.emailSend = "rdsid@bracongo.cd";

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });    
  $scope.emploi = serviceFactory.getOneEmploi(emploiId);
  $ionicLoading.hide();
  $ionicModal.fromTemplateUrl('templates/postuler.html',{
    scope: $scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });
  $scope.openModal = function(){
    $scope.modal.show();
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }


  $scope.envoyerMail= function(nom,prenom,mail,tel,linkedin) {
      
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            },  
            "Réponse Offre d'emploi ref: " + $scope.emploi.reference, // Subject
            " Nom : "+nom+"\n Prenom : "+prenom+"\n Email : "+mail+"\n Téléphone : "+tel+"\n LinkedIn : "+linkedin,                      // Body
            ["roykenvalmy@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
        $scope.closeModal();
    }

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('ContactCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,$cordovaGeolocation) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.emailSend = "rdsid@bracongo.cd";

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

     $scope.$on('mapInitialized', function (event, map) {
        $scope.map = map;
    });

$scope.positions = [{
            lat: 4.0473831,
            lng: 9.6951812
        }];
    $scope.centerOnMe = function () {
        $scope.positions = [];
        $ionicLoading.show();
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.positions.push({lat: pos.k, lng: pos.B});
            console.log(pos);
            $scope.map.setCenter(pos);
            $ionicLoading.hide();
        });

    };

var options = {timeout: 10000, enableHighAccuracy: true};
 
  function initialize() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };

  $scope.envoyerSuggestion= function(contenu) {
      
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            },  
            "Message pour boîte à suggestion", // Subject
            contenu,                      // Body
            ["roykenvalmy@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
       // $scope.closeModal();
    }

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('AboutCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,firebase) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);
    $scope.addJeux = function(){
       var refEvent = firebase.database().ref().child("jeux");
        var objet = {
            titre : " Whatsapp selfie",
            description : "Postez vos photos sur notre page facebook, <strong> whatsapp <strong> ",
            image : 'sansa-snowcastle4.jpg',
            lots:['samsumg phone','montre']
        }
        refEvent.push(objet);
    }
    $scope.addCampagne = function(){
       var refEvent = firebase.database().ref().child("campagnes");
        var objet = {
            titre : " Nouvelle boisson World Cola",
            description : "World Cola est une nouvelle boisson Cola <i> panafricaine</i> ",
            image : 'sansa-snowcastle4.jpg'
        }
        refEvent.push(objet);
    }
    $scope.addLoisir = function(){
       var refEvent = firebase.database().ref().child("loisirs");
        var objet = {
            titre : " JAZZ KIFF 2016",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a dui non est mollis vehicula sit amet at magna. Donec feugiat orci non vestibulum mattis. Nulla facilisi. Mauris suscipit quam sapien, ac dictum purus mattis quis ",
            image : 'sansa-snowcastle4.jpg',
            date:"du 01/06/2016 au 04/06/2016",
            heure:"18H00",
            lieu:"Halle de la Gombe",
            adresse:"Av. YYYYYY",
            contact:"09875444"
        }
        refEvent.push(objet);
    }
    $scope.addEvent = function(){
       var refEvent = firebase.database().ref().child("events");
        var objet = {
            titre : " Nouvelle boisson World Cola",
            description : "World Cola est une nouvelle boisson Cola <i> panafricaine</i> ",
            image : 'sansa-snowcastle4.jpg',
            date:"",
            heure:"",
            lieu:"",
            adresse:"",
            contact:""
        }
        refEvent.push(objet);
    }
    $scope.addEmploi = function(){
        console.log('lol');
       var refEvent = firebase.database().ref().child("emplois");
        var objet = {
            titre : " Promoteur de vente H/F",
            description : "La BRACONGO recherche un Promoteur de vente H/F ",
            reference : '76543',
            date:"07/12/2016",
            mission:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a dui non est mollis vehicula sit amet at magna. Donec feugiat orci non vestibulum mattis. Nulla facilisi. Mauris suscipit quam sapien, ac dictum purus mattis quis. Suspendisse hendrerit turpis lorem, sit amet auctor libero tincidunt eu.",
            profil:"Morbi nibh augue, tincidunt ut sapien vel, viverra commodo mi. Quisque tempor nibh sit amet augue fringilla, mollis condimentum justo dignissim."
        }
        refEvent.push(objet);
    }
  
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.factory('serviceFactory', function($firebaseArray, $firebaseObject){
 
    var   auth = firebase.auth();
  var database = firebase.database().ref();
  var storage = firebase.storage();
    var refEvent = database.child('events');
    var refJeux = database.child('jeux');
    var refCampagnes = database.child('campagnes');
    var refLoisirs = database.child('loisirs');
     var refEmplois = database.child('emplois');
    var localEvents = [];
    var localJeux = [];
    var localCampagnes = [];
    var localLoisirs = [];
    var emplois = [];
    var i ;
    
  return {
    getAllEvent: function(){ 
       
      return $firebaseArray(refEvent);
    },
    getOneEvent: function(id){
            for(i=0; i < localEvents.length; i++){
                if(localEvents[i].$id == id){
                    return localEvents[i];
                }
            }
    },
    getAllCampagnes: function(){ 
        localCampagnes = $firebaseArray(refCampagnes);
      return $firebaseArray(refCampagnes);
    },
    getOneCampagne: function(id){
            for(i=0; i < localCampagnes.length; i++){
                if(localCampagnes[i].$id == id){
                    return localCampagnes[i];
                }
            }
    },
    getAllJeux: function(){ 
        localJeux = $firebaseArray(refJeux);
      return $firebaseArray(refJeux);
    },
    getOneJeux: function(id){
            for(i=0; i < localJeux.length; i++){
                if(localJeux[i].$id == id){
                    return localJeux[i];
                }
            }
    },
    getAllLoisirs: function(){ 
        localLoisirs = $firebaseArray(refLoisirs);
      return $firebaseArray(refLoisirs);
    },
    getOneLoisir: function(id){
            for(i=0; i < localLoisirs.length; i++){
                if(localLoisirs[i].$id == id){
                    return localLoisirs[i];
                }
            }
    },
    getAllEmplois: function(){
        emplois = $firebaseArray(refEmplois);
        return $firebaseArray(refEmplois);
    },
    getOneEmploi: function(id){
        
            for(i=0; i < emplois.length; i++){
                if(emplois[i].$id == id){
                    return emplois[i];
                }
            }
    },
  }  
})

.factory('UserService',['$q','Loki', function($q, Loki){
//.factory('UserService', ['$q', 'Loki', UserService]);

//function UserService($q, Loki) {  
    var _db;
    var _users;

    function initDB() {          
        var adapter = new LokiCordovaFSAdapter({"prefix": "loki"});  
        _db = new Loki('userDB',
                {
                    autosave: true,
                    autosaveInterval: 1000, // 1 second
                    adapter: adapter
                });
    };

     function getAllUsers() {        
            return $q(function (resolve, reject) {
    
                var options = {
                    users: {
                        proto: Object,
                        inflate: function (src, dst) {
                            var prop;
                            for (prop in src) {
                                if (prop === 'Date') {
                                    dst.Date = new Date(src.Date);
                                } else {
                                    dst[prop] = src[prop];
                                }
                            }
                        }
                    }
                };
    
                _db.loadDatabase(options, function () {
                    _users = _db.getCollection('users');
    
                    if (!_users) {
                        _users = _db.addCollection('users');
                    }
    
                    resolve(_users.data);
                });
            });
};


     function addUser(user) {
            _users.insert(user);
        };

        function updateUser(user) {            
            _users.update(user);
        };

        function deleteUser(user) {
            _users.remove(user);
        };

    return {
        initDB: initDB,
        getAllUsers: getAllUsers,
        addUser: addUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
//}
}])

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
