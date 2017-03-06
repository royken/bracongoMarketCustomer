/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['ionic','firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,$ionicPlatform,UserService,ApiEndpoint) {
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
     $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();
    
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
        $scope.fete = function(){ 
            $state.go('app.serviceFete');        
        }
        $scope.barProche = function(){ 
            $state.go('app.barProche');        
        }
        $scope.animation = function(){ 
            $state.go('app.planning');        
        }
        $scope.chateaux= function(){ 
            $state.go('app.cleCategorie');        
        }
        $scope.game = function(){
            //$state.go('app.cleCategorie');
        }
        $scope.contact = function(){
            $state.go('app.contact');
        }
        $scope.infos = function(){
            $state.go('app.infos');
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
    $scope.$parent.clearFabs();
    
            
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
   $scope.$parent.clearFabs();
    
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
    $scope.$parent.clearFabs();
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
    $scope.$parent.clearFabs();
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
    $scope.$parent.clearFabs();
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
    $scope.$parent.clearFabs();
    
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

.controller('ChateauCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
    $scope.categories = [];
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();

    $scope.categories = serviceFactory.getAllCategories();
    $scope.detailEmploi = function(id){ 
        state.go('app.categorieList', {id: id});        
    }
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('CategorieListCtrl', function($scope, $stateParams, $timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.$parent.clearFabs();
    $scope.jeu = null;
    var jeuId = $stateParams.id;
    console.log("L'id de la categorie", $stateParams.id);
     console.log("L'id de l'event", $stateParams);
    console.log(jeuId) ;

    $scope.produits = [
        {nom:"Saint Julien Chateau Beychevelle",prix:[{volume:"75CL",valeur:"234,000"}]},
        {nom:"Château ferrande rouge",prix:[{volume:"1,5L",valeur:"61,000"},{volume:"75CL",valeur:"36,000"},{volume:"37,5CL",valeur:"15,000"}]}
    ];

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
  $ionicLoading.hide();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('PlanningCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
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
    $scope.$parent.clearFabs();
    
    $scope.planning = [
        {jour:"Lundi 06/02/2017",anims:[{responsable:"Royken",lieu:"Kintambo",heure:"17h00",marque:"Nkoyi"},{responsable:"Royken",lieu:"Ngombe",heure:"18h00",marque:"33 Export"},{responsable:"Royken1",lieu:"Ngaliema",heure:"14h00",marque:"World Cola"}]},
        {jour:"Mardi 07/02/2017",anims:[{responsable:"Roy",lieu:"Ngaba",heure:"17h00",marque:"Doppel"},{responsable:"Royken roy",lieu:"Ngiri Ngiri",heure:"18h00",marque:"Top Cola"},{responsable:"Royken4",lieu:"Bumbu",heure:"14h00",marque:"Castel"}]}
    ];
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('MapCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory,GoogleMaps) {
    
    
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
     $ionicLoading.hide();

     GoogleMaps.init();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('ContactCtrl', function($scope,$state ,$stateParams,$http ,$timeout,$ionicLoading, ionicMaterialMotion, ionicMaterialInk,$cordovaGeolocation,serviceFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.$parent.clearFabs();
    $scope.emailSend = "rdsid@bracongo.cd";
    $scope.rating = {};
    $scope.rating.rate = 3;
    $scope.rating.max = 5;
    $scope.pdvs = [];

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
    $http.get("http://41.223.104.197:8080/pdv/api/pdv").then(function(response){
          $scope.pdvs = response.data;
          console.log("fresh", JSON.stringify(response));
        //  return pdvProche;
      });
 // $scope.pdvs = serviceFactory.getPdvs();
  console.log("data",JSON.stringify($scope.pdvs));
  //console.log("data0",$scope.pdvs[0]);
  $ionicLoading.hide();

  $scope.toto = function(){
    console.log("helooooooooo");
  };

  $scope.showMap = function(){ 
        $state.go('app.barProcheMap');        
    }

     $scope.$on('mapInitialized', function (event, map) {
        $scope.map = map;
    });

     $scope.points = [
     {
        nom:"PAPA KAMBAYI",
        latitude:-4.32324457,
        longitude:15.27876949,
        proprio:"KAMBAYI ZEPHIRHIN",
        adresse:"AVE, LUMANDE, 1",
        quartier:"QRT,SOCIMAT",
        tel:"+243851270558",
        rate:5
     },
     {
        nom:"REGINA",
        latitude:-4.31285667,
        longitude:15.30543232,
        proprio:"KOSOLOKOLO",
        adresse:"AVE, WANGATA, 150",
        quartier:"QRT, NGBAKA",
        tel:"+243851270558",
        rate:5
     },
     {
        nom:"GUYLAIN PAYENZO",
        latitude:-4.33921051,
        longitude:15.26832485,
        proprio:"KOSOLOKOLO",
        adresse:"AVE, WANGATA, 150",
        quartier:"QRT, NGBAKA",
        tel:"+243851270558",
        rate:5
     },
     {
        nom:"MOLISHO",
        latitude:-4.33580256,
        longitude:15.25940990,
        proprio:"KOSOLOKOLO",
        adresse:"AVE, WANGATA, 150",
        quartier:"QRT, NGBAKA",
        tel:"+243851270558",
        rate:5
     }
     ];

$scope.positions = [{
            lat: -4.3267466,
            lng: 15.3444303
        },{
            lat: -4.3247466,
            lng: 15.3434303
        }
        ,{
            lat: -4.3245466,
            lng: 15.3437303
        }];

var options = {timeout: 10000, enableHighAccuracy: true};
 
 $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Wait until the map is loaded
google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
 
  var infoWindow = new google.maps.InfoWindow({
      content: "Je suis ici!"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
 
});
 /////////
  }, function(error){
    console.log("Could not get location");
    /*A retier après*/
    var latLng = new google.maps.LatLng(-4.3245466, 15.3437303);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Wait until the map is loaded
google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
 
  var infoWindow = new google.maps.InfoWindow({
      content: "Nous sommes ici"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
 
});
  });
  
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
.controller('InfosCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk) {
    
    
    $ionicLoading.show({     
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>',
                    duration: 3000
                  });
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.$parent.clearFabs();
    
   
        

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('ServiceFeteCtrl', function($scope ,$state, $ionicLoading,$ionicModal, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
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
    $scope.tel="+2437726627";
    $scope.mail = "servicefete@bracongo.cd";
    $scope.pageSimuler = function(){
        $state.go('app.simulateur');
    };
        
    $ionicModal.fromTemplateUrl('templates/proforma.html',{
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
  $scope.biere;
    $scope.bg;
    $scope.casier;
    $scope.pression;
    $scope.nbrFutTembo;
    $scope.nbrFutSkol;
    $scope.nbrCasierBeau ;
    $scope.nbrCasierCastel ;
    $scope.nbrCasierDoppel;
    $scope.nbrCasierCastel ;
    $scope.nbrCasierNkoyi ;
    $scope.nbrCasierNkoyiBlaclk ;
    $scope.nbrCasierTembo ;
    $scope.nbrCasierSkol ;
    $scope.nbrCasierBg ;
        
    $scope.calculer = function(){
        console.log("biere", $scope.biere);
        console.log("casier", $scope.casier);
        console.log("pression", $scope.pression);
        console.log("nbrFutTembo", $scope.nbrFutTembo);
        console.log("nbrCasierBeau", $scope.nbrCasierBeau);
        console.log("nbrCasierNkoyi", $scope.nbrCasierNkoyi);
    }

     $ionicLoading.hide();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('SimulateurCtrl', function($scope ,$state, $ionicLoading, ionicMaterialMotion, ionicMaterialInk,serviceFactory) {
    
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
    $scope.nbrPlace=null;
    $scope.mail = "servicefete@bracongo.cd";
    $scope.biere;
    $scope.bg;
    $scope.casier;
    $scope.pression;
    $scope.nbrFutTembo;
    $scope.nbrFutSkol;
    $scope.nbrCasierBeau ;
    $scope.nbrCasierCastel ;
    $scope.nbrCasierDoppel;
    $scope.nbrCasierCastel ;
    $scope.nbrCasierNkoyi ;
    $scope.nbrCasierNkoyiBlaclk ;
    $scope.nbrCasierTembo ;
    $scope.nbrCasierSkol ;
    $scope.nbrCasierBg ;
        
    $scope.calculer = function(){
        console.log("biere", $scope.biere);
        console.log("casier", $scope.casier);
        console.log("pression", $scope.pression);
        console.log("nbrFutTembo", $scope.nbrFutTembo);
        console.log("nbrCasierBeau", $scope.nbrCasierBeau);
        console.log("nbrCasierNkoyi", $scope.nbrCasierNkoyi);
        console.log("biere", $scope.biere);
    }

     $ionicLoading.hide();

    // Activate ink for controller
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

.factory('GoogleMaps', function($cordovaGeolocation, serviceFactory){
 
  var apiKey = false;
  var map = null;
  var markerCache = [];
 
  function initMap(){
 
    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
 
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){

        // add the user's position marker
        var markerPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              
              var marker = new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  position: markerPos,
                  icon: 'img/pin/green-dot.png'
              });
        var infoWindowContent = "<h3>" + "Je suis ici" + "</h3>" ;          
 
              addInfoWindow(marker, infoWindowContent, latLng);
 
        //Load the markers
        loadMarkers();
        //Reload markers every time the map moves
       /* google.maps.event.addListener(map, 'dragend', function(){
          console.log("moved!");
          loadMarkers();
        });
        */
 
        //Reload markers every time the zoom changes
       /* google.maps.event.addListener(map, 'zoom_changed', function(){
          console.log("zoomed!");
          loadMarkers();
        });
        */
       // enableMap();
 
      });
 
    }, function(error){
      console.log("Could not get location");
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //Load the markers
        loadMarkers();
    });
  }

   function enableMap(){
    $ionicLoading.hide();
  }
 
  function disableMap(){
    $ionicLoading.show({
      template: 'You must be connected to the Internet to view this map.'
    });
  }
 
  function loadMarkers(){
    var center = map.getCenter();
      var bounds = map.getBounds();
      var zoom = map.getZoom();
 
      //Convert objects returned by Google to be more readable
      var centerNorm = {
          lat: center.lat(),
          lng: center.lng()
      };
 
      var boundsNorm = {
          northeast: {
              lat: bounds.getNorthEast().lat(),
              lng: bounds.getNorthEast().lng()
          },
          southwest: {
              lat: bounds.getSouthWest().lat(),
              lng: bounds.getSouthWest().lng()
          }
      };
 
   /*   var boundingRadius = getBoundingRadius(centerNorm, boundsNorm);
 
      var params = {
        "centre": centerNorm,
        "bounds": boundsNorm,
        "zoom": zoom,
        "boundingRadius": boundingRadius
      };
    */
      //Get all of the markers from our Markers factory
      serviceFactory.getPdvs().then(function(markers){
 
        //console.log("Markers: ", markers);
 
        var records = markers;
 
        for (var i = 0; i < records.length; i++) {
 
          var record = records[i];  
          console.log("Markers: ", records[i]); 
         /* var markerPos = new google.maps.LatLng(record.latitude, record.longitude);
 
          // Add the markerto the map
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos
          });
 
          var infoWindowContent = "<h4>" + record.nom + "</h4>";          
 
          addInfoWindow(marker, infoWindowContent, record);
          */
          if (!markerExists(record.latitude, record.longitude)) {
 
              var markerPos = new google.maps.LatLng(record.latitude, record.longitude);
              // add the marker
              var marker = new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  position: markerPos
              });
 
// Add the marker to the markerCache so we know not to add it again later
              var markerData = {
                latitude: record.latitude,
                latitude: record.longitude,
                marker: marker
              };
 
              markerCache.push(markerData);
 
              var infoWindowContent = "<h3>" + record.nom + "</h3>"+"</br>" + "<h4>" + record.adresse + "</h4>";          
 
              addInfoWindow(marker, infoWindowContent, record);
          }
        }
 
      }); 
 
  }

  function markerExists(lat, lng){
      var exists = false;
      var cache = markerCache;
      for(var i = 0; i < cache.length; i++){
        if(cache[i].latitude === lat && cache[i].longitude === lng){
          exists = true;
        }
      }
 
      return exists;
  }
 
  function addInfoWindow(marker, message, record) {
 
      var infoWindow = new google.maps.InfoWindow({
          content: message
      });
 
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
  }
 
  return {
    init: function(){
      initMap();
    }
  }
 
})
.factory('serviceFactory', function($firebaseArray, $firebaseObject,$http,ApiEndpoint){
 
    var   auth = firebase.auth();
    var database = firebase.database().ref();
    var storage = firebase.storage();
    var refEvent = database.child('events');
    var refJeux = database.child('jeux');
    var refCampagnes = database.child('campagnes');
    var refLoisirs = database.child('loisirs');
    var refEmplois = database.child('emplois');
    var refCategories = database.child('categories');
    var localEvents = [];
    var localJeux = [];
    var localCampagnes = [];
    var localLoisirs = [];
    var emplois = [];
    var pdvProche = [];
    var pdvProches = [];
    var localCategories = [];
    var i ;
    
  return {

    getPdvs: function(){
 
      return $http.get("http://41.223.104.197:8080/pdv/api/pdv").then(function(response){
          pdvProche = response.data;
          pdvProches = response.data;
          console.log("fresh", JSON.stringify(response));
          return pdvProches;
      });

 
    },

    getAllEvent: function(){ 
       localEvents = $firebaseArray(refEvent);
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
    getAllCategories: function(){
        localCategories = $firebaseArray(refCategories);
        return $firebaseArray(refCategories);
    },
    getOneCategorie: function(id){       
            for(i=0; i < localCategories.length; i++){
                if(localCategories[i].$id == id){
                    return localCategories[i];
                }
            }
    }
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
